/**
 * Utility to resolve relative uploaded image URLs across local development
 * (where PHP server is on port 8080) and live production (GoDaddy).
 */
export function resolveImageUrl(src?: string): string {
  if (!src) return 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop'
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src
  }

  if (src.startsWith('/')) {
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    if (isLocal) {
      return `http://127.0.0.1:8080${src}`
    }
  }

  return src
}
