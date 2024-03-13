export const createLogger = (scope: string) => ({
  // levels
  log: (...messages) => console.log('⚪', `[${scope}]`, ...messages),
  info: (...messages) => console.info('🔵', `[${scope}]`, ...messages),
  warn: (...messages) => console.warn('🟠', `[${scope}]`, ...messages),
  error: (...messages) => console.error('🔴', `[${scope}]`, ...messages),
  debug: (...messages) => console.debug('🟤', `[${scope}]`, ...messages),
  // aliases
  success: (...messages) => console.log('🟢', `[${scope}]`, ...messages),
  failure: (...messages) => console.warn('🔴', `[${scope}]`, ...messages)
})

export default createLogger('APP')
