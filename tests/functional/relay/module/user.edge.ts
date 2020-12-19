import { EdgeType } from '../../../../src/decorators/relay/edge.type'
import { User } from './user.entity'

@EdgeType(User)
export class UserEdge {}
