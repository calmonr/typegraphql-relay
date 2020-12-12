import { Container } from 'typedi'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  useContainer
} from 'typeorm'

import { isDevelopment } from '../utils'
import { ProductEntity } from '../modules/product/product.entity'

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME
} = process.env

const options: ConnectionOptions = {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  type: 'postgres',
  synchronize: true,
  logging: isDevelopment,
  entities: [ProductEntity]
}

export default (): Promise<Connection> => {
  useContainer(Container)

  return createConnection(options)
}
