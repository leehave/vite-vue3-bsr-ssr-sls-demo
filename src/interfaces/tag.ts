import { UniversalKeyValue } from './common'

export interface Tag {
  _id: string
  id: number
  name: string
  slug: string
  description: string
  update_at: string
  create_at: string
  extends: UniversalKeyValue[]
  article_count: number
}
