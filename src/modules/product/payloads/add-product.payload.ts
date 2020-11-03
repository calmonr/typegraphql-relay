import { Field, ObjectType } from 'type-graphql'

import { ProductEntity } from '../product.entity'

@ObjectType()
export class AddProductPayload {
  @Field(() => ProductEntity, { nullable: true })
  readonly product?: ProductEntity
}
