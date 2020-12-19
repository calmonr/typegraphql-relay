import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import { GraphQLSchema } from 'graphql'
import { buildSchema, BuildSchemaOptions } from 'type-graphql'
import Container from 'typedi'

import { NodeResolver } from '../relay/node.resolver'
import { isDevelopment } from '../utils'

const { GRAPHQL_PATH } = process.env

export const createSchema = (
  options?: Partial<BuildSchemaOptions>
): Promise<GraphQLSchema> => {
  const defined = {
    resolvers: [NodeResolver, `${__dirname}/../modules/**/*.resolver.{ts,js}`],
    container: Container,
    emitSchemaFile: isDevelopment
  }

  return buildSchema({
    ...defined,
    ...options
  } as BuildSchemaOptions)
}

export default async (app: Express): Promise<void> => {
  const schema = await createSchema()

  const apolloServer = new ApolloServer({
    schema
  })

  apolloServer.applyMiddleware({ app, path: GRAPHQL_PATH })
}
