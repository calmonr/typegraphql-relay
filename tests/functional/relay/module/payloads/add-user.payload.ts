import { Field, ObjectType } from 'type-graphql'

import { User } from '../user.entity'

@ObjectType()
export class AddUserPayload {
  @Field(() => User, { nullable: true })
  readonly user?: User
}
