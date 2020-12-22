import { UserInputError } from 'apollo-server-express'
import { fromGlobalId, toGlobalId } from 'graphql-relay'
import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Info,
  Query,
  Resolver,
  Root
} from 'type-graphql'

import { Context } from '../interfaces/context.interface'
import { Node } from './node.interface'

@Resolver(() => Node)
export class NodeResolver {
  @FieldResolver()
  globalId(
    @Root() { id }: { id: string },
    @Info() { parentType: { name } }: { parentType: { name: string } }
  ): string {
    return toGlobalId(name, id)
  }

  private async fetcher(
    globalId: string,
    { repositories }: Context
  ): Promise<Node | undefined> {
    const { type, id } = fromGlobalId(globalId)

    const repository = repositories[type]

    if (!repository) {
      throw new UserInputError(
        `Could not resolve to a node with the global ID of '${globalId}'`
      )
    }

    return repository.findOne(id)
  }

  // TODO: use dataloader
  @Query(() => Node, {
    nullable: true,
    description: 'Fetches an object given its global ID.'
  })
  async node(
    @Arg('id', () => ID, { description: 'The global ID of the object.' })
    globalId: string,
    @Ctx() context: Context
  ): ReturnType<NodeResolver['fetcher']> {
    return this.fetcher(globalId, context)
  }

  @Query(() => [Node], {
    nullable: 'items',
    description: 'Fetches objects given their global IDs.'
  })
  async nodes(
    @Arg('ids', () => [ID], { description: 'The global IDs of the objects.' })
    globalIds: Array<string>,
    @Ctx() context: Context
  ): Promise<Array<ReturnType<NodeResolver['fetcher']>>> {
    return globalIds.map(id => this.fetcher(id, context))
  }
}
