declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development'
    HOST: string
    PORT: number

    FINANCE_API_URL: string
  }
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (
    args: any
  ) => (...fn: Function[]) => any

  env: {
    api: {
      finance: string
    }
  }
}

declare var BUILD_HASH: string
