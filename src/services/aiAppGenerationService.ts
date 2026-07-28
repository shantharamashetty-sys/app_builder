import type {
  BackendOption,
  BackendRecommendation,
  BackendRecommendationResult,
  GeneratedArchitecture,
  GeneratedScreen,
  GenerationLayer,
  GenerationLogEntry,
  GenerationProgressSnapshot,
  RequirementAnalysis,
  RequirementBreakdownGroup,
  RequirementTag,
} from '../models/AppGeneration'
import { mockDelay } from './mockDelay'

/**
 * All data access for the AI App Generation flow goes through this module.
 * `analyzeRequirements`/`recommendBackend` run a real (deterministic,
 * keyword-driven) heuristic over the user's prompt — everything else below
 * returns one rich illustrative dataset, the same "mock now, swap later"
 * pattern as projectService.ts. When a real generation backend exists, only
 * these function bodies change.
 */

const TAG_KEYWORDS: Record<RequirementTag, string[]> = {
  auth: ['login', 'sign up', 'sign-up', 'signup', 'auth', 'account', 'password'],
  roles: ['role', 'permission', 'admin', 'team member', 'access control'],
  realtime: ['chat', 'real-time', 'realtime', 'live', 'collaborat', 'presence'],
  fileStorage: ['upload', 'file', 'image', 'document', 'avatar', 'attachment', 'media'],
  payments: ['payment', 'checkout', 'subscription', 'billing', 'stripe', 'invoice'],
  notifications: ['notif', 'alert', 'remind', 'email digest'],
  search: ['search', 'filter', 'discover', 'browse'],
  workflowAutomation: ['workflow', 'automat', 'trigger', 'when this happens'],
  offlineSync: ['offline', 'sync', 'mobile app', 'field workers'],
  highScale: ['enterprise', 'thousands of users', 'high traffic', 'compliance', 'sla', 'millions'],
}

const FEATURE_KEYWORDS: { match: string; label: string; entities: string[] }[] = [
  { match: 'task board', label: 'Task / Kanban boards', entities: ['Task', 'Board'] },
  { match: 'kanban', label: 'Task / Kanban boards', entities: ['Task', 'Board'] },
  { match: 'time tracking', label: 'Time tracking', entities: ['TimeEntry'] },
  { match: 'chat', label: 'Real-time chat', entities: ['Message', 'Conversation'] },
  { match: 'calendar', label: 'Calendar & scheduling', entities: ['Event'] },
  { match: 'schedul', label: 'Calendar & scheduling', entities: ['Event'] },
  { match: 'upload', label: 'File uploads', entities: ['Attachment'] },
  { match: 'payment', label: 'Payments & billing', entities: ['Invoice', 'Payment'] },
  { match: 'checkout', label: 'Payments & billing', entities: ['Invoice', 'Payment'] },
  { match: 'subscription', label: 'Payments & billing', entities: ['Invoice', 'Payment'] },
  { match: 'search', label: 'Search & discovery', entities: [] },
  { match: 'comment', label: 'Comments & discussion', entities: ['Comment'] },
  { match: 'dashboard', label: 'Analytics dashboard', entities: [] },
  { match: 'report', label: 'Reporting', entities: [] },
  { match: 'invite', label: 'Team collaboration', entities: ['TeamMembership'] },
  { match: 'team', label: 'Team collaboration', entities: ['TeamMembership'] },
  { match: 'workflow', label: 'Workflow automation', entities: [] },
  { match: 'automat', label: 'Workflow automation', entities: [] },
  { match: 'notif', label: 'Notifications', entities: [] },
]

const ROLE_KEYWORDS: { match: string; label: string }[] = [
  { match: 'admin', label: 'Admin' },
  { match: 'manager', label: 'Manager' },
  { match: 'guest', label: 'Guest' },
  { match: 'viewer', label: 'Viewer' },
  { match: 'customer', label: 'Customer' },
  { match: 'editor', label: 'Editor' },
]

