import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Inject } from 'typedi'

import { ProductEntity } from './product.entity'
import { AddProductInput } from './product.input'
import { ProductService } from './product.service'

@Resolver()
export class ProductResolver {
  @Inject()
  private service!: ProductService

  @Mutation(() => ProductEntity)
  async addProduct(
    @Arg('input') input: AddProductInput
  ): Promise<ProductEntity> {
    return this.service.add(input)
  }
}
