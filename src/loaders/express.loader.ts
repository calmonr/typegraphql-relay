import express, { Express } from 'express'

const { APPLICATION_NAME } = process.env

export default (): Express => {
  const app = express()

  app.disable('x-powered-by')

  app.get('/', (_req, res) => res.json({ application: APPLICATION_NAME }))

  return app
}
