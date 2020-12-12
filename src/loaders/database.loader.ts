import { Container } from 'typedi'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  useContainer
} from 'typeorm'

import { isDevelopment } from '../utils'

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME
} = process.env

export default (options?: Partial<ConnectionOptions>): Promise<Connection> => {
  const defined: ConnectionOptions = {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    type: 'postgres',
    synchronize: isDevelopment,
    logging: isDevelopment,
    entities: [`${__dirname}/../modules/**/*.entity.{ts,js}`]
  }

  useContainer(Container)

  return createConnection({
    ...defined,
    ...options
  } as ConnectionOptions)
}
