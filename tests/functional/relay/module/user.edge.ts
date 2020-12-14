import { EdgeType } from '../../../../src/decorators/relay/edge.type'
import { UserEntity } from './user.entity'

@EdgeType(UserEntity)
export class UserEdge {}
