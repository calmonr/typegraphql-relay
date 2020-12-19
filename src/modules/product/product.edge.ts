import { ObjectType } from 'type-graphql'

import { EdgeType } from '../../relay/edge.generic'
import { Product } from './product.entity'

@ObjectType()
export class ProductEdge extends EdgeType(Product) {}
