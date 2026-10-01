export interface FaqItem {
  question: string
  answer: string
}

/**
 * Extracts FAQ question/answer items from HTML content.
 * Compatible with Tiptap FaqBlock output (<details class="faq-item">)
 * as well as standard HTML details/summary elements.
 */
export function extractFaqsFromHtml(html?: string): FaqItem[] {
  if (!html || typeof html !== 'string') {
    return []
  }

  const faqs: FaqItem[] = []

  // Regex to match <details ...> ... </details> blocks
  const detailsRegex = /<details[^>]*>([\s\S]*?)<\/details>/gi
  let match: RegExpExecArray | null

  while ((match = detailsRegex.exec(html)) !== null) {
    const innerContent = match[1] || ''

    // Extract summary text (question)
    const summaryMatch = innerContent.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i)
    if (!summaryMatch) continue

    const rawQuestion = summaryMatch[1] || ''
    const question = rawQuestion.replace(/<[^>]+>/g, '').trim()

    // Remove summary tag to get the remaining answer body
    const withoutSummary = innerContent.replace(/<summary[^>]*>[\s\S]*?<\/summary>/i, '')

    // Clean html tags but preserve clean text
    const answer = withoutSummary.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

    if (question && answer) {
      faqs.push({ question, answer })
    }
  }

  return faqs
}
