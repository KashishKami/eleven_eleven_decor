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
