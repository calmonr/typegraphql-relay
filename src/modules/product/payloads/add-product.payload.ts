import { Field, ObjectType } from 'type-graphql'

import { Product } from '../product.entity'

@ObjectType()
export class AddProductPayload {
  @Field(() => Product, { nullable: true })
  readonly product?: Product
}
