import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { ConnectionArguments } from 'graphql-relay'

import { Product } from './product.entity'
import { AddProductInput } from './inputs/product.input'
import { ProductConnection } from './product.connection'
import { connectionFromRepository } from '../../relay/connection.factory'

@Service()
export class ProductService {
  @InjectRepository(Product)
  private readonly repository!: Repository<Product>

  async paginate(args: ConnectionArguments): Promise<ProductConnection> {
    return connectionFromRepository(args, this.repository)
  }

  async findById(id: string): Promise<Product | undefined> {
    return this.repository.findOne(id)
  }

  async add({ name, description }: AddProductInput): Promise<Product> {
    return this.repository.save({ name, description })
  }
}
