export const loadEnvVar = (key: string): string | never => {
  const value = process.env[key]
  if (!value) {
    console.log(`[ENV]: variable ${key} not loaded`)
    return ''
  }
  return value
}

export const isProd = process.env.NODE_ENV === 'production'
export const gatewayUrl = loadEnvVar('REACT_APP_GATEWAY_URL')
