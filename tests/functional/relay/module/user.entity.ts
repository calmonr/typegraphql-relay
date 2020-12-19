import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  @Field()
  name!: string
}
