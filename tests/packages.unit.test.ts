import { describe, it, expect } from 'vitest'
import { PACKAGES } from '../src/data/packages'

describe('Packages Data Registry (W-502)', () => {
  it('contains exactly 3 package tiers (Essential, Signature, Bespoke)', () => {
    expect(PACKAGES).toHaveLength(3)
    const names = PACKAGES.map((p) => p.name)
    expect(names).toContain('Essential')
    expect(names).toContain('Signature')
    expect(names).toContain('Bespoke')
  })

  it('ensures each tier has mandatory features, custom quote price label, and target audience', () => {
    PACKAGES.forEach((tier) => {
      expect(tier.id).toBeDefined()
      expect(tier.name.length).toBeGreaterThan(0)
      expect(tier.tagline.length).toBeGreaterThan(0)
      expect(tier.priceLabel).toBe('Custom Quote')
      expect(tier.features.length).toBeGreaterThanOrEqual(4)
      expect(tier.popular).toBeTypeOf('boolean')
    })
  })
})
