import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import DashboardView from '../views/dashboard/DashboardView'

/**
 * Single source of truth for routing. Every module gets one child route
 * here, pointing at its top-level view under src/views/<module>/. As
 * modules 02-22 are implemented, add their routes below rather than
 * introducing routing logic anywhere else in the app.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardView /> },
      // { path: 'apps', element: <MyAppsView /> },              Module 01 (My Apps list)
      // { path: 'auth/*', element: <AuthRoutes /> },            Module 02
      // { path: 'projects/new', element: <ProjectWizardView /> }, Module 03
      // { path: 'builder/:projectId', element: <BuilderView /> }, Module 05
      // ...continue for the remaining modules as they're built
    ],
  },
])
