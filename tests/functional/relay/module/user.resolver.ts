import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { ConnectionArguments } from '../../../../src/relay/connection.args'
import { connectionFromRepository } from '../../../../src/relay/connection.factory'
import { AddUserInput } from './inputs/user.input'
import { AddUserPayload } from './payloads/add-user.payload'
import { UserConnection } from './user.connection'
import { User } from './user.entity'

@Resolver()
export class UserResolver {
  @InjectRepository(User)
  private readonly repository!: Repository<User>

  @Query(() => UserConnection)
  async users(@Args() args: ConnectionArguments): Promise<UserConnection> {
    return connectionFromRepository(args, this.repository)
  }

  @Mutation(() => AddUserPayload)
  async addUser(@Arg('input') input: AddUserInput): Promise<AddUserPayload> {
    const user = await this.repository.save(input)

    return {
      user: user || null
    }
  }
}
