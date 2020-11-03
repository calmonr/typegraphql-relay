import { MinLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class AddProductInput {
  @Field()
  @MinLength(3)
  name!: string

  @Field()
  @MinLength(100)
  description!: string
}
