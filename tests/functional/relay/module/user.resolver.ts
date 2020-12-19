import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import { Inject } from 'typedi'

import { ConnectionArguments } from '../../../../src/relay/connection.args'
import { AddUserInput } from './inputs/user.input'
import { AddUserPayload } from './payloads/add-user.payload'
import { UserConnection } from './user.connection'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  @Inject()
  private readonly service!: UserService

  @Query(() => UserConnection)
  async users(@Args() args: ConnectionArguments): Promise<UserConnection> {
    return this.service.paginate(args)
  }

  @Mutation(() => AddUserPayload)
  async addUser(@Arg('input') input: AddUserInput): Promise<AddUserPayload> {
    const user = await this.service.add(input)

    return {
      user: user || null
    }
  }
}
