import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { NodeInterface } from '../relay/node.interface'

@Entity('products')
@ObjectType('Product', { implements: NodeInterface })
export class ProductEntity extends NodeInterface {
  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  @Field()
  name!: string

  @Column('text')
  @Field()
  description!: string

  @CreateDateColumn()
  @Field()
  createdAt!: Date

  @UpdateDateColumn()
  @Field()
  updatedAt!: Date
}
