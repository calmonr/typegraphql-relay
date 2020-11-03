/// <reference path="../typings/env.d.ts" />

import consola from 'consola'

import expressLoader from './loaders/express.loader'

const { APPLICATION_NAME, SERVER_HOSTNAME, SERVER_PORT } = process.env

const bootstrap = async () => {
  const application = expressLoader()

  application.listen({ hostname: SERVER_HOSTNAME, port: SERVER_PORT }, () => {
    consola.info(APPLICATION_NAME)

    consola.success(
      `The server is running at http://${SERVER_HOSTNAME}:${SERVER_PORT}`
    )
  })
}

bootstrap()
