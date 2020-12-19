import { ObjectType } from 'type-graphql'

import { ConnectionType } from '../../relay/connection.generic'
import { ProductEdge } from './product.edge'

@ObjectType()
export class ProductConnection extends ConnectionType(ProductEdge) {}
