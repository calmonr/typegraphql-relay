import { ConnectionCursor, PageInfo as RelayPageInfo } from 'graphql-relay'
import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Information about pagination in a connection.' })
export class PageInfo implements RelayPageInfo {
  @Field(() => String, {
    nullable: true,
    description: 'When paginating backwards, the cursor to continue.'
  })
  readonly startCursor?: ConnectionCursor | null

  @Field(() => String, {
    nullable: true,
    description: 'When paginating forwards, the cursor to continue.'
  })
  readonly endCursor?: ConnectionCursor | null

  @Field(() => Boolean, {
    nullable: true,
    description: 'When paginating backwards, are there more items?'
  })
  readonly hasPreviousPage?: boolean | null

  @Field(() => Boolean, {
    nullable: true,
    description: 'When paginating forwards, are there more items?'
  })
  readonly hasNextPage?: boolean | null
}
