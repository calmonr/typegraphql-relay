import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import { buildSchema } from 'type-graphql'
import Container from 'typedi'

import { isDevelopment } from '../utils'

const { GRAPHQL_PATH } = process.env

export default async (app: Express): Promise<void> => {
  const schema = await buildSchema({
    resolvers: [`${__dirname}/../modules/**/*.resolver.{ts,js}`],
    container: Container,
    emitSchemaFile: isDevelopment
  })

  const apolloServer = new ApolloServer({
    schema
  })

  apolloServer.applyMiddleware({ app, path: GRAPHQL_PATH })
}
