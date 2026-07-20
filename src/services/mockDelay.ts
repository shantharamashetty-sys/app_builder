/**
 * Simulates network latency for mock services so hooks/views already handle
 * loading states correctly before any of this is backed by a real API.
 */
export function mockDelay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}