const INTEGRATION_KEYWORDS = [
  'slack',
  'github',
  'stripe',
  'zapier',
  'google',
  'twilio',
  'sendgrid',
  'salesforce',
  'notion',
  'jira',
]

function detectTags(text: string): RequirementTag[] {
  const tags = (Object.keys(TAG_KEYWORDS) as RequirementTag[]).filter((tag) =>
    TAG_KEYWORDS[tag].some((keyword) => text.includes(keyword)),
  )
  return tags
}

export async function analyzeRequirements(promptText: string): Promise<RequirementAnalysis> {
  const text = promptText.toLowerCase()
  const detectedTags = detectTags(text)

  const matchedFeatures = FEATURE_KEYWORDS.filter((f) => text.includes(f.match))
  const coreFeatures = [...new Set(matchedFeatures.map((f) => f.label))]
  const dataModelEntities = [
    'User',
    'Project',
    ...new Set(matchedFeatures.flatMap((f) => f.entities)),
  ]
  const roles = [
    'Owner / Admin',
    'Standard User',
    ...ROLE_KEYWORDS.filter((r) => text.includes(r.match)).map((r) => r.label),
  ]
  const integrations = INTEGRATION_KEYWORDS.filter((keyword) => text.includes(keyword)).map(
    (keyword) => keyword[0]!.toUpperCase() + keyword.slice(1),
  )

  const breakdown: RequirementBreakdownGroup[] = [
    {
      id: 'core-features',
      category: 'core-features',
      label: 'Core Features',
      items: coreFeatures.length > 0 ? coreFeatures : ['Core CRUD workflows based on your description'],
    },
    {
      id: 'user-roles',
      category: 'user-roles',
      label: 'User Roles',
      items: [...new Set(roles)],
    },
    {
      id: 'data-models',
      category: 'data-models',
      label: 'Data Models',
      items: [...new Set(dataModelEntities)],
    },
  ]
  if (integrations.length > 0) {
    breakdown.push({
      id: 'integrations',
      category: 'integrations',
      label: 'Integrations',
      items: integrations,
    })
  }

  const analysis: RequirementAnalysis = {
    id: `analysis_${Date.now()}`,
    promptText,
    summaryQuote: promptText.trim(),
    breakdown,
    detectedTags,
  }
  return mockDelay(analysis, 900)
}

interface BackendProfile {
  name: string
  baseScore: number
  strengths: RequirementTag[]
  weaknesses: RequirementTag[]
  fallbackReason: string
}

