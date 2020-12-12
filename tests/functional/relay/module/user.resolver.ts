import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Inject } from 'typedi'

import { AddUserInput } from './inputs/user.input'
import { AddUserPayload } from './payloads/add-user.payload'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  @Inject()
  private readonly service!: UserService

  @Query()
  hello(): string {
    return 'hello world'
  }

  @Mutation(() => AddUserPayload)
  async addUser(@Arg('input') input: AddUserInput): Promise<AddUserPayload> {
    const user = await this.service.add(input)

    return {
      user: user || null
    }
  }
}
