import { Connection, Edge } from 'graphql-relay'
import { ClassType, Field, ObjectType } from 'type-graphql'

import { PageInfo } from './page-info.object'

type NodeType<E> = E extends Edge<infer N> ? N : unknown

export function ConnectionType<E extends Edge<N>, N = NodeType<E>>(
  EdgeType: ClassType<E>
) {
  @ObjectType({ isAbstract: true })
  abstract class ConnectionClass implements Connection<N> {
    @Field(() => [EdgeType], {
      description: 'A list of edges.',
      nullable: 'itemsAndList'
    })
    readonly edges!: Array<E>

    @Field({ description: 'Information to aid in pagination.' })
    readonly pageInfo!: PageInfo
  }

  return ConnectionClass
}
