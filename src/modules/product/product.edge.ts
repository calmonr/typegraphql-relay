import { EdgeType } from '../../decorators/relay/edge.type'
import { ProductEntity } from './product.entity'

@EdgeType(ProductEntity)
export class ProductEdge {}
