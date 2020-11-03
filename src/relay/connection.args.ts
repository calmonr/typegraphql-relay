import { ConnectionArguments, ConnectionCursor } from 'graphql-relay'
import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class ConnectionArgs implements ConnectionArguments {
  @Field(() => String, {
    nullable: true,
    description:
      'Returns the elements in the list that come before the specified cursor.'
  })
  before?: ConnectionCursor | null

  @Field(() => String, {
    nullable: true,
    description:
      'Returns the elements in the list that come after the specified cursor.'
  })
  after?: ConnectionCursor | null

  @Field(() => Int, {
    nullable: true,
    description: 'Returns the first _n_ elements from the list.'
  })
  first?: number | null

  @Field(() => Int, {
    nullable: true,
    description: 'Returns the last _n_ elements from the list.'
  })
  last?: number | null
}
