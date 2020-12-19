import { ObjectType } from 'type-graphql'

import { EdgeType } from '../../../../src/relay/edge.generic'
import { User } from './user.entity'

@ObjectType()
export class UserEdge extends EdgeType(User) {}
