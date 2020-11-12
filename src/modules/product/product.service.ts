import { Service } from 'typedi'
import { FindConditions, Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { ProductEntity } from './product.entity'
import { AddProductInput } from './inputs/product.input'
import { ConnectionArguments } from 'graphql-relay'
import { ProductConnection } from './product.connection'
import { connectionFromRepository } from '../../relay/connection.factory'

@Service()
export class ProductService {
  @InjectRepository(ProductEntity)
  private readonly repository!: Repository<ProductEntity>

  async paginate(
    args: ConnectionArguments,
    filter?: FindConditions<ProductEntity>
  ): Promise<ProductConnection> {
    return connectionFromRepository(args, this.repository, filter)
  }

  async findById(id: string): Promise<ProductEntity | undefined> {
    return this.repository.findOne(id)
  }

  async add({ name, description }: AddProductInput): Promise<ProductEntity> {
    return this.repository.save({ name, description })
  }
}
