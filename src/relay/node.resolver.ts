import { UserInputError } from 'apollo-server-express'
import { fromGlobalId, toGlobalId } from 'graphql-relay'
import {
  Arg,
  FieldResolver,
  ID,
  Info,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Inject } from 'typedi'

import { ProductService } from '../modules/product/product.service'
import { NodeInterface } from './node.interface'

@Resolver(() => NodeInterface)
export class NodeResolver {
  @Inject()
  private readonly productService!: ProductService

  @FieldResolver()
  globalId(
    @Root() { id }: { id: string },
    @Info() { parentType: { name } }: { parentType: { name: string } }
  ): string {
    return toGlobalId(name, id)
  }

  // TODO: use dataloader
  // TODO: find a better way to automate and avoid if conditions
  @Query(() => NodeInterface, {
    nullable: true,
    description: 'Fetches an object given its global ID.'
  })
  async node(
    @Arg('id', () => ID, {
      description: 'The global ID of the object.'
    })
    globalId: string
  ): Promise<NodeInterface | undefined> {
    const { type, id } = fromGlobalId(globalId)

    if (type == 'Product') {
      return this.productService.findById(id)
    }

    throw new UserInputError(
      `Could not resolve to a node with the global ID of '${globalId}'`
    )
  }

  @Query(() => [NodeInterface], {
    nullable: 'items',
    description: 'Fetches objects given their global IDs.'
  })
  async nodes(
    @Arg('ids', () => [ID], {
      description: 'The global IDs of the objects.'
    })
    globalIds: Array<string>
  ): Promise<Array<ReturnType<NodeResolver['node']>>> {
    return globalIds.map(id => this.node(id))
  }
}
