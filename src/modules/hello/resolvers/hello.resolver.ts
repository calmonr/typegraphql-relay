import { Resolver, Query } from 'type-graphql'

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'hello world'
  }
}
