import type { Archive } from '@/interfaces/archive'
import { META } from '@/config/app.config'
import type { NodePressResult } from '@/services/nodepress'
import RSS from 'rss'
import axios from '@/server/services/axios'
import { getArticleURL } from '../route'
import { getNodePressAPI } from '../config'

export const getRssXml = async () => {
  const api = `${getNodePressAPI()}/archive`
  const response = await axios.get<NodePressResult<Archive>>(api, { timeout: 6000 })
  const archive = response.data.result
  const feed = new RSS({
    title: META.title,
    description: META.zh_sub_title,
    site_url: META.url,
    feed_url: `${META.url}/rss.xml`,
    image_url: `${META.url}/icon.png`,
    managingEditor: META.author,
    webMaster: META.author,
    generator: `${META.domain}`,
    categories: archive.categories.map((category) => category.slug),
    copyright: `${new Date().getFullYear()} ${META.title}`,
    language: 'zh',
    ttl: 60
  })

  archive.articles.forEach((article) => {
    return feed.item({
      title: article.title,
      description: article.description,
      url: getArticleURL(article.id),
      guid: String(article.id),
      categories: article.categories.map((category) => category.slug),
      author: META.author,
      date: article.create_at,
      enclosure: {
        url: article.thumb
      }
    })
  })

  return feed.xml({ indent: true })
}
