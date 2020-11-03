import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { ProductEntity } from './product.entity'
import { ProductInput } from './product.input'

@Service()
export class ProductService {
  @InjectRepository(ProductEntity)
  private repository!: Repository<ProductEntity>

  async all(): Promise<Array<ProductEntity>> {
    return this.repository.find()
  }

  async add({ name, description }: ProductInput): Promise<ProductEntity> {
    return this.repository.save({ name, description })
  }
}
