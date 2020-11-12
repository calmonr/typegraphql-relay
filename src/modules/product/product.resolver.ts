import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import { Inject } from 'typedi'

import { AddProductInput } from './inputs/product.input'
import { ProductService } from './product.service'
import { ProductConnection } from './product.connection'
import { ConnectionArgs } from '../../relay/connection.args'
import { AddProductPayload } from './payloads/add-product.payload'

@Resolver()
export class ProductResolver {
  @Inject()
  private service!: ProductService

  @Query(() => ProductConnection)
  async products(
    @Args() args: ConnectionArgs,
    @Arg('name', () => String, { nullable: true }) product_name: string
  ): Promise<ProductConnection> {
    return this.service.paginate(
      args,
      product_name ? { name: product_name } : undefined
    )
  }

  @Mutation(() => AddProductPayload)
  async addProduct(
    @Arg('input') input: AddProductInput
  ): Promise<AddProductPayload> {
    const product = await this.service.add(input)

    return {
      product: product || null
    }
  }
}
