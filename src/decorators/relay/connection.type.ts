import { Connection, Edge } from 'graphql-relay'
import { ClassType, Field, ObjectType } from 'type-graphql'

import { PageInfo } from '../../relay/page-info.object'

export function ConnectionType<V extends ClassType, T extends ClassType>(
  EdgeType: V
) {
  return (target: T): ClassType => {
    @ObjectType(target.name, {
      description: 'A connection to a list of items.'
    })
    class ConnectionType extends target implements Connection<V> {
      @Field(() => [EdgeType], {
        description: 'A list of edges.',
        nullable: 'itemsAndList'
      })
      readonly edges!: Array<Edge<V>>

      @Field({ description: 'Information to aid in pagination.' })
      pageInfo!: PageInfo
    }

    return ConnectionType
  }
}