const BACKEND_PROFILES: Record<BackendOption, BackendProfile> = {
  supabase: {
    name: 'Supabase',
    baseScore: 78,
    strengths: ['auth', 'realtime', 'fileStorage', 'roles', 'search'],
    weaknesses: ['offlineSync'],
    fallbackReason: 'a Postgres database with auth, storage, and realtime already wired together',
  },
  firebase: {
    name: 'Firebase',
    baseScore: 76,
    strengths: ['auth', 'realtime', 'notifications', 'offlineSync', 'fileStorage'],
    weaknesses: ['search'],
    fallbackReason: 'a fully managed, serverless backend with generous free tier and offline-first SDKs',
  },
  postgresql: {
    name: 'PostgreSQL',
    baseScore: 70,
    strengths: ['highScale', 'search'],
    weaknesses: ['auth', 'realtime', 'fileStorage'],
    fallbackReason: 'the most battle-tested relational database for complex, high-integrity data',
  },
  mysql: {
    name: 'MySQL',
    baseScore: 64,
    strengths: ['highScale'],
    weaknesses: ['auth', 'realtime', 'fileStorage', 'search'],
    fallbackReason: 'a widely hosted, well-understood relational database',
  },
  mongodb: {
    name: 'MongoDB',
    baseScore: 66,
    strengths: ['highScale', 'offlineSync'],
    weaknesses: ['auth', 'roles'],
    fallbackReason: 'a flexible document model that suits fast-changing, loosely structured data',
  },
  appwrite: {
    name: 'Appwrite',
    baseScore: 74,
    strengths: ['auth', 'roles', 'fileStorage', 'realtime', 'notifications'],
    weaknesses: ['highScale'],
    fallbackReason: 'an open-source BaaS with auth, storage, and functions bundled in',
  },
  'node-express': {
    name: 'Node.js + Express',
    baseScore: 58,
    strengths: ['workflowAutomation'],
    weaknesses: ['auth', 'fileStorage', 'realtime'],
    fallbackReason: 'a minimal, fully custom API layer with no imposed structure',
  },
  nestjs: {
    name: 'NestJS',
    baseScore: 68,
    strengths: ['highScale', 'workflowAutomation', 'roles'],
    weaknesses: ['realtime', 'fileStorage'],
    fallbackReason: 'an opinionated, modular Node.js framework built for larger engineering teams',
  },
  dotnet: {
    name: '.NET',
    baseScore: 66,
    strengths: ['roles', 'highScale', 'workflowAutomation'],
    weaknesses: ['realtime', 'fileStorage'],
    fallbackReason: 'a mature, strongly-typed platform common in enterprise environments',
  },
  django: {
    name: 'Django',
    baseScore: 64,
    strengths: ['auth', 'roles', 'search'],
    weaknesses: ['realtime', 'fileStorage'],
    fallbackReason: 'a batteries-included Python framework with a built-in admin and auth system',
  },
  laravel: {
    name: 'Laravel',
    baseScore: 62,
    strengths: ['auth', 'roles', 'notifications', 'workflowAutomation'],
    weaknesses: ['realtime', 'highScale'],
    fallbackReason: 'a productive PHP framework with auth, jobs, and notifications built in',
  },
  hasura: {
    name: 'Hasura',
    baseScore: 72,
    strengths: ['realtime', 'roles', 'search'],
    weaknesses: ['fileStorage', 'offlineSync'],
    fallbackReason: 'an instant GraphQL API with realtime subscriptions over your Postgres schema',
  },
  'aws-amplify': {
    name: 'AWS Amplify',
    baseScore: 75,
    strengths: ['auth', 'realtime', 'fileStorage', 'highScale', 'workflowAutomation'],
    weaknesses: ['search'],
    fallbackReason: 'a fully managed, AWS-backed stack (Cognito, AppSync, S3, Lambda) built to scale',
  },
}

const TAG_REASON: Record<RequirementTag, string> = {
  auth: 'ships first-class authentication, so sign-up/login/session handling comes for free',
  roles: 'includes role- and permission-level access control out of the box',
  realtime: 'provides native realtime subscriptions, ideal for live or collaborative features',
  fileStorage: 'bundles managed file/object storage with access rules',
  payments: 'integrates cleanly with payment providers via functions and webhooks',
  notifications: 'has a built-in or first-party notification system',
  search: 'supports rich search and filtering well out of the box',
  workflowAutomation: 'has strong support for background jobs, triggers, and automation',
  offlineSync: 'offers offline-first data sync for unreliable networks',
  highScale: 'is proven at high scale with strong horizontal scaling characteristics',
}

const TAG_TRADEOFF: Record<RequirementTag, string> = {
  auth: "you'd need to bring your own authentication solution",
  roles: 'role and permission enforcement has to be built at the application layer',
  realtime: 'realtime updates need extra infrastructure (websockets or polling)',
  fileStorage: "file storage isn't built in and needs a separate service",
  payments: 'payment handling needs a dedicated provider integration',
  notifications: 'notifications need a separate delivery service',
  search: 'advanced search needs a bolt-on service like Algolia or Elasticsearch',
  workflowAutomation: 'complex automations need a custom job queue or scheduler',
  offlineSync: "offline-first sync isn't provided out of the box",
  highScale: 'scaling past moderate traffic needs additional infrastructure work',
}

