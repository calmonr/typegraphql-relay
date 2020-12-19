import { ObjectType } from 'type-graphql'

import { ConnectionType } from '../../../../src/relay/connection.generic'
import { UserEdge } from './user.edge'

@ObjectType()
export class UserConnection extends ConnectionType(UserEdge) {}
