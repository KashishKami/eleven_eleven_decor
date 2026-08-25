export function sanitizeFilename(filename: string): string {
  const dotIdx = filename.lastIndexOf('.')
  const ext = dotIdx !== -1 ? filename.substring(dotIdx).toLowerCase() : ''
  const base = dotIdx !== -1 ? filename.substring(0, dotIdx) : filename

  const cleanBase = base
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${cleanBase}${ext}`
}

export function buildImageAlt(focusKeyword: string, filename: string): string {
  const dotIdx = filename.lastIndexOf('.')
  const base = dotIdx !== -1 ? filename.substring(0, dotIdx) : filename
  const cleanName = base
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

  const kw = (focusKeyword || '').trim().toLowerCase()
  if (kw) {
    return `${kw} - ${cleanName}`
  }
  return cleanName
}

export function normalizeImageUrl(url: string): string {
  let clean = (url || '').trim()
  if (!clean) return ''

  if (
    !clean.startsWith('http://') &&
    !clean.startsWith('https://') &&
    !clean.startsWith('/') &&
    !clean.startsWith('data:')
  ) {
    clean = 'https://' + clean
  }

  // Detect Unsplash webpage URLs and convert to direct image CDN links
  const unsplashMatch = clean.match(/unsplash\.com\/photos\/(?:[a-zA-Z0-9_-]*-+)?([a-zA-Z0-9_-]+)/i)
  if (unsplashMatch && unsplashMatch[1]) {
    const photoId = unsplashMatch[1].replace(/^-+/, '')
    return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1200&q=80`
  }

  return clean
}
