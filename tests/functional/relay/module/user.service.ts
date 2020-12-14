import { ConnectionArguments } from 'graphql-relay'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { connectionFromRepository } from '../../../../src/relay/connection.factory'
import { AddUserInput } from './inputs/user.input'
import { UserConnection } from './user.connection'
import { UserEntity } from './user.entity'

@Service()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly repository!: Repository<UserEntity>

  async paginate(args: ConnectionArguments): Promise<UserConnection> {
    return connectionFromRepository(args, this.repository)
  }

  async add({ name }: AddUserInput): Promise<UserEntity> {
    return this.repository.save({ name })
  }
}
