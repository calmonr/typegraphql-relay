import { Connection as RelayConnection } from 'graphql-relay'

export interface Connection<T> extends RelayConnection<T> {
  readonly totalCount: number
}
