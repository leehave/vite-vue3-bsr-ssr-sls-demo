import { useAdminInfoStore, useAppOptionStore } from './basic'
import {
  useArticleDetailStore,
  useArticleListStore,
  useFeaturedArticleListStore,
  useHottestArticleListStore,
  useLatestArticleListStore
} from './article'

import { Pinia } from 'pinia'
// import { useAnnouncementStore } from './announcement'
import { useArchiveStore } from './archive'
import { useWallpaperStore } from './wallpaper'

export const useStores = (pinia?: Pinia) => ({
  hottestArticleList: useHottestArticleListStore(pinia),
  featuredArticleList: useFeaturedArticleListStore(pinia),
  latestArticleList: useLatestArticleListStore(pinia),

  articleList: useArticleListStore(pinia),
  articleDetail: useArticleDetailStore(pinia),
  // announcement: useAnnouncementStore(pinia),
  archive: useArchiveStore(pinia),
  adminInfo: useAdminInfoStore(pinia),
  appOption: useAppOptionStore(pinia),
  wallpaper: useWallpaperStore(pinia)
})
