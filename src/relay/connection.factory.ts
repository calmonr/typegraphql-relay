import {
  ConnectionArguments,
  getOffsetWithDefault,
  offsetToCursor
} from 'graphql-relay'
import { Repository } from 'typeorm'

import { Connection } from './connection.interface'

export async function connectionFromRepository<T>(
  args: ConnectionArguments,
  repository: Repository<T>
): Promise<Connection<T>> {
  const { before, after, first, last } = args

  const totalCount = await repository.count()

  // offsets
  const beforeOffset = getOffsetWithDefault(before, totalCount)
  const afterOffset = getOffsetWithDefault(after, -1)

  let startOffset = Math.max(-1, afterOffset) + 1
  let endOffset = Math.min(beforeOffset, totalCount)

  if (first) {
    endOffset = Math.min(endOffset, startOffset + first)
  }

  if (last) {
    startOffset = Math.max(startOffset, endOffset - last)
  }

  // skip, take
  const skip = Math.max(startOffset, 0) // sql offset
  const take = Math.max(endOffset - startOffset, 1) // sql limit

  // records
  const entities = await repository.find({ skip, take })

  const edges = entities.map((entity, index) => ({
    cursor: offsetToCursor(startOffset + index),
    node: entity
  }))

  // page info
  const { length, 0: firstEdge, [length - 1]: lastEdge } = edges
  const lowerBound = after ? afterOffset + 1 : 0
  const upperBound = before ? Math.min(beforeOffset, totalCount) : totalCount

  const pageInfo = {
    startCursor: firstEdge ? firstEdge.cursor : null,
    endCursor: lastEdge ? lastEdge.cursor : null,
    hasPreviousPage: last ? startOffset > lowerBound : false,
    hasNextPage: first ? endOffset < upperBound : false
  }

  return {
    edges,
    pageInfo,
    totalCount
  }
}
