import { ConnectionType } from '../../../../src/decorators/relay/connection.type'
import { UserEdge } from './user.edge'

@ConnectionType(UserEdge)
export class UserConnection {}
