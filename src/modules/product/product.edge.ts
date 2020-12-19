import { EdgeType } from '../../decorators/relay/edge.type'
import { Product } from './product.entity'

@EdgeType(Product)
export class ProductEdge {}
