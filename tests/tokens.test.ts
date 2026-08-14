import { describe, it, expect } from 'vitest'
import { DESIGN_TOKENS } from '@/lib/tokens'

describe('DESIGN_TOKENS', () => {
  it('defines correct color tokens', () => {
    expect(DESIGN_TOKENS.colors.primary).toBe('#1a1a1a')
    expect(DESIGN_TOKENS.colors.accent).toBe('#c9a96e')
    expect(DESIGN_TOKENS.colors.secondary).toBe('#f5f0e8')
  })

  it('defines correct typography font families', () => {
    expect(DESIGN_TOKENS.fonts.display).toBe('Cormorant Garamond')
    expect(DESIGN_TOKENS.fonts.body).toBe('DM Sans')
  })

  it('defines responsive breakpoints', () => {
    expect(DESIGN_TOKENS.breakpoints.sm).toBe('640px')
    expect(DESIGN_TOKENS.breakpoints.md).toBe('768px')
    expect(DESIGN_TOKENS.breakpoints.lg).toBe('1024px')
    expect(DESIGN_TOKENS.breakpoints.xl).toBe('1280px')
    expect(DESIGN_TOKENS.breakpoints.xxl).toBe('1536px')
  })

  it('defines responsive layout container settings', () => {
    expect(DESIGN_TOKENS.containers.maxWidth).toBe('1320px')
    expect(DESIGN_TOKENS.containers.paddingMobile).toBe('1.25rem')
    expect(DESIGN_TOKENS.containers.paddingDesktop).toBe('3rem')
  })

  it('defines explicit card size rules and aspect ratios', () => {
    expect(DESIGN_TOKENS.cards.menuMinHeight).toBe('420px')
    expect(DESIGN_TOKENS.cards.teamAspect).toBe('3/4')
    expect(DESIGN_TOKENS.cards.eventAspect).toBe('16/10')
  })
})
