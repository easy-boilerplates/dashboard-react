import { isBrowser } from 'common/utils'

export const config = {
  env: process.env.NODE_ENV || 'production',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 5003,

  api: {
    finance: isBrowser ? window.env.api.finance : process.env.FINANCE_API_URL
  }
}

export const clientConfig = {
  ...config.api,
  hash: BUILD_HASH
}
