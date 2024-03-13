import { UniversalKeyValue } from './common'

export interface Category {
  _id: string
  id: number
  pid: string
  name: string
  slug: string
  description: string
  update_at: string
  create_at: string
  extends: UniversalKeyValue[]
  article_count: number
}
