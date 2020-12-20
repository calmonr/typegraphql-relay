import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { ConnectionArguments } from '../../relay/connection.args'
import { connectionFromRepository } from '../../relay/connection.factory'
import { AddProductInput } from './inputs/product.input'
import { AddProductPayload } from './payloads/add-product.payload'
import { ProductConnection } from './product.connection'
import { Product } from './product.entity'

@Resolver()
export class ProductResolver {
  @InjectRepository(Product)
  private readonly repository!: Repository<Product>

  @Query(() => ProductConnection)
  async products(
    @Args() args: ConnectionArguments
  ): Promise<ProductConnection> {
    return connectionFromRepository(args, this.repository)
  }

  @Mutation(() => AddProductPayload)
  async addProduct(
    @Arg('input') input: AddProductInput
  ): Promise<AddProductPayload> {
    const product = await this.repository.save(input)

    return {
      product: product || null
    }
  }
}
