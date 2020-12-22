import { graphql } from 'graphql'
import { Connection } from 'typeorm'

import databaseLoader from '../../../src/loaders/database.loader'
import { createSchema } from '../../../src/loaders/gql.loader'
import { User } from './module/user.entity'
import { UserResolver } from './module/user.resolver'

const CREATE_USER_MUTATION = `
mutation createUser($input: AddUserInput!) {
  addUser(input: $input) {
    user {
      name
    }
  }
}
`

describe('mutation', () => {
  let database: Connection

  beforeAll(async () => {
    database = await databaseLoader({
      entities: [User]
    })
  })

  afterAll(() => database.close())

  beforeEach(() => database.synchronize(true))

  test('should add an user', async () => {
    const schema = await createSchema({
      validate: false,
      resolvers: [UserResolver]
    })

    const user = {
      name: 'Calmon Ribeiro'
    }

    const result = await graphql({
      schema,
      source: CREATE_USER_MUTATION,
      variableValues: {
        input: {
          ...user
        }
      }
    })

    expect(result.errors).toBeUndefined()
    expect(result.data).toBeObject()
    expect(result.data).toMatchObject({
      addUser: { user }
    })
  })
})
