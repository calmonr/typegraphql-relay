import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { Node } from '../../../../src/relay/node.interface'

@Entity('users')
@ObjectType({ implements: Node })
export class User extends Node {
  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  @Field()
  name!: string
}
