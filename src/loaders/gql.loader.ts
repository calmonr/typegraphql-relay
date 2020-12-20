import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import { GraphQLSchema } from 'graphql'
import { buildSchema, BuildSchemaOptions } from 'type-graphql'
import Container from 'typedi'
import { Connection } from 'typeorm'

import { Context } from '../interfaces/context.interface'
import { NodeResolver } from '../relay/node.resolver'
import { isDevelopment } from '../utils'

const { GRAPHQL_PATH } = process.env

export const createSchema = (
  options?: Partial<BuildSchemaOptions>
): Promise<GraphQLSchema> => {
  const defined: BuildSchemaOptions = {
    resolvers: [`${__dirname}/../{modules,relay}/**/*.resolver.{ts,js}`],
    container: Container,
    emitSchemaFile: isDevelopment
  }

  return buildSchema({
    ...defined,
    ...options
  } as BuildSchemaOptions)
}

export default async (app: Express, database: Connection): Promise<void> => {
  const schema = await createSchema()

  const context: Context = {
    database,
    repositories: {}
  }

  const apolloServer = new ApolloServer({
    schema,
    context
  })

  apolloServer.applyMiddleware({ app, path: GRAPHQL_PATH })
}
