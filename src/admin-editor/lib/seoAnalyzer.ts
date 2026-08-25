import { SeoInput, SeoResult, SeoChecks } from '../types/seo'

export function analyzeSeo(input: SeoInput): SeoResult {
  const kw = (input.focusKeyword || '').trim().toLowerCase()
  const title = (input.title || '').trim()
  const slug = (input.slug || '').trim().toLowerCase()
  const metaDesc = (input.metaDescription || '').trim()
  const content = input.content || ''
  const wordCount = input.wordCount || 0
  const images = input.images || []
  const internalLinks = input.internalLinks || 0
  const externalLinks = input.externalLinks || 0

  // Gate check: Focus keyword set
  const focusKeywordSet = kw.length > 0

  // 1. Keyword in title
  const keywordInTitle = focusKeywordSet && title.toLowerCase().includes(kw)

  // 2. Keyword in meta description
  const keywordInMetaDescription = focusKeywordSet && metaDesc.toLowerCase().includes(kw)

  // 3. Keyword in URL slug (convert spaces to hyphens)
  const kwSlug = kw.replace(/\s+/g, '-')
  const keywordInUrl = focusKeywordSet && slug.includes(kwSlug)

  // 4. Keyword in first paragraph
  const firstPRegex = /<p[^>]*>([\s\S]*?)<\/p>/i
  const firstPMatch = content.match(firstPRegex)
  const firstPText = firstPMatch ? firstPMatch[1]?.replace(/<[^>]+>/g, '').toLowerCase() || '' : ''
  const keywordInFirstParagraph = focusKeywordSet && firstPText.includes(kw)

  // 5. Keyword in subheadings (h2, h3)
  const subheadingsRegex = /<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi
  let match: RegExpExecArray | null
  let foundInSubheading = false
  while ((match = subheadingsRegex.exec(content)) !== null) {
    const headingText = match[1]?.replace(/<[^>]+>/g, '').toLowerCase() || ''
    if (focusKeywordSet && headingText.includes(kw)) {
      foundInSubheading = true
      break
    }
  }
  const keywordInSubheadings = foundInSubheading

  // 6. Content length (>= 600 words)
  const contentLength = wordCount >= 600

  // 7. Meta description present
  const metaDescriptionPresent = metaDesc.length > 0

  // 8. Meta description length (120 - 160 chars)
  const metaDescriptionLength = metaDesc.length >= 120 && metaDesc.length <= 160

  // 9. Internal links
  const hasInternalLinks = internalLinks >= 1

  // 10. External links
  const hasExternalLinks = externalLinks >= 1

  // 11. Image alt contains keyword
  const imageAltContainsKeyword =
    focusKeywordSet &&
    images.length > 0 &&
    images.some((img) => img.alt && img.alt.toLowerCase().includes(kw))

  // 12. Every image has alt
  const imageAltPresent = images.length > 0 ? images.every((img) => img.alt && img.alt.trim().length > 0) : true

  // 13. Keyword density (0.5% - 4.0%)
  let keywordDensityOk = true
  if (focusKeywordSet && wordCount > 0) {
    const rawContentText = content.replace(/<[^>]+>/g, ' ').toLowerCase()
    // count occurrences of kw
    const kwCount = (rawContentText.match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length
    const density = (kwCount / Math.max(wordCount, 1)) * 100
    keywordDensityOk = density >= 0.5 && density <= 4.0
  }

  // 14. Exactly one H1 present
  const h1Matches = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []
  const h1Present = h1Matches.length === 1

  // 15. Title length (50 - 60 chars)
  const titleLengthOk = title.length >= 50 && title.length <= 60

  const checks: SeoChecks = {
    focusKeywordSet,
    keywordInTitle,
    keywordInMetaDescription,
    keywordInUrl,
    keywordInFirstParagraph,
    keywordInSubheadings,
    contentLength,
    metaDescriptionPresent,
    metaDescriptionLength,
    hasInternalLinks,
    hasExternalLinks,
    imageAltContainsKeyword,
    imageAltPresent,
    keywordDensityOk,
    h1Present,
    titleLengthOk,
  }

  // Score points allocation (Total = 100)
  let score = 0
  if (checks.focusKeywordSet) score += 20
  if (checks.keywordInTitle) score += 8
  if (checks.keywordInMetaDescription) score += 5
  if (checks.keywordInUrl) score += 5
  if (checks.keywordInFirstParagraph) score += 5
  if (checks.keywordInSubheadings) score += 3
  if (checks.contentLength) score += 10
  if (checks.metaDescriptionPresent) score += 4
  if (checks.metaDescriptionLength) score += 4
  if (checks.hasInternalLinks) score += 3
  if (checks.hasExternalLinks) score += 2
  if (checks.imageAltContainsKeyword) score += 5
  if (checks.imageAltPresent) score += 4
  if (checks.keywordDensityOk) score += 6
  if (checks.h1Present) score += 8
  if (checks.titleLengthOk) score += 8

  // Score color
  let scoreColor: 'red' | 'orange' | 'green' = 'red'
  if (score >= 80) {
    scoreColor = 'green'
  } else if (score >= 50) {
    scoreColor = 'orange'
  }

  return {
    score,
    scoreColor,
    checks,
  }
}