export async function recommendBackend(
  analysis: RequirementAnalysis,
): Promise<BackendRecommendationResult> {
  const ranked = (Object.keys(BACKEND_PROFILES) as BackendOption[])
    .map((option): BackendRecommendation => {
      const profile = BACKEND_PROFILES[option]
      const matchedStrengths = analysis.detectedTags.filter((tag) =>
        profile.strengths.includes(tag),
      )
      const matchedWeaknesses = analysis.detectedTags.filter((tag) =>
        profile.weaknesses.includes(tag),
      )
      const score = Math.max(
        0,
        Math.min(100, profile.baseScore + matchedStrengths.length * 15 - matchedWeaknesses.length * 10),
      )

      const reasons =
        matchedStrengths.length > 0
          ? matchedStrengths.map((tag) => `${profile.name} ${TAG_REASON[tag]}.`)
          : [`${profile.name} offers ${profile.fallbackReason}.`]

      const tradeoffs =
        matchedWeaknesses.length > 0
          ? matchedWeaknesses.map((tag) => `For this project, ${TAG_TRADEOFF[tag]}.`)
          : profile.weaknesses.length > 0
            ? [`In general, ${TAG_TRADEOFF[profile.weaknesses[0]!]}.`]
            : ['No significant tradeoffs for a project of this scope.']

      return { option, name: profile.name, score, reasons, tradeoffs }
    })
    .sort((a, b) => b.score - a.score)

  return mockDelay({ ranked }, 700)
}

