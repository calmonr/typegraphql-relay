import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { AddUserInput } from './inputs/user.input'
import { UserEntity } from './user.entity'

@Service()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly repository!: Repository<UserEntity>

  async add({ name }: AddUserInput): Promise<UserEntity> {
    return this.repository.save({ name })
  }
}
