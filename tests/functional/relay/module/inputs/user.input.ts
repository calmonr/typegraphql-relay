import { Field, InputType } from 'type-graphql'

@InputType()
export class AddUserInput {
  @Field()
  name!: string
}
