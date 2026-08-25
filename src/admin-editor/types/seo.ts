export interface SeoImage {
  alt: string
  url?: string
}

export interface SeoInput {
  focusKeyword?: string
  focusKeywords?: string[] | string
  title: string
  slug: string
  metaDescription: string
  content: string
  wordCount: number
  images: SeoImage[]
  internalLinks: number
  externalLinks: number
}

export interface SeoChecks {
  focusKeywordSet: boolean
  keywordInTitle: boolean
  keywordInMetaDescription: boolean
  keywordInUrl: boolean
  keywordInFirstParagraph: boolean
  keywordInSubheadings: boolean
  contentLength: boolean
  metaDescriptionPresent: boolean
  metaDescriptionLength: boolean
  hasInternalLinks: boolean
  hasExternalLinks: boolean
  imageAltContainsKeyword: boolean
  imageAltPresent: boolean
  keywordDensityOk: boolean
  h1Present: boolean
  titleLengthOk: boolean
}

export interface SeoDiagnostics {
  focusKeywordSet: string
  keywordInTitle: string
  titleLengthOk: string
  keywordInUrl: string
  keywordInFirstParagraph: string
  keywordInSubheadings: string
  contentLength: string
  h1Present: string
  metaDescriptionPresent: string
  metaDescriptionLength: string
  keywordInMetaDescription: string
  imageAltContainsKeyword: string
  imageAltPresent: string
  keywordDensityOk: string
  hasInternalLinks: string
  hasExternalLinks: string
}

export interface SeoResult {
  score: number
  scoreColor: 'red' | 'orange' | 'green'
  checks: SeoChecks
  diagnostics: SeoDiagnostics
}
