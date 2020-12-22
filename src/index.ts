/// <reference path="../typings/env.d.ts" />

import 'reflect-metadata'
import consola from 'consola'

import databaseLoader from './loaders/database.loader'
import expressLoader from './loaders/express.loader'
import gqlLoader from './loaders/gql.loader'

const { APPLICATION_NAME, SERVER_HOSTNAME, SERVER_PORT } = process.env

const bootstrap = async () => {
  const database = await databaseLoader()

  const application = expressLoader()

  gqlLoader(application, database)

  application.listen({ hostname: SERVER_HOSTNAME, port: SERVER_PORT }, () => {
    consola.info(APPLICATION_NAME)

    consola.success(
      `The server is running at http://${SERVER_HOSTNAME}:${SERVER_PORT}`
    )
  })
}

bootstrap()
