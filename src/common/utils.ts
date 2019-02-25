export const isBrowser = typeof window !== 'undefined' && window.document
export const isDev = process.env.NODE_ENV !== 'production'
