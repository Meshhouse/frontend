import { HmacSHA512, enc } from 'crypto-js'

export function generateAuthHeader (requestUrl: string, requestMethod: string): Record<string, string> {
  let userAgent = ''
  if (process.server) {
    userAgent = 'Meshhouse SSR 1.0'
  } else {
    userAgent = window.navigator.userAgent
  }

  const url = `/req/${requestUrl}`
  const method = requestMethod.toUpperCase() || ''
  const host = new URL(process.server ? process.env.SSR_API_URL || '' : process.env.BROWSER_API_URL || '').host
  const timestamp = Math.round(Date.now() / 1000)

  const message = `${userAgent}${host}${method}${url}${timestamp}`

  const hash = HmacSHA512(message, (process.env.apiKey || '')).toString(enc.Base64url)

  return {
    'x-meshhouse-authentication': hash,
    'x-meshhouse-ts': timestamp.toString()
  }
}
