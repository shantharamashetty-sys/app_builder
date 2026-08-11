import type { BuilderDocument, Page, Widget, WidgetLibraryItem } from '../models'
import { mockDelay } from './mockDelay'

/**
 * Data access for Module 05's visual builder. A BuilderDocument mocks the
 * app-under-construction (its pages and widget tree); the widget library
 * catalog is separate reference data, mirrored from the same split
 * projectWizardService uses for Module 03's static option lists.
 */

const PROJECT_NAMES: Record<string, string> = {
  proj_1: 'SaaS Dashboard v2',
  proj_2: 'Task Manager Pro',
  proj_3: 'E-commerce Storefront',
  proj_4: 'Marketing Landing Page',
}

function buildDashboardWidgets(): Widget[] {
  return [
    {
      id: 'w_header',
      type: 'container',
      name: 'Header',
      position: { x: 0, y: 0, width: 1200, height: 64 },
      props: { fill: '#ffffff', borderBottom: '#ececf1' },
      children: [
        {
          id: 'w_logo',
          type: 'image',
          name: 'Logo',
          position: { x: 24, y: 16, width: 120, height: 32 },
          props: { src: 'logo' },
        },
        {
          id: 'w_nav_links',
          type: 'row',
          name: 'Nav Links',
          position: { x: 420, y: 20, width: 300, height: 24 },
          props: { gap: 24 },
        },
        {
          id: 'w_user_menu',
          type: 'row',
          name: 'User Menu',
          position: { x: 1100, y: 16, width: 76, height: 32 },
          props: { gap: 8 },
        },
      ],
    },
    {
      id: 'w_main_content',
      type: 'container',
      name: 'Main Content',
      position: { x: 0, y: 64, width: 1200, height: 620 },
      props: { fill: '#f9fafb' },
      children: [
        {
          id: 'w_stat_row',
          type: 'row',
          name: 'Stat Cards Row',
          position: { x: 24, y: 88, width: 1152, height: 166 },
          props: { gap: 24 },
          children: [
            {
              id: 'w_card_revenue',
              type: 'stat-card',
              name: 'Card: Revenue',
              position: { x: 24, y: 88, width: 368, height: 166 },
              props: { title: 'Total Revenue', value: '$48,295', trend: '+12.4%', icon: 'DollarSign' },
            },
            {
              id: 'w_card_users',
              type: 'stat-card',
              name: 'Card: Users',
              position: { x: 416, y: 88, width: 368, height: 166 },
              props: { title: 'Total Users', value: '1,284', trend: '+8.1%', icon: 'Users' },
            },
            {
              id: 'w_card_orders',
              type: 'stat-card',
              name: 'Card: Orders',
              position: { x: 808, y: 88, width: 368, height: 166 },
              props: { title: 'Total Orders', value: '842', trend: '+3.6%', icon: 'ShoppingCart' },
            },
          ],
        },
        {
          id: 'w_data_table',
          type: 'table',
          name: 'Data Table',
          position: { x: 24, y: 278, width: 1152, height: 320 },
          props: { source: 'users_table' },
        },
      ],
    },
    {
      id: 'w_sidebar',
      type: 'stack',
      name: 'Sidebar',
      position: { x: -220, y: 64, width: 220, height: 620 },
      props: { gap: 4 },
      children: Array.from({ length: 5 }, (_, index) => ({
        id: `w_nav_item_${index + 1}`,
        type: 'text' as const,
        name: `Nav Item ${index + 1}`,
        position: { x: -204, y: 96 + index * 44, width: 188, height: 36 },
        props: { label: `Nav Item ${index + 1}` },
      })),
    },
  ]
}

function buildDocument(projectId: string): BuilderDocument {
  const page: Page = {
    id: 'page_dashboard',
    projectId,
    name: 'Dashboard',
    path: '/',
    widgets: buildDashboardWidgets(),
  }
  return {
    projectId,
    projectName: PROJECT_NAMES[projectId] ?? 'Untitled App',
    pages: [
      page,
      { id: 'page_tasks', projectId, name: 'Tasks', path: '/tasks', widgets: [] },
      { id: 'page_calendar', projectId, name: 'Calendar', path: '/calendar', widgets: [] },
      { id: 'page_settings', projectId, name: 'Settings', path: '/settings', widgets: [] },
    ],
    activePageId: page.id,
  }
}

const WIDGET_LIBRARY: WidgetLibraryItem[] = [
  { id: 'lib_container', type: 'container', name: 'Container', description: 'Groups elements with padding and background.', category: 'layout' },
  { id: 'lib_grid', type: 'grid', name: 'Grid', description: 'Arrange children in rows and columns.', category: 'layout' },
  { id: 'lib_stack', type: 'stack', name: 'Stack', description: 'Vertical item grouping.', category: 'layout' },
  { id: 'lib_row', type: 'row', name: 'Row', description: 'Horizontal flex layout.', category: 'ui' },
  { id: 'lib_button', type: 'button', name: 'Button', description: 'Clickable call-to-action.', category: 'ui' },
  { id: 'lib_input', type: 'input', name: 'Input', description: 'Single-line text field.', category: 'ui' },
  { id: 'lib_text', type: 'text', name: 'Text', description: 'Static or bound text label.', category: 'ui' },
  { id: 'lib_image', type: 'image', name: 'Image', description: 'Static image or icon.', category: 'ui' },
  { id: 'lib_card', type: 'card', name: 'Card', description: 'Bordered content container.', category: 'ui' },
  { id: 'lib_table', type: 'table', name: 'Table', description: 'Tabular data grid.', category: 'data' },
  { id: 'lib_list', type: 'list', name: 'List', description: 'Vertical list of items.', category: 'data' },
  { id: 'lib_bar_chart', type: 'bar-chart', name: 'Bar Chart', description: 'Display data in horizontal or vertical bars.', category: 'charts' },
  { id: 'lib_line_chart', type: 'line-chart', name: 'Line Chart', description: 'Show trends over a period.', category: 'charts' },
  { id: 'lib_pie_chart', type: 'pie-chart', name: 'Pie Chart', description: 'Circular proportion view.', category: 'charts' },
]

export async function getBuilderDocument(projectId: string): Promise<BuilderDocument> {
  return mockDelay(buildDocument(projectId))
}

export async function getWidgetLibrary(): Promise<WidgetLibraryItem[]> {
  return mockDelay([...WIDGET_LIBRARY])
}

export async function updateWidgetProps(_widgetId: string, _props: Record<string, unknown>): Promise<void> {
  return mockDelay(undefined, 150)
}

export async function insertWidget(libraryItem: WidgetLibraryItem): Promise<Widget> {
  const widget: Widget = {
    id: `w_${Date.now()}`,
    type: libraryItem.type,
    name: libraryItem.name,
    position: { x: 40, y: 40, width: 240, height: 120 },
    props: {},
  }
  return mockDelay(widget, 150)
}
