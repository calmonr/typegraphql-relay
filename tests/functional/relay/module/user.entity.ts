import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
@ObjectType('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  @Field()
  name!: string
}
