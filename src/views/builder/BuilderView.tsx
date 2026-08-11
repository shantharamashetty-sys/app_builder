import { useParams } from 'react-router-dom'
import { useBuilder } from '../../hooks/useBuilder'
import BuilderTopToolbar from '../../components/builder/BuilderTopToolbar'
import BuilderSidebarRail from '../../components/builder/BuilderSidebarRail'
import WidgetLibraryPanel from '../../components/builder/WidgetLibraryPanel'
import LayersPanel from '../../components/builder/LayersPanel'
import BuilderCanvas from '../../components/builder/BuilderCanvas'
import AskAiBar from '../../components/builder/AskAiBar'
import PropertiesPanel from '../../components/builder/PropertiesPanel'

/**
 * Module 05's registered top-level view — a full-bleed builder shell with
 * its own toolbar/rail/panels, same "own chrome, no AppLayout" treatment as
 * Modules 02-04. Owns the single useBuilder() call and hands each piece
 * only the slice of state it needs.
 */
export default function BuilderView() {
  const { projectId } = useParams<{ projectId: string }>()
  const builder = useBuilder(projectId ?? '')

  if (builder.isLoading || !builder.document) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-canvas">
        <p className="text-sm text-muted">Loading builder...</p>
      </div>
    )
  }

  if (builder.error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-canvas">
        <p className="text-sm text-red-600">{builder.error}</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-canvas">
      <BuilderTopToolbar
        projectName={builder.document.projectName}
        pages={builder.document.pages}
        activePageId={builder.document.activePageId}
        onSelectPage={builder.selectPage}
        deviceMode={builder.deviceMode}
        onDeviceModeChange={builder.setDeviceMode}
        zoomPercent={builder.zoomPercent}
        onZoomIn={builder.zoomIn}
        onZoomOut={builder.zoomOut}
      />

      <div className="flex flex-1 overflow-hidden">
        <BuilderSidebarRail activeTab={builder.leftPanelTab} onTabChange={builder.setLeftPanelTab} />

        {builder.leftPanelTab === 'widgets' ? (
          <WidgetLibraryPanel
            items={builder.filteredLibrary}
            category={builder.libraryCategory}
            onCategoryChange={builder.setLibraryCategory}
            search={builder.librarySearch}
            onSearchChange={builder.setLibrarySearch}
            onInsert={(item) => void builder.insertWidget(item)}
          />
        ) : (
          <LayersPanel
            widgets={builder.activePageWidgets}
            selectedWidgetId={builder.selectedWidget?.id ?? null}
            onSelect={builder.selectWidget}
          />
        )}

        <div className="relative flex flex-1 flex-col overflow-hidden">
          <BuilderCanvas
            widgets={builder.activePageWidgets}
            selectedWidgetId={builder.selectedWidget?.id ?? null}
            onSelectWidget={builder.selectWidget}
            zoomPercent={builder.zoomPercent}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center px-6">
            <div className="pointer-events-auto">
              <AskAiBar />
            </div>
          </div>
        </div>

        <PropertiesPanel widget={builder.selectedWidget} onChangePropsAction={builder.updateSelectedWidgetProps} />
      </div>
    </div>
  )
}
