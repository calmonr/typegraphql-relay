import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { ProductEntity } from './product.entity'
import { AddProductInput } from './product.input'

@Service()
export class ProductService {
  @InjectRepository(ProductEntity)
  private readonly repository!: Repository<ProductEntity>

  async findById(id: string): Promise<ProductEntity | undefined> {
    return this.repository.findOne(id)
  }

  async add({ name, description }: AddProductInput): Promise<ProductEntity> {
    return this.repository.save({ name, description })
  }
}