const ARCHITECTURE: GeneratedArchitecture = {
  pages: [
    {
      id: 'page_dashboard',
      label: 'Dashboard',
      iconName: 'LayoutGrid',
      components: ['StatsGrid', 'RecentActivity'],
    },
    {
      id: 'page_task_board',
      label: 'Task Board',
      iconName: 'KanbanSquare',
      components: ['KanbanList', 'TaskCard'],
    },
    {
      id: 'page_calendar',
      label: 'Calendar',
      iconName: 'Calendar',
      components: ['EventMonth', 'MiniDatePicker'],
    },
    {
      id: 'page_team',
      label: 'Team',
      iconName: 'Users',
      components: ['UserList', 'InviteModal'],
    },
    {
      id: 'page_settings',
      label: 'Settings',
      iconName: 'Settings',
      components: ['ProfileForm', 'SecurityPanel'],
    },
  ],
  dataModels: [
    {
      id: 'model_user',
      name: 'User',
      fields: [
        { name: 'id', type: 'uuid', constraint: 'primary key' },
        { name: 'name', type: 'text' },
        { name: 'email', type: 'text', constraint: 'unique' },
        { name: 'avatarUrl', type: 'text' },
        { name: 'role', type: 'enum' },
      ],
      relationships: [
        { toModel: 'Task', kind: 'one-to-many', label: 'assigned tasks' },
        { toModel: 'TeamMembership', kind: 'one-to-many', label: 'memberships' },
      ],
    },
    {
      id: 'model_project',
      name: 'Project',
      fields: [
        { name: 'id', type: 'uuid', constraint: 'primary key' },
        { name: 'name', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'ownerId', type: 'uuid', constraint: 'foreign key → User' },
        { name: 'createdAt', type: 'timestamp' },
      ],
      relationships: [
        { toModel: 'Board', kind: 'one-to-many', label: 'boards' },
        { toModel: 'TeamMembership', kind: 'one-to-many', label: 'members' },
      ],
    },
    {
      id: 'model_board',
      name: 'Board',
      fields: [
        { name: 'id', type: 'uuid', constraint: 'primary key' },
        { name: 'projectId', type: 'uuid', constraint: 'foreign key → Project' },
        { name: 'name', type: 'text' },
        { name: 'position', type: 'integer' },
      ],
      relationships: [{ toModel: 'Task', kind: 'one-to-many', label: 'tasks' }],
    },
    {
      id: 'model_task',
      name: 'Task',
      fields: [
        { name: 'id', type: 'uuid', constraint: 'primary key' },
        { name: 'boardId', type: 'uuid', constraint: 'foreign key → Board' },
        { name: 'title', type: 'text' },
        { name: 'status', type: 'enum' },
        { name: 'assigneeId', type: 'uuid', constraint: 'foreign key → User' },
        { name: 'dueDate', type: 'date' },
      ],
      relationships: [],
    },
    {
      id: 'model_event',
      name: 'Event',
      fields: [
        { name: 'id', type: 'uuid', constraint: 'primary key' },
        { name: 'projectId', type: 'uuid', constraint: 'foreign key → Project' },
        { name: 'title', type: 'text' },
        { name: 'startAt', type: 'timestamp' },
        { name: 'endAt', type: 'timestamp' },
      ],
      relationships: [],
    },
    {
      id: 'model_team_membership',
      name: 'TeamMembership',
      fields: [
        { name: 'id', type: 'uuid', constraint: 'primary key' },
        { name: 'projectId', type: 'uuid', constraint: 'foreign key → Project' },
        { name: 'userId', type: 'uuid', constraint: 'foreign key → User' },
        { name: 'role', type: 'enum' },
      ],
      relationships: [],
    },
  ],
  apiEndpoints: [
    { id: 'ep_1', method: 'GET', path: '/api/projects', description: 'List projects for the current user', authRequired: true },
    { id: 'ep_2', method: 'POST', path: '/api/projects', description: 'Create a project', authRequired: true },
    { id: 'ep_3', method: 'GET', path: '/api/projects/:id/boards', description: 'List boards in a project', authRequired: true },
    { id: 'ep_4', method: 'POST', path: '/api/boards/:id/tasks', description: 'Create a task on a board', authRequired: true },
    { id: 'ep_5', method: 'GET', path: '/api/tasks/:id', description: 'Get task details', authRequired: true },
    { id: 'ep_6', method: 'PATCH', path: '/api/tasks/:id', description: 'Update a task', authRequired: true },
    { id: 'ep_7', method: 'DELETE', path: '/api/tasks/:id', description: 'Delete a task', authRequired: true },
    { id: 'ep_8', method: 'GET', path: '/api/events', description: 'List calendar events', authRequired: true },
    { id: 'ep_9', method: 'POST', path: '/api/team/invite', description: 'Invite a team member by email', authRequired: true },
    { id: 'ep_10', method: 'GET', path: '/api/health', description: 'Service health check', authRequired: false },
  ],
  components: [
    { id: 'c_1', name: 'StatsGrid', usedIn: 'Dashboard' },
    { id: 'c_2', name: 'RecentActivity', usedIn: 'Dashboard' },
    { id: 'c_3', name: 'KanbanList', usedIn: 'Task Board' },
    { id: 'c_4', name: 'TaskCard', usedIn: 'Task Board' },
    { id: 'c_5', name: 'EventMonth', usedIn: 'Calendar' },
    { id: 'c_6', name: 'MiniDatePicker', usedIn: 'Calendar' },
    { id: 'c_7', name: 'UserList', usedIn: 'Team' },
    { id: 'c_8', name: 'InviteModal', usedIn: 'Team' },
    { id: 'c_9', name: 'ProfileForm', usedIn: 'Settings' },
    { id: 'c_10', name: 'SecurityPanel', usedIn: 'Settings' },
    { id: 'c_11', name: 'TopNavbar', usedIn: 'Shared' },
    { id: 'c_12', name: 'SidebarNav', usedIn: 'Shared' },
    { id: 'c_13', name: 'Button', usedIn: 'Shared' },
    { id: 'c_14', name: 'Card', usedIn: 'Shared' },
    { id: 'c_15', name: 'Modal', usedIn: 'Shared' },
    { id: 'c_16', name: 'Badge', usedIn: 'Shared' },
    { id: 'c_17', name: 'Avatar', usedIn: 'Shared' },
    { id: 'c_18', name: 'Toast', usedIn: 'Shared' },
  ],
}

export async function generateArchitecture(): Promise<GeneratedArchitecture> {
  return mockDelay(ARCHITECTURE, 500)
}

