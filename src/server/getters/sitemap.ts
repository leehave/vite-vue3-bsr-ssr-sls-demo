import { EnumChangefreq, SitemapItemLoose, SitemapStream, streamToPromise } from 'sitemap'
import { getArticleURL, getCategoryURL, getPageURL, getTagURL } from '../route'

import type { Archive } from '@/interfaces/archive'
import { META } from '@/config/app.config'
import type { NodePressResult } from '@/services/nodepress'
import { Readable } from 'stream'
import axios from '@/server/services/axios'
import { getNodePressAPI } from '../config'

export const getSitemapXml = async () => {
  const api = `${getNodePressAPI()}/archive`
  const response = await axios.get<NodePressResult<Archive>>(api, { timeout: 6000 })
  const archive = response.data.result
  const sitemapStream = new SitemapStream({
    hostname: META.url
  })

  const sitemapItemList: SitemapItemLoose[] = [
    { url: META.url, changefreq: EnumChangefreq.ALWAYS, priority: 1 },
    {
      url: getPageURL('about'),
      changefreq: EnumChangefreq.YEARLY,
      priority: 1
    },
    {
      url: getPageURL('archive'),
      changefreq: EnumChangefreq.ALWAYS,
      priority: 1
    }
  ]

  archive.categories.forEach((category) => {
    sitemapItemList.push({
      priority: 0.6,
      changefreq: EnumChangefreq.DAILY,
      url: getCategoryURL(category.slug)
    })
  })

  archive.tags.forEach((tag) => {
    sitemapItemList.push({
      priority: 0.6,
      changefreq: EnumChangefreq.DAILY,
      url: getTagURL(tag.slug)
    })
  })

  archive.articles.forEach((article) => {
    sitemapItemList.push({
      priority: 0.8,
      changefreq: EnumChangefreq.DAILY,
      url: getArticleURL(article.id),
      lastmodISO: new Date(article.update_at).toISOString()
    })
  })

  return streamToPromise(Readable.from(sitemapItemList).pipe(sitemapStream)).then((data) => {
    return data.toString()
  })
}
