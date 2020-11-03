declare namespace NodeJS {
  export interface ProcessEnv {
    APPLICATION_NAME: string
    DATABASE_HOST: string
    DATABASE_PORT: number
    DATABASE_USERNAME: string
    DATABASE_PASSWORD: string
    DATABASE_NAME: string
  }
}
