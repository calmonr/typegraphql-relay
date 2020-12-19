import { Max, Min } from 'class-validator'
import {
  ConnectionArguments as RelayConnectionArguments,
  ConnectionCursor
} from 'graphql-relay'
import { ArgsType, Field, Int } from 'type-graphql'

import { CannotWith } from '../validators/cannot-with.validator'

// TODO: validate must provide at least first or last
@ArgsType()
export class ConnectionArguments implements RelayConnectionArguments {
  @Field(() => String, {
    nullable: true,
    description:
      'Returns the elements in the list that come before the specified cursor.'
  })
  @CannotWith(['after', 'first'])
  before?: ConnectionCursor | null

  @Field(() => String, {
    nullable: true,
    description:
      'Returns the elements in the list that come after the specified cursor.'
  })
  @CannotWith(['before', 'last'])
  after?: ConnectionCursor | null

  @Field(() => Int, {
    nullable: true,
    description: 'Returns the first _n_ elements from the list.'
  })
  @CannotWith(['before', 'last'])
  @Min(1)
  @Max(100)
  first?: number | null

  @Field(() => Int, {
    nullable: true,
    description: 'Returns the last _n_ elements from the list.'
  })
  @CannotWith(['after', 'first'])
  @Min(1)
  @Max(100)
  last?: number | null
}
