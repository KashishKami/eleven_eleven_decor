import { describe, it, expect } from 'vitest'
import {
  fadeUpAnimation,
  staggerAnimation,
  revealClipAnimation,
  counterAnimation,
} from '@/lib/animations'

describe('Animation presets in src/lib/animations.ts', () => {
  it('fadeUpAnimation creates a configuration with duration 0.8 and y offset 60', () => {
    const mockEl = typeof document !== 'undefined' ? document.createElement('div') : ({} as HTMLElement)
    const anim = fadeUpAnimation(mockEl)
    expect(anim).toBeDefined()
    expect(anim.vars.duration).toBe(0.8)
    expect(anim.vars.y).toBe(60)
  })

  it('staggerAnimation configures stagger of 0.1 for child elements', () => {
    const mockContainer = typeof document !== 'undefined' ? document.createElement('div') : ({} as HTMLElement)
    const mockChildren = typeof document !== 'undefined' ? [document.createElement('div')] : ([{}] as HTMLElement[])
    const anim = staggerAnimation(mockContainer, mockChildren)
    expect(anim).toBeDefined()
    expect(anim.vars.stagger).toBe(0.1)
  })

  it('revealClipAnimation configures clip-path transition', () => {
    const mockEl = typeof document !== 'undefined' ? document.createElement('div') : ({} as HTMLElement)
    const anim = revealClipAnimation(mockEl)
    expect(anim).toBeDefined()
    expect(anim.vars.clipPath).toBe('inset(0% 0% 0% 0%)')
  })

  it('counterAnimation returns tween targeting specified value', () => {
    const mockEl = typeof document !== 'undefined' ? document.createElement('span') : ({} as HTMLElement)
    const anim = counterAnimation(mockEl, 500)
    expect(anim).toBeDefined()
    expect(anim.vars.duration).toBe(2)
  })
})
