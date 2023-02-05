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
  let currentTime = Math.round(Date.now() / 1000)
  currentTime = Math.round(currentTime / 10) * 10

  const message = `${userAgent}${url}${method}${currentTime}`

  const hash = HmacSHA512(message, (process.env.apiKey || '')).toString(enc.Base64url)

  return {
    'x-meshhouse-authentication': hash
  }
}
