import { NODE_ENV, isNodeDev } from '@/server/environment'
import { BFF_TUNNEL_PREFIX as TUN, getBFFServerPort } from '@/config/bff.config'
import { WebFontContentType, getWebFont } from './server/getters/webfont'
import cacher, { days, hours, minutes } from './server/helpers/cacher'
import { errorer, responser } from './server/helpers/responser'

import { BAD_REQUEST } from '@/constants/http-code'
import { META } from '@/config/app.config'
import { TunnelModule } from '@/constants/tunnel'
import { createExpressApp } from './server'
import { createLogger } from '@/utils/logger'
import dotenv from 'dotenv'
import { enableDevRenderer } from './server/renderer/dev'
import { enableProdRenderer } from './server/renderer/prod'
import { getAllWallpapers } from './server/getters/wallpaper'
import { getRssXml } from './server/getters/rss'
import { getSitemapXml } from './server/getters/sitemap'
import { getSongList } from './server/getters/netease-music'

export const logger = createLogger('BFF')

// init env variables for BFF server env
dotenv.config()

// create http server app
createExpressApp().then(async ({ app, server, cache }) => {
  // sitemap.xml
  app.get('/sitemap.xml', async (_, response) => {
    try {
      response.header('Content-Type', 'application/xml')
      response.send(await getSitemapXml())
    } catch (error) {
      errorer(response, { message: error })
    }
  })

  // rss.xml
  app.get('/rss.xml', async (_, response) => {
    try {
      response.header('Content-Type', 'application/xml')
      response.send(await getRssXml())
    } catch (error) {
      errorer(response, { message: error })
    }
  })
  // Bing wallpapers
  const getWallpaperCache = cacher.interval(cache, {
    key: TunnelModule.BingWallpaper,
    ttl: days(1),
    interval: hours(6),
    retry: minutes(30),
    getter: getAllWallpapers
  })

  app.get(
    `${TUN}/${TunnelModule.BingWallpaper}`,
    responser(() => getWallpaperCache())
  )

  // 163 music BGM list
  const get163MusicCache = cacher.interval(cache, {
    key: TunnelModule.NetEaseMusic,
    ttl: days(2),
    interval: hours(12),
    retry: minutes(10),
    getter: getSongList
  })

  app.get(
    `${TUN}/${TunnelModule.NetEaseMusic}`,
    responser(() => get163MusicCache())
  )
  // WebFont
  app.get(`${TUN}/${TunnelModule.WebFont}`, async (request, response) => {
    const fontname = decodeURIComponent(String(request.query.fontname)).trim()
    const text = decodeURIComponent(String(request.query.text)).trim()
    if (!text || !fontname) {
      errorer(response, { code: BAD_REQUEST, message: 'Invalid params' })
      return
    }

    try {
      const data = await getWebFont({ fontname, text })
      // never expired
      response.header('Cache-Control', 'public, max-age=31536000')
      response.header('Content-Type', WebFontContentType)
      response.send(data)
    } catch (error) {
      errorer(response, { message: error })
    }
  })

  // vue renderer
  await (isNodeDev ? enableDevRenderer(app, cache) : enableProdRenderer(app, cache))

  // run
  server.listen(getBFFServerPort(), () => {
    const address = server.address()
    const port = typeof address === 'string' ? address : address?.port ?? getBFFServerPort()
    logger.success(
      `${META.title} app is running!`,
      `| env: ${NODE_ENV}`,
      `| port: ${port}`,
      `| ${new Date().toLocaleString()}`
    )
  })
})
