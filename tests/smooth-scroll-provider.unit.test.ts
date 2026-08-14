import { describe, it, expect, vi, beforeEach } from 'vitest'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

vi.mock('lenis', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      on: vi.fn(),
      raf: vi.fn(),
      destroy: vi.fn(),
    })),
  }
})

describe('SmoothScrollProvider ScrollTrigger Lifecycle', () => {
  beforeEach(() => {
    if (typeof window === 'undefined') {
      // @ts-expect-error mock window
      global.window = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        innerHeight: 1000,
        innerWidth: 1000,
      }
    }
  })

  it('preserves section component ScrollTriggers by omitting global kill() calls', async () => {
    const getAllSpy = vi.spyOn(ScrollTrigger, 'getAll')

    const { SmoothScrollProvider } = await import('@/components/providers/SmoothScrollProvider')
    expect(SmoothScrollProvider).toBeDefined()

    // Ensure ScrollTrigger.getAll() is not invoked to destructively wipe triggers on mount
    expect(getAllSpy).not.toHaveBeenCalled()
  })
})
