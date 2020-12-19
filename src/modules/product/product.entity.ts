import { Field, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { Node } from '../../relay/node.interface'

@Entity('products')
@ObjectType({ implements: Node })
export class Product extends Node {
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
