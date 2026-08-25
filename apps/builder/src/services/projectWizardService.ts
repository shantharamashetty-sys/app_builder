import type { ProjectWizardOptions } from '../models/ProjectWizard'
import { mockDelay } from './mockDelay'

/**
 * Reference/config data for the Project Creation Wizard (Module 03) — static
 * option lists, not user data, but still routed through a service per the
 * project's mock-vs-real-backend boundary.
 */

const options: ProjectWizardOptions = {
  platforms: [
    { id: 'web', name: 'Web App', description: 'Optimized for Chrome, Safari and Edge browsers.' },
    { id: 'mobile', name: 'Mobile App', description: 'Native iOS and Android application build.' },
    { id: 'desktop', name: 'Desktop App', description: 'Stand-alone app for Windows and MacOS.' },
  ],
  categories: [
    { id: 'dashboard', name: 'Dashboard & Analytics' },
    { id: 'ecommerce', name: 'E-commerce Store' },
    { id: 'blog', name: 'Blog & CMS' },
    { id: 'saas', name: 'SaaS Tool' },
    { id: 'social', name: 'Social Platform' },
    { id: 'custom', name: 'Custom' },
  ],
  themes: [
    { id: 'light', name: 'Light', primaryColor: '#5b4be0', secondaryColor: '#1a1a2e', accentColor: '#1f9d57' },
    { id: 'dark', name: 'Dark', primaryColor: '#7c6ff0', secondaryColor: '#0d0d1a', accentColor: '#34d399' },
    { id: 'purple', name: 'Purple', primaryColor: '#9333ea', secondaryColor: '#2e1065', accentColor: '#c084fc' },
    { id: 'ocean', name: 'Ocean', primaryColor: '#0ea5e9', secondaryColor: '#0c4a6e', accentColor: '#38bdf8' },
    { id: 'sunset', name: 'Sunset', primaryColor: '#f97316', secondaryColor: '#7c2d12', accentColor: '#fb923c' },
    { id: 'forest', name: 'Forest', primaryColor: '#16a34a', secondaryColor: '#14532d', accentColor: '#4ade80' },
  ],
  databases: [
    { id: 'postgresql', name: 'PostgreSQL', description: 'Scalable relational database', recommended: true },
    { id: 'mongodb', name: 'MongoDB', description: 'Flexible NoSQL document store' },
    { id: 'sqlite', name: 'SQLite', description: 'Lightweight local database' },
  ],
  authMethods: [
    { id: 'email', name: 'Email & Password', description: 'Standard login with email' },
    { id: 'google', name: 'Google OAuth', description: 'One-tap social login' },
    { id: 'magic-link', name: 'Magic Link', description: 'Passwordless email login' },
  ],
}

export async function getWizardOptions(): Promise<ProjectWizardOptions> {
  return mockDelay(options)
}
