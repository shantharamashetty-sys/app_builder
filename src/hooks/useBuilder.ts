import { useCallback, useEffect, useMemo, useState } from 'react'
import type {
  BuilderDocument,
  DeviceMode,
  Widget,
  WidgetLibraryCategory,
  WidgetLibraryItem,
} from '../models'
import * as builderService from '../services/builderService'

export type LeftPanelTab = 'widgets' | 'layers'

const EMPTY_WIDGETS: Widget[] = []

function findWidget(widgets: Widget[], id: string): Widget | undefined {
  for (const widget of widgets) {
    if (widget.id === id) return widget
    if (widget.children) {
      const found = findWidget(widget.children, id)
      if (found) return found
    }
  }
  return undefined
}

function updateWidgetInTree(widgets: Widget[], id: string, props: Record<string, unknown>): Widget[] {
  return widgets.map((widget) => {
    if (widget.id === id) {
      return { ...widget, props: { ...widget.props, ...props } }
    }
    if (widget.children) {
      return { ...widget, children: updateWidgetInTree(widget.children, id, props) }
    }
    return widget
  })
}

interface UseBuilderResult {
  document: BuilderDocument | null
  isLoading: boolean
  error: string | null

  activePageWidgets: Widget[]
  selectPage: (pageId: string) => void

  selectedWidget: Widget | undefined
  selectWidget: (widgetId: string | null) => void
  updateSelectedWidgetProps: (props: Record<string, unknown>) => void

  leftPanelTab: LeftPanelTab
  setLeftPanelTab: (tab: LeftPanelTab) => void

  widgetLibrary: WidgetLibraryItem[]
  libraryCategory: WidgetLibraryCategory | 'all'
  setLibraryCategory: (category: WidgetLibraryCategory | 'all') => void
  librarySearch: string
  setLibrarySearch: (search: string) => void
  filteredLibrary: WidgetLibraryItem[]
  insertWidget: (item: WidgetLibraryItem) => Promise<void>

  deviceMode: DeviceMode
  setDeviceMode: (mode: DeviceMode) => void
  zoomPercent: number
  zoomIn: () => void
  zoomOut: () => void
}

/**
 * Controller for Module 05's builder. Owns the active page's widget tree,
 * the current selection, and the left/right panel UI state; insertWidget and
 * updateSelectedWidgetProps go through builderService so the mock-vs-real
 * boundary stays there rather than leaking into the view.
 */
export function useBuilder(projectId: string): UseBuilderResult {
  const [builderDoc, setBuilderDoc] = useState<BuilderDocument | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [activePageId, setActivePageId] = useState<string | null>(null)
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null)
  const [leftPanelTab, setLeftPanelTab] = useState<LeftPanelTab>('widgets')

  const [widgetLibrary, setWidgetLibrary] = useState<WidgetLibraryItem[]>([])
  const [libraryCategory, setLibraryCategory] = useState<WidgetLibraryCategory | 'all'>('all')
  const [librarySearch, setLibrarySearch] = useState('')

  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [zoomPercent, setZoomPercent] = useState(100)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)
    Promise.all([builderService.getBuilderDocument(projectId), builderService.getWidgetLibrary()])
      .then(([doc, library]) => {
        if (!isMounted) return
        setBuilderDoc(doc)
        setActivePageId(doc.activePageId)
        setWidgetLibrary(library)
      })
      .catch(() => {
        if (isMounted) setError('Failed to load the builder document.')
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [projectId])

  const activePage = useMemo(
    () => builderDoc?.pages.find((page) => page.id === activePageId),
    [builderDoc, activePageId],
  )
  const activePageWidgets = useMemo(() => activePage?.widgets ?? EMPTY_WIDGETS, [activePage])

  const selectPage = useCallback((pageId: string) => {
    setActivePageId(pageId)
    setSelectedWidgetId(null)
  }, [])

  const selectedWidget = useMemo(
    () => (selectedWidgetId ? findWidget(activePageWidgets, selectedWidgetId) : undefined),
    [activePageWidgets, selectedWidgetId],
  )

  const selectWidget = useCallback((widgetId: string | null) => {
    setSelectedWidgetId(widgetId)
  }, [])

  const updateSelectedWidgetProps = useCallback(
    (props: Record<string, unknown>) => {
      if (!selectedWidgetId || !activePageId) return
      setBuilderDoc((current) => {
        if (!current) return current
        return {
          ...current,
          pages: current.pages.map((page) =>
            page.id === activePageId
              ? { ...page, widgets: updateWidgetInTree(page.widgets, selectedWidgetId, props) }
              : page,
          ),
        }
      })
      void builderService.updateWidgetProps(selectedWidgetId, props)
    },
    [activePageId, selectedWidgetId],
  )

  const filteredLibrary = useMemo(() => {
    return widgetLibrary.filter((item) => {
      const matchesCategory = libraryCategory === 'all' || item.category === libraryCategory
      const matchesSearch = item.name.toLowerCase().includes(librarySearch.trim().toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [widgetLibrary, libraryCategory, librarySearch])

  const insertWidget = useCallback(
    async (item: WidgetLibraryItem) => {
      if (!activePageId) return
      const widget = await builderService.insertWidget(item)
      setBuilderDoc((current) => {
        if (!current) return current
        return {
          ...current,
          pages: current.pages.map((page) =>
            page.id === activePageId ? { ...page, widgets: [...page.widgets, widget] } : page,
          ),
        }
      })
      setSelectedWidgetId(widget.id)
    },
    [activePageId],
  )

  const zoomIn = useCallback(() => setZoomPercent((current) => Math.min(current + 10, 200)), [])
  const zoomOut = useCallback(() => setZoomPercent((current) => Math.max(current - 10, 25)), [])

  return {
    document: builderDoc,
    isLoading,
    error,
    activePageWidgets,
    selectPage,
    selectedWidget,
    selectWidget,
    updateSelectedWidgetProps,
    leftPanelTab,
    setLeftPanelTab,
    widgetLibrary,
    libraryCategory,
    setLibraryCategory,
    librarySearch,
    setLibrarySearch,
    filteredLibrary,
    insertWidget,
    deviceMode,
    setDeviceMode,
    zoomPercent,
    zoomIn,
    zoomOut,
  }
}
