export const DESIGN_TOKENS = {
  colors: {
    primary: '#1a1a1a',
    secondary: '#f5f0e8',
    accent: '#c9a96e',
    accentDark: '#a8834a',
    white: '#ffffff',
    textMuted: '#6b6b6b',
    border: '#e8e0d0',
  },
  fonts: {
    display: 'Cormorant Garamond',
    body: 'DM Sans',
    label: 'DM Sans',
  },
  spacing: {
    unit: 8,
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '64px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
  containers: {
    maxWidth: '1320px',
    paddingMobile: '1.25rem',
    paddingDesktop: '3rem',
  },
  cards: {
    menuMinHeight: '420px',
    teamAspect: '3/4',
    eventAspect: '16/10',
  },
  transitions: {
    default: '0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fast: '0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    slow: '0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  borderRadius: {
    sm: '4px',
    none: '0px',
  },
} as const

export type DesignTokens = typeof DESIGN_TOKENS
