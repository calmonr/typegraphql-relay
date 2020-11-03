import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Inject } from 'typedi'

import { ProductEntity } from './product.entity'
import { ProductInput } from './product.input'
import { ProductService } from './product.service'

@Resolver()
export class ProductResolver {
  @Inject()
  private service!: ProductService

  @Query(() => [ProductEntity])
  async products(): Promise<Array<ProductEntity>> {
    return this.service.all()
  }

  @Mutation(() => ProductEntity)
  async addProduct(
    @Arg('product') product: ProductInput
  ): Promise<ProductEntity> {
    return this.service.add(product)
  }
}
