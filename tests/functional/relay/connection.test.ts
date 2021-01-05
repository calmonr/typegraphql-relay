import { graphql, GraphQLSchema } from 'graphql'
import { ConnectionCursor, offsetToCursor } from 'graphql-relay'
import { Connection, Repository } from 'typeorm'

import databaseLoader from '../../../src/loaders/database.loader'
import { createSchema } from '../../../src/loaders/gql.loader'
import { User } from './module/user.entity'
import { UserResolver } from './module/user.resolver'

const USERS_QUERY = `
query users($before: String, $after: String, $first: Int, $last: Int) {
  users(before: $before, after: $after, first: $first, last: $last) {
    edges {
      node {
        name
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
    totalCount
  }
}
`

describe('connection', () => {
  let schema: GraphQLSchema
  let database: Connection
  let repository: Repository<User>
  let cursor0: ConnectionCursor
  let cursor1: ConnectionCursor
  let cursor2: ConnectionCursor

  beforeAll(async () => {
    schema = await createSchema({
      resolvers: [UserResolver]
    })

    database = await databaseLoader({
      entities: [User]
    })

    repository = database.getRepository(User)

    cursor0 = offsetToCursor(0)
    cursor1 = offsetToCursor(1)
    cursor2 = offsetToCursor(2)
  })

  afterAll(() => database.close())

  beforeEach(() => database.synchronize(true))

  describe('pagination', () => {
    describe('forward', () => {
      test('should return first 2', async () => {
        const user1 = await repository.save({ name: 'Calmon Ribeiro' })
        const user2 = await repository.save({ name: 'Michał Lytek' })

        await repository.save({ name: 'Lee Byron' })

        const result = await graphql({
          schema,
          source: USERS_QUERY,
          variableValues: {
            first: 2
          }
        })

        expect(result.errors).toBeUndefined()
        expect(result.data).toBeObject()
        expect(result.data?.users.edges).toBeArray()
        expect(result.data?.users.edges).toHaveLength(2)
        expect(result.data).toMatchObject({
          users: {
            edges: [
              { node: { name: user1.name }, cursor: cursor0 },
              { node: { name: user2.name }, cursor: cursor1 }
            ],
            pageInfo: {
              startCursor: cursor0,
              endCursor: cursor1,
              hasPreviousPage: false,
              hasNextPage: true
            }
          }
        })
      })

      test('should return first 2 after cursor', async () => {
        await repository.save({ name: 'Calmon Ribeiro' })

        const user2 = await repository.save({ name: 'Michał Lytek' })
        const user3 = await repository.save({ name: 'Lee Byron' })

        const result = await graphql({
          schema,
          source: USERS_QUERY,
          variableValues: {
            first: 2,
            after: cursor0
          }
        })

        expect(result.errors).toBeUndefined()
        expect(result.data).toBeObject()
        expect(result.data?.users.edges).toBeArray()
        expect(result.data?.users.edges).toHaveLength(2)
        expect(result.data).toMatchObject({
          users: {
            edges: [
              { node: { name: user2.name }, cursor: cursor1 },
              { node: { name: user3.name }, cursor: cursor2 }
            ],
            pageInfo: {
              startCursor: cursor1,
              endCursor: cursor2,
              hasPreviousPage: false,
              hasNextPage: false
            }
          }
        })
      })
    })

    describe('backward', () => {
      test('should return last 2', async () => {
        await repository.save({ name: 'Calmon Ribeiro' })

        const user2 = await repository.save({ name: 'Michał Lytek' })
        const user3 = await repository.save({ name: 'Lee Byron' })

        const result = await graphql({
          schema,
          source: USERS_QUERY,
          variableValues: {
            last: 2
          }
        })

        expect(result.errors).toBeUndefined()
        expect(result.data).toBeObject()
        expect(result.data?.users.edges).toBeArray()
        expect(result.data?.users.edges).toHaveLength(2)
        expect(result.data).toMatchObject({
          users: {
            edges: [
              { node: { name: user2.name }, cursor: cursor1 },
              { node: { name: user3.name }, cursor: cursor2 }
            ],
            pageInfo: {
              startCursor: cursor1,
              endCursor: cursor2,
              hasPreviousPage: true,
              hasNextPage: false
            }
          }
        })
      })

      test('should return last 2 before cursor', async () => {
        const user1 = await repository.save({ name: 'Calmon Ribeiro' })
        const user2 = await repository.save({ name: 'Michał Lytek' })

        await repository.save({ name: 'Lee Byron' })

        const result = await graphql({
          schema,
          source: USERS_QUERY,
          variableValues: {
            last: 2,
            before: cursor2
          }
        })

        expect(result.errors).toBeUndefined()
        expect(result.data).toBeObject()
        expect(result.data?.users.edges).toBeArray()
        expect(result.data?.users.edges).toHaveLength(2)
        expect(result.data).toMatchObject({
          users: {
            edges: [
              { node: { name: user1.name }, cursor: cursor0 },
              { node: { name: user2.name }, cursor: cursor1 }
            ],
            pageInfo: {
              startCursor: cursor0,
              endCursor: cursor1,
              hasPreviousPage: false,
              hasNextPage: false
            }
          }
        })
      })
    })
  })

  describe('total count', () => {
    test('should return 0', async () => {
      const result = await graphql({
        schema,
        source: USERS_QUERY
      })

      expect(result.errors).toBeUndefined()
      expect(result.data).toBeObject()
      expect(result.data).toMatchObject({
        users: {
          totalCount: 0
        }
      })
    })

    test('should return 2', async () => {
      await repository.save({ name: 'Calmon Ribeiro' })
      await repository.save({ name: 'Michał Lytek' })

      const result = await graphql({
        schema,
        source: USERS_QUERY
      })

      expect(result.errors).toBeUndefined()
      expect(result.data).toBeObject()
      expect(result.data).toMatchObject({
        users: {
          totalCount: 2
        }
      })
    })
  })
})
