import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ProjectWizardDraft, ProjectWizardOptions } from '../models/ProjectWizard'
import * as projectService from '../services/projectService'
import * as projectWizardService from '../services/projectWizardService'

export type WizardStep =
  | 'details'
  | 'platform'
  | 'category'
  | 'starting-point'
  | 'theme'
  | 'backend'
  | 'review'

const STEP_ORDER: WizardStep[] = [
  'details',
  'platform',
  'category',
  'starting-point',
  'theme',
  'backend',
  'review',
]

const CURRENT_USER_ID = 'user_1'

const INITIAL_DRAFT: ProjectWizardDraft = {
  name: '',
  slug: '',
  isSlugEdited: false,
  description: '',
  visibility: 'private',
  platform: 'web',
  crossPlatform: false,
  category: 'dashboard',
  startingPoint: 'ai',
  aiPrompt: '',
  themeId: 'light',
  databaseId: 'postgresql',
  authId: 'email',
}

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

interface UseProjectWizardResult {
  step: WizardStep
  stepIndex: number
  goNext: () => void
  goBack: () => void
  goToStep: (step: WizardStep) => void

  options: ProjectWizardOptions | null
  isLoadingOptions: boolean

  draft: ProjectWizardDraft
  setName: (name: string) => void
  setSlug: (slug: string) => void
  setDescription: (description: string) => void
  setVisibility: (visibility: ProjectWizardDraft['visibility']) => void
  setPlatform: (platform: ProjectWizardDraft['platform']) => void
  setCrossPlatform: (crossPlatform: boolean) => void
  setCategory: (category: ProjectWizardDraft['category']) => void
  setStartingPoint: (startingPoint: ProjectWizardDraft['startingPoint']) => void
  setAiPrompt: (aiPrompt: string) => void
  setThemeId: (themeId: string) => void
  setDatabaseId: (databaseId: string) => void
  setAuthId: (authId: string) => void

  canContinue: boolean
  isSubmitting: boolean
  error: string | null
  submit: () => Promise<void>
}

/**
 * Controller for Module 03's 7-step wizard: owns step navigation, the draft
 * being assembled, and the static option lists from projectWizardService.
 * On the final step, submit() maps the draft down to projectService's
 * CreateProjectInput — no other module reads platform/category/theme/backend
 * yet, so those stay wizard-local state rather than bloating the Project model.
 */
export function useProjectWizard(): UseProjectWizardResult {
  const [step, setStep] = useState<WizardStep>('details')
  const [options, setOptions] = useState<ProjectWizardOptions | null>(null)
  const [isLoadingOptions, setIsLoadingOptions] = useState(true)
  const [draft, setDraft] = useState<ProjectWizardDraft>(INITIAL_DRAFT)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    setIsLoadingOptions(true)
    void projectWizardService.getWizardOptions().then((result) => {
      if (!isMounted) return
      setOptions(result)
      setIsLoadingOptions(false)
    })
    return () => {
      isMounted = false
    }
  }, [])

  const stepIndex = STEP_ORDER.indexOf(step)

  const goNext = useCallback(() => {
    setStep((current) => {
      const index = STEP_ORDER.indexOf(current)
      return STEP_ORDER[Math.min(index + 1, STEP_ORDER.length - 1)]
    })
  }, [])

  const goBack = useCallback(() => {
    setStep((current) => {
      const index = STEP_ORDER.indexOf(current)
      return STEP_ORDER[Math.max(index - 1, 0)]
    })
  }, [])

  const goToStep = useCallback((target: WizardStep) => {
    setStep(target)
  }, [])

  const setName = useCallback((name: string) => {
    setDraft((current) => ({
      ...current,
      name,
      slug: current.isSlugEdited ? current.slug : slugify(name),
    }))
  }, [])

  const setSlug = useCallback((slug: string) => {
    setDraft((current) => ({ ...current, slug, isSlugEdited: true }))
  }, [])

  const setDescription = useCallback((description: string) => {
    setDraft((current) => ({ ...current, description }))
  }, [])

  const setVisibility = useCallback((visibility: ProjectWizardDraft['visibility']) => {
    setDraft((current) => ({ ...current, visibility }))
  }, [])

  const setPlatform = useCallback((platform: ProjectWizardDraft['platform']) => {
    setDraft((current) => ({ ...current, platform }))
  }, [])

  const setCrossPlatform = useCallback((crossPlatform: boolean) => {
    setDraft((current) => ({ ...current, crossPlatform }))
  }, [])

  const setCategory = useCallback((category: ProjectWizardDraft['category']) => {
    setDraft((current) => ({ ...current, category }))
  }, [])

  const setStartingPoint = useCallback((startingPoint: ProjectWizardDraft['startingPoint']) => {
    setDraft((current) => ({ ...current, startingPoint }))
  }, [])

  const setAiPrompt = useCallback((aiPrompt: string) => {
    setDraft((current) => ({ ...current, aiPrompt }))
  }, [])

  const setThemeId = useCallback((themeId: string) => {
    setDraft((current) => ({ ...current, themeId }))
  }, [])

  const setDatabaseId = useCallback((databaseId: string) => {
    setDraft((current) => ({ ...current, databaseId }))
  }, [])

  const setAuthId = useCallback((authId: string) => {
    setDraft((current) => ({ ...current, authId }))
  }, [])

  const canContinue = useMemo(() => {
    if (step === 'details') return draft.name.trim().length > 0
    return true
  }, [step, draft.name])

  const submit = useCallback(async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      const theme = options?.themes.find((candidate) => candidate.id === draft.themeId)
      await projectService.createProject({
        name: draft.name,
        description: draft.description,
        accentColor: theme?.primaryColor,
        ownerId: CURRENT_USER_ID,
      })
    } catch {
      setError('Failed to create project. Please try again.')
      throw new Error('Failed to create project.')
    } finally {
      setIsSubmitting(false)
    }
  }, [draft, options])

  return {
    step,
    stepIndex,
    goNext,
    goBack,
    goToStep,
    options,
    isLoadingOptions,
    draft,
    setName,
    setSlug,
    setDescription,
    setVisibility,
    setPlatform,
    setCrossPlatform,
    setCategory,
    setStartingPoint,
    setAiPrompt,
    setThemeId,
    setDatabaseId,
    setAuthId,
    canContinue,
    isSubmitting,
    error,
    submit,
  }
}
