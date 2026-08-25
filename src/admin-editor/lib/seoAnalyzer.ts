import { SeoInput, SeoResult, SeoChecks, SeoDiagnostics } from '../types/seo'

export function analyzeSeo(input: SeoInput): SeoResult {
  // 1. Extract keyword list (supports array, comma-separated string, or single keyword)
  let kwList: string[] = []
  if (Array.isArray(input.focusKeywords)) {
    kwList = input.focusKeywords.map((k) => k.trim().toLowerCase()).filter(Boolean)
  } else if (typeof input.focusKeywords === 'string' && input.focusKeywords.trim()) {
    kwList = input.focusKeywords.split(',').map((k) => k.trim().toLowerCase()).filter(Boolean)
  } else if (input.focusKeyword && input.focusKeyword.trim()) {
    kwList = input.focusKeyword.split(',').map((k) => k.trim().toLowerCase()).filter(Boolean)
  }

  const primaryKw = kwList[0] || ''
  const focusKeywordSet = kwList.length > 0
  const title = (input.title || '').trim()
  const slug = (input.slug || '').trim().toLowerCase()
  const metaDesc = (input.metaDescription || '').trim()
  const content = input.content || ''
  const wordCount = input.wordCount || 0
  const images = input.images || []
  const internalLinks = input.internalLinks || 0
  const externalLinks = input.externalLinks || 0

  const matchesAnyKw = (text: string): boolean => {
    if (!focusKeywordSet) return false
    const lower = text.toLowerCase()
    return kwList.some((k) => lower.includes(k))
  }

  // 1. Keyword in title
  const keywordInTitle = focusKeywordSet && matchesAnyKw(title)

  // 2. Keyword in meta description
  const keywordInMetaDescription = focusKeywordSet && matchesAnyKw(metaDesc)

  // 3. Keyword in URL slug (convert spaces to hyphens)
  const keywordInUrl =
    focusKeywordSet &&
    kwList.some((k) => {
      const kwSlug = k.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      return kwSlug.length > 0 && slug.includes(kwSlug)
    })

  // 4. Keyword in first non-empty content paragraph
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi
  let pMatch: RegExpExecArray | null
  let firstPText = ''
  while ((pMatch = pRegex.exec(content)) !== null) {
    const text = pMatch[1]?.replace(/<[^>]+>/g, '').trim().toLowerCase() || ''
    if (text.length > 0) {
      firstPText = text
      break
    }
  }
  const keywordInFirstParagraph = focusKeywordSet && matchesAnyKw(firstPText)

  // 5. Keyword in subheadings (h2, h3)
  const subheadingsRegex = /<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi
  let match: RegExpExecArray | null
  let foundInSubheading = false
  while ((match = subheadingsRegex.exec(content)) !== null) {
    const headingText = match[1]?.replace(/<[^>]+>/g, '').toLowerCase() || ''
    if (focusKeywordSet && matchesAnyKw(headingText)) {
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
  const matchingImages = images.filter((img) => img.alt && matchesAnyKw(img.alt))
  const imageAltContainsKeyword = focusKeywordSet && images.length > 0 && matchingImages.length > 0

  // 12. Every image has non-empty alt (fails if 0 images or any image lacks alt)
  const emptyAltImages = images.filter((img) => !img.alt || img.alt.trim().length === 0)
  const imageAltPresent = images.length > 0 && emptyAltImages.length === 0

  // 13. Keyword density (0.5% - 4.0% of primary keyword)
  let keywordDensityOk = false
  let density = 0
  let kwCount = 0
  if (focusKeywordSet && wordCount > 0 && primaryKw) {
    const rawContentText = content.replace(/<[^>]+>/g, ' ').toLowerCase()
    const kwEscaped = primaryKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const kwMatches = rawContentText.match(new RegExp(kwEscaped, 'g')) || []
    kwCount = kwMatches.length
    density = (kwCount / Math.max(wordCount, 1)) * 100
    keywordDensityOk = density >= 0.5 && density <= 4.0
  }

  // 14. Exactly one H1 present (Title renders as the public H1; having an H1 inside body creates duplicates)
  const h1MatchesInBody = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []
  const totalH1Count = (title.length > 0 ? 1 : 0) + h1MatchesInBody.length
  const h1Present = totalH1Count === 1

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

  // Diagnostics: Reality vs. Expectation detail strings
  const diagnostics: SeoDiagnostics = {
    focusKeywordSet: focusKeywordSet
      ? `${kwList.length} active keyword${kwList.length > 1 ? 's' : ''} (${kwList.map((k) => `"${k}"`).join(', ')})`
      : 'No focus keyword set (Add at least 1 keyword)',

    keywordInTitle: keywordInTitle
      ? 'Focus keyword found in article title'
      : focusKeywordSet
        ? `Missing "${primaryKw}" in article title`
        : 'Keyword not set',

    titleLengthOk: titleLengthOk
      ? `${title.length} / 50–60 chars (Optimal length)`
      : title.length < 50
        ? `${title.length} / 50–60 chars (${50 - title.length} more chars recommended)`
        : `${title.length} / 50–60 chars (${title.length - 60} chars over limit)`,

    keywordInUrl: keywordInUrl
      ? 'Focus keyword found in URL slug'
      : focusKeywordSet
        ? `Missing "${primaryKw}" in URL slug`
        : 'Keyword not set',

    keywordInFirstParagraph: keywordInFirstParagraph
      ? 'Focus keyword found in introductory paragraph'
      : focusKeywordSet
        ? 'Focus keyword missing in first content paragraph'
        : 'Keyword not set',

    keywordInSubheadings: keywordInSubheadings
      ? 'Focus keyword found in H2/H3 subheadings'
      : focusKeywordSet
        ? '0 subheadings (H2/H3) contain focus keyword'
        : 'Keyword not set',

    contentLength: contentLength
      ? `${wordCount} / 600 words (Good length)`
      : `${wordCount} / 600 words (${Math.max(0, 600 - wordCount)} more words needed)`,

    h1Present:
      totalH1Count === 1
        ? '1 H1 tag confirmed (Page Title)'
        : totalH1Count === 0
          ? '0 H1 tags (Add an article title)'
          : `${totalH1Count} H1 tags found (Duplicate H1 in content body)`,

    metaDescriptionPresent: metaDescriptionPresent
      ? `${metaDesc.length} characters written`
      : 'Meta description is empty',

    metaDescriptionLength: metaDescriptionLength
      ? `${metaDesc.length} / 120–160 chars (Optimal length)`
      : metaDesc.length < 120
        ? `${metaDesc.length} / 120–160 chars (${120 - metaDesc.length} more chars needed)`
        : `${metaDesc.length} / 120–160 chars (${metaDesc.length - 160} chars over limit)`,

    keywordInMetaDescription: keywordInMetaDescription
      ? 'Focus keyword included in meta description'
      : focusKeywordSet
        ? 'Focus keyword missing in meta description'
        : 'Keyword not set',

    imageAltContainsKeyword: imageAltContainsKeyword
      ? `${matchingImages.length} of ${images.length} images include keyword`
      : images.length === 0
        ? 'No images in article'
        : `0 of ${images.length} images include keyword in alt`,

    imageAltPresent:
      images.length === 0
        ? '0 images in article (Add at least 1 image)'
        : emptyAltImages.length === 0
          ? `All ${images.length} images have non-empty alt text`
          : `${emptyAltImages.length} of ${images.length} images missing alt text`,

    keywordDensityOk:
      focusKeywordSet && wordCount > 0
        ? `${density.toFixed(1)}% (${kwCount} matches in ${wordCount} words • Target: 0.5%–4%)`
        : '0.0% (Write content to calculate density)',

    hasInternalLinks:
      internalLinks >= 1
        ? `${internalLinks} internal website link${internalLinks > 1 ? 's' : ''} found`
        : '0 internal links found (Link to /services/ or /blog/)',

    hasExternalLinks:
      externalLinks >= 1
        ? `${externalLinks} external reference link${externalLinks > 1 ? 's' : ''} found`
        : '0 external reference links found (Add a trusted source link)',
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
    diagnostics,
  }
}
