import { ConnectionType } from '../../decorators/relay/connection.type'
import { ProductEdge } from './product.edge'

@ConnectionType(ProductEdge)
export class ProductConnection {}
