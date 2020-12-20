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
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Product } from '../modules/product/product.entity'
import { Node } from './node.interface'

@Resolver(() => Node)
export class NodeResolver {
  @InjectRepository(Product)
  private readonly repository!: Repository<Product>

  @FieldResolver()
  globalId(
    @Root() { id }: { id: string },
    @Info() { parentType: { name } }: { parentType: { name: string } }
  ): string {
    return toGlobalId(name, id)
  }

  // TODO: use dataloader
  // TODO: find a better way to automate and avoid if conditions
  @Query(() => Node, {
    nullable: true,
    description: 'Fetches an object given its global ID.'
  })
  async node(
    @Arg('id', () => ID, {
      description: 'The global ID of the object.'
    })
    globalId: string
  ): Promise<Node | undefined> {
    const { type, id } = fromGlobalId(globalId)

    if (type == 'Product') {
      return this.repository.findOne(id)
    }

    throw new UserInputError(
      `Could not resolve to a node with the global ID of '${globalId}'`
    )
  }

  @Query(() => [Node], {
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
