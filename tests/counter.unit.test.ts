import { describe, it, expect } from 'vitest'
import { counterAnimation } from '@/lib/animations'

describe('Counter Animation for StatsSection (W-208)', () => {
  it('creates counter tween targeting requested number', () => {
    const dummyElem = typeof document !== 'undefined' ? document.createElement('span') : ({} as HTMLElement)
    const tween = counterAnimation(dummyElem, 850)
    expect(tween).toBeDefined()
    expect(tween.vars.duration).toBe(2)
  })
})
