import { graphql, GraphQLSchema } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { Connection, Repository } from 'typeorm'

import databaseLoader from '../../../src/loaders/database.loader'
import { createSchema } from '../../../src/loaders/gql.loader'
import { NodeResolver } from '../../../src/relay/node.resolver'
import { User } from './module/user.entity'
import { UserResolver } from './module/user.resolver'

const NODE_QUERY = `
  query node($id: ID!) {
    node(id: $id) {
      ... on User {
        name
      }
    }
  }
`

const NODES_QUERY = `
  query nodes($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on User {
        name
      }
    }
  }
`

describe('global object identification', () => {
  let schema: GraphQLSchema
  let database: Connection
  let repository: Repository<User>
  let globalId1: string
  let globalId2: string

  beforeAll(async () => {
    schema = await createSchema({
      resolvers: [NodeResolver, UserResolver]
    })

    database = await databaseLoader({
      entities: [User]
    })

    repository = database.getRepository(User)

    globalId1 = toGlobalId('User', '1')
    globalId2 = toGlobalId('User', '2')
  })

  afterAll(() => database.close())

  beforeEach(() => database.synchronize(true))

  describe('node', () => {
    test('should return an user', async () => {
      const { name } = await repository.save({ name: 'Calmon Ribeiro' })

      const result = await graphql({
        schema,
        source: NODE_QUERY,
        variableValues: {
          id: globalId1
        },
        contextValue: {
          repositories: {
            User: repository
          }
        }
      })

      expect(result.errors).toBeUndefined()
      expect(result.data).toBeObject()
      expect(result.data).toMatchObject({
        node: {
          name
        }
      })
    })

    test('should return null if the user does not exist', async () => {
      const result = await graphql({
        schema,
        source: NODE_QUERY,
        variableValues: {
          id: globalId1
        },
        contextValue: {
          repositories: {
            User: repository
          }
        }
      })

      expect(result.errors).toBeUndefined()
      expect(result.data).toBeObject()
      expect(result.data?.node).toBeNull()
    })

    test('should fail if node type does not exist', async () => {
      const result = await graphql({
        schema,
        source: NODE_QUERY,
        variableValues: {
          id: globalId1
        },
        contextValue: {
          repositories: {}
        }
      })

      expect(result.errors).toBeArray()
      expect(result.errors).toHaveLength(1)
      expect(result.errors?.[0].message).toInclude(
        'Could not resolve to a node'
      )
      expect(result.data).toBeObject()
      expect(result.data?.node).toBeNull()
    })
  })

  describe('nodes', () => {
    test('should return two users', async () => {
      const user1 = await repository.save({ name: 'Calmon Ribeiro' })
      const user2 = await repository.save({ name: 'Michał Lytek' })

      const result = await graphql({
        schema,
        source: NODES_QUERY,
        variableValues: {
          ids: [globalId1, globalId2]
        },
        contextValue: {
          repositories: {
            User: repository
          }
        }
      })

      expect(result.errors).toBeUndefined()
      expect(result.data).toBeObject()
      expect(result.data).toMatchObject({
        nodes: [{ name: user1.name }, { name: user2.name }]
      })
    })

    test('should return an user and null', async () => {
      const { name } = await repository.save({ name: 'Calmon Ribeiro' })

      const result = await graphql({
        schema,
        source: NODES_QUERY,
        variableValues: {
          ids: [globalId1, globalId2]
        },
        contextValue: {
          repositories: {
            User: repository
          }
        }
      })

      expect(result.errors).toBeUndefined()
      expect(result.data).toBeObject()
      expect(result.data).toMatchObject({
        nodes: [{ name }, null]
      })
    })

    test('should return two users and fail', async () => {
      const user1 = await repository.save({ name: 'Calmon Ribeiro' })
      const user2 = await repository.save({ name: 'Michał Lytek' })

      const result = await graphql({
        schema,
        source: NODES_QUERY,
        variableValues: {
          ids: [globalId1, globalId2, toGlobalId('Unknown', '1')]
        },
        contextValue: {
          repositories: {
            User: repository
          }
        }
      })

      expect(result.errors).toBeArray()
      expect(result.errors).toHaveLength(1)
      expect(result.errors?.[0].message).toInclude(
        'Could not resolve to a node'
      )
      expect(result.data).toBeObject()
      expect(result.data).toMatchObject({
        nodes: [{ name: user1.name }, { name: user2.name }, null]
      })
    })
  })
})
