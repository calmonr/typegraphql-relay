import { ConnectionCursor, Edge } from 'graphql-relay'
import { ClassType, Field, ObjectType } from 'type-graphql'

export function EdgeType<V extends ClassType, T extends ClassType>(
  NodeType: V
) {
  return (target: T): ClassType => {
    @ObjectType(target.name, { description: 'An edge in a connection.' })
    class EdgeType extends target implements Edge<V> {
      @Field(() => NodeType, {
        description: 'The item at the end of the edge.'
      })
      readonly node!: V

      @Field(() => String, { description: 'A cursor for use in pagination.' })
      readonly cursor!: ConnectionCursor
    }

    return EdgeType
  }
}
