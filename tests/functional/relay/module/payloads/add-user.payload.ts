import { Field, ObjectType } from 'type-graphql'

import { UserEntity } from '../user.entity'

@ObjectType()
export class AddUserPayload {
  @Field(() => UserEntity, { nullable: true })
  readonly user?: UserEntity
}
