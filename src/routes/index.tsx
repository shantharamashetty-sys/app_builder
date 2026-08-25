import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import DashboardView from '../views/dashboard/DashboardView'
import WelcomeView from '../views/auth/WelcomeView'
import LoginView from '../views/auth/LoginView'
import SignupView from '../views/auth/SignupView'
import ForgotPasswordView from '../views/auth/ForgotPasswordView'
import ProjectWizardView from '../views/project-wizard/ProjectWizardView'
import AiAppGenerationView from '../views/ai-generation/AiAppGenerationView'
import BuilderView from '../views/builder/BuilderView'

/**
 * Single source of truth for routing. Every module gets one child route
 * here, pointing at its top-level view under src/views/<module>/. As
 * modules 06-22 are implemented, add their routes below rather than
 * introducing routing logic anywhere else in the app. Auth routes (Module
 * 02), the Project Creation Wizard (Module 03), the AI App Generation flow
 * (Module 04), and the Visual App Builder (Module 05) render full-screen
 * outside AppLayout — they own their own minimal chrome with no sidebar.
 *
 * The app starts at the login screen: the root index route redirects to
 * `/login` rather than rendering the dashboard directly.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: 'dashboard', element: <DashboardView /> },
      // { path: 'apps', element: <MyAppsView /> },              Module 01 (My Apps list)
      // ...continue for the remaining modules as they're built
    ],
  },
  { path: '/welcome', element: <WelcomeView /> },
  { path: '/login', element: <LoginView /> },
  { path: '/signup', element: <SignupView /> },
  { path: '/forgot-password', element: <ForgotPasswordView /> },
  { path: '/projects/new', element: <ProjectWizardView /> },
  { path: '/generate', element: <AiAppGenerationView /> },
  { path: '/builder/:projectId', element: <BuilderView /> },
])
