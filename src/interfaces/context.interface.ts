import { Connection, Repository } from 'typeorm'

import { Node } from '../relay/node.interface'

export interface Context {
  database: Connection
  repositories: Record<string, Repository<Node>>
}