const SCREENS: GeneratedScreen[] = [
  { id: 'screen_dashboard', name: 'Dashboard', description: 'Overview stats and recent activity', wireframeVariant: 'stats-grid' },
  { id: 'screen_task_board', name: 'Task Board', description: 'Drag-and-drop kanban board', wireframeVariant: 'list' },
  { id: 'screen_calendar', name: 'Calendar', description: 'Monthly event calendar', wireframeVariant: 'calendar' },
  { id: 'screen_team', name: 'Team', description: 'Team member directory and invites', wireframeVariant: 'list' },
  { id: 'screen_settings', name: 'Settings', description: 'Profile and security settings', wireframeVariant: 'settings' },
]

export async function generateScreens(): Promise<GeneratedScreen[]> {
  return mockDelay([...SCREENS], 500)
}

const LOG_SCRIPT: { level: GenerationLogEntry['level']; message: string }[] = [
  { level: 'command', message: '$ appbuilder generate --from-analysis' },
  { level: 'success', message: '✓ Created data model: Project' },
  { level: 'success', message: '✓ Created data model: Task' },
  { level: 'success', message: '✓ Created data model: User' },
  { level: 'success', message: '✓ Generated API: /api/projects' },
  { level: 'success', message: '✓ Generated API: /api/tasks' },
  { level: 'info', message: '○ Rendering component: KanbanBoard...' },
  { level: 'info', message: '○ Generating styles: dark_mode.css' },
  { level: 'info', message: '> Initializing frontend router...' },
  { level: 'warning', message: '! Caution: verify third-party API scopes before launch' },
  { level: 'info', message: '> Injecting context provider...' },
  { level: 'success', message: '✓ Build complete' },
]

const PROGRESS_LAYER_META: { id: GenerationLayer['id']; label: string }[] = [
  { id: 'architecture', label: 'Architecture' },
  { id: 'database', label: 'Database Schema' },
  { id: 'components', label: 'UI Components' },
  { id: 'api', label: 'API Routes' },
]

/**
 * The one non-Promise export in this service: progress bars and a streaming
 * log are an incremental concern, not a single request/response. This is the
 * seam that becomes a WebSocket/SSE subscription once a real generation
 * backend exists — callers only need `onUpdate` + the returned unsubscribe.
 */
export function subscribeToGenerationProgress(
  onUpdate: (snapshot: GenerationProgressSnapshot) => void,
): () => void {
  const totalTicks = 10
  let tick = 0
  let logIndex = 0

  const buildLayers = (t: number): GenerationLayer[] =>
    PROGRESS_LAYER_META.map((meta, layerIndex) => {
      const layerStart = layerIndex * 1.5
      const layerLocalTick = Math.max(0, Math.min(totalTicks, t - layerStart))
      const progress = Math.round(Math.min(100, (layerLocalTick / (totalTicks - layerStart)) * 100))
      const status: GenerationLayer['status'] =
        progress >= 100 ? 'complete' : progress > 0 ? 'in-progress' : 'pending'
      return { id: meta.id, label: meta.label, status, progress }
    })

  const log: GenerationLogEntry[] = []

  const intervalId = setInterval(() => {
    tick += 1
    const layers = buildLayers(tick)
    const overallProgress = Math.round(
      layers.reduce((sum, layer) => sum + layer.progress, 0) / layers.length,
    )

    if (logIndex < LOG_SCRIPT.length && tick % 1 === 0) {
      const next = LOG_SCRIPT[logIndex]!
      log.push({ id: `log_${logIndex}`, level: next.level, message: next.message })
      logIndex += 1
    }

    const isComplete = tick >= totalTicks
    const inProgressLayer = layers.find((l) => l.status === 'in-progress')

    onUpdate({
      layers,
      overallProgress,
      currentActivity: isComplete
        ? 'Finalizing your app...'
        : `Assembling ${inProgressLayer?.label ?? 'logical modules'}...`,
      log: [...log],
      isComplete,
    })

    if (isComplete) {
      clearInterval(intervalId)
    }
  }, 350)

  return () => clearInterval(intervalId)
}
