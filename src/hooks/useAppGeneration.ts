import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  ArchitectureTab,
  AppGenerationStep,
  BackendOption,
  BackendRecommendationResult,
  GeneratedArchitecture,
  GeneratedScreen,
  GenerationProgressSnapshot,
  GenerationSummary,
  RequirementAnalysis,
} from '../models/AppGeneration'
import * as aiAppGenerationService from '../services/aiAppGenerationService'

interface UseAppGenerationResult {
  step: AppGenerationStep
  promptText: string
  setPromptText: (text: string) => void
  applySuggestion: (text: string) => void
  submitPrompt: () => Promise<void>
  isAnalyzing: boolean
  error: string | null

  analysis: RequirementAnalysis | null
  recommendation: BackendRecommendationResult | null
  chosenBackend: BackendOption | null
  setChosenBackend: (option: BackendOption) => void
  continueToGeneration: () => void

  progressSnapshot: GenerationProgressSnapshot | null
  isGenerating: boolean

  architecture: GeneratedArchitecture | null
  activeArchitectureTab: ArchitectureTab
  setActiveArchitectureTab: (tab: ArchitectureTab) => void
  acceptArchitecture: () => void

  screens: GeneratedScreen[]
  selectedScreenId: string | null
  setSelectedScreenId: (id: string) => void
  acceptedScreenIds: Set<string>
  acceptScreen: (id: string) => void
  acceptAllScreens: () => void

  summary: GenerationSummary | null
  reset: () => void
}

/**
 * Controller for the whole Module 04 wizard: owns every step's state and
 * mediates between aiAppGenerationService and the AiAppGenerationView step
 * components. Views never import the service directly.
 */
export function useAppGeneration(): UseAppGenerationResult {
  const [step, setStep] = useState<AppGenerationStep>('prompt')
  const [promptText, setPromptText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [analysis, setAnalysis] = useState<RequirementAnalysis | null>(null)
  const [recommendation, setRecommendation] = useState<BackendRecommendationResult | null>(null)
  const [chosenBackend, setChosenBackend] = useState<BackendOption | null>(null)

  const [progressSnapshot, setProgressSnapshot] = useState<GenerationProgressSnapshot | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const [architecture, setArchitecture] = useState<GeneratedArchitecture | null>(null)
  const [activeArchitectureTab, setActiveArchitectureTab] = useState<ArchitectureTab>('architecture')

  const [screens, setScreens] = useState<GeneratedScreen[]>([])
  const [selectedScreenId, setSelectedScreenId] = useState<string | null>(null)
  const [acceptedScreenIds, setAcceptedScreenIds] = useState<Set<string>>(new Set())

  const startedAtRef = useRef<number | null>(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const applySuggestion = useCallback((text: string) => {
    setPromptText(text)
  }, [])

  const submitPrompt = useCallback(async () => {
    if (!promptText.trim()) return
    setIsAnalyzing(true)
    setError(null)
    try {
      const nextAnalysis = await aiAppGenerationService.analyzeRequirements(promptText)
      const nextRecommendation = await aiAppGenerationService.recommendBackend(nextAnalysis)
      setAnalysis(nextAnalysis)
      setRecommendation(nextRecommendation)
      setChosenBackend(nextRecommendation.ranked[0]?.option ?? null)
      setStep('understanding')
    } catch {
      setError('Failed to analyze your prompt. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }, [promptText])

  const continueToGeneration = useCallback(() => {
    startedAtRef.current = Date.now()
    setProgressSnapshot(null)
    setStep('progress')
  }, [])

  useEffect(() => {
    if (step !== 'progress') return undefined

    setIsGenerating(true)
    const unsubscribe = aiAppGenerationService.subscribeToGenerationProgress((snapshot) => {
      setProgressSnapshot(snapshot)
      if (!snapshot.isComplete) return

      void (async () => {
        try {
          const [nextArchitecture, nextScreens] = await Promise.all([
            aiAppGenerationService.generateArchitecture(),
            aiAppGenerationService.generateScreens(),
          ])
          setElapsedSeconds(
            startedAtRef.current ? Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000)) : 0,
          )
          setArchitecture(nextArchitecture)
          setScreens(nextScreens)
          setStep('architecture')
        } catch {
          setError('Failed to generate your app. Please try again.')
        } finally {
          setIsGenerating(false)
        }
      })()
    })

    return unsubscribe
  }, [step])

  const acceptArchitecture = useCallback(() => {
    setSelectedScreenId((current) => current ?? screens[0]?.id ?? null)
    setStep('screens')
  }, [screens])

  const acceptScreen = useCallback(
    (id: string) => {
      setAcceptedScreenIds((current) => {
        const next = new Set(current)
        next.add(id)

        if (next.size >= screens.length) {
          setStep('confirm')
          return next
        }

        const currentIndex = screens.findIndex((screen) => screen.id === id)
        const nextUnaccepted = screens.find(
          (screen, index) => index > currentIndex && !next.has(screen.id),
        )
        setSelectedScreenId(nextUnaccepted?.id ?? screens.find((s) => !next.has(s.id))?.id ?? null)
        return next
      })
    },
    [screens],
  )

  const acceptAllScreens = useCallback(() => {
    setAcceptedScreenIds(new Set(screens.map((screen) => screen.id)))
    setStep('confirm')
  }, [screens])

  const summary = useMemo<GenerationSummary | null>(() => {
    if (!architecture || screens.length === 0) return null
    return {
      screensCount: screens.length,
      componentsCount: architecture.components.length,
      dataModelsCount: architecture.dataModels.length,
      elapsedSeconds,
    }
  }, [architecture, screens, elapsedSeconds])

  const reset = useCallback(() => {
    setStep('prompt')
    setPromptText('')
    setError(null)
    setAnalysis(null)
    setRecommendation(null)
    setChosenBackend(null)
    setProgressSnapshot(null)
    setArchitecture(null)
    setActiveArchitectureTab('architecture')
    setScreens([])
    setSelectedScreenId(null)
    setAcceptedScreenIds(new Set())
    setElapsedSeconds(0)
    startedAtRef.current = null
  }, [])

  return {
    step,
    promptText,
    setPromptText,
    applySuggestion,
    submitPrompt,
    isAnalyzing,
    error,
    analysis,
    recommendation,
    chosenBackend,
    setChosenBackend,
    continueToGeneration,
    progressSnapshot,
    isGenerating,
    architecture,
    activeArchitectureTab,
    setActiveArchitectureTab,
    acceptArchitecture,
    screens,
    selectedScreenId,
    setSelectedScreenId,
    acceptedScreenIds,
    acceptScreen,
    acceptAllScreens,
    summary,
    reset,
  }
}
