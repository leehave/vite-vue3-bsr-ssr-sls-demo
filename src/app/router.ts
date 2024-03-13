// https://router.vuejs.org/guide/advanced/meta.html#typescript
import 'vue-router'

import { BAD_REQUEST, NOT_FOUND } from '/@/constants/http-code'
import { NavigationGuard, NavigationGuardNext, RouteRecordRaw, RouterHistory, createRouter } from 'vue-router'

import ArticleDetailPage from '/@/pages/article/index.vue'
import DesktopAboutPage from '/@/pages/about/desktop.vue'
// core pages
import DesktopArchivePage from '/@/pages/archive/desktop.vue'
// desktop flow
import IndexFlowPage from '/@/pages/index/index.vue'
import { LanguageKey } from '/@/language'
import { LayoutColumn } from './state'
import MobileAboutPage from '/@/pages/about/mobile.vue'
import MobileArchivePage from '/@/pages/archive/mobile.vue'
// mobile flow
import MobileFlow from '/@/components/flow/mobile/index.vue'
// third pages
import { scrollToPageTop } from '/@/utils/scroller'

declare module 'vue-router' {
  interface RouteMeta {
    responsive?: boolean
    layout?: LayoutColumn
    validator?: (params: any) => Promise<any>
    ssrCacheTTL: number | false
  }
}

export enum CategorySlug {
  Code = 'code',
  Insight = 'insight'
}

export enum RouteName {
  Home = 'home',
  Article = 'article-detail',
  Archive = 'archive',
  About = 'about',
  Error = 'error'
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    components: {
      default: IndexFlowPage,
      mobile: MobileFlow
    },
    meta: {
      responsive: true,
      ssrCacheTTL: 60 * 2 // 2 mins
    }
  },
  {
    path: '/article/:article_id',
    name: RouteName.Article,
    components: {
      default: ArticleDetailPage,
      mobile: ArticleDetailPage
    },
    props: {
      default: (to) => ({ articleId: Number(to.params.article_id) }),
      mobile: (to) => ({
        isMobile: true,
        articleId: Number(to.params.article_id)
      })
    },
    meta: {
      responsive: true,
      ssrCacheTTL: 30, // 30 seconds
      async validator({ route, i18n }) {
        if (!Number.isInteger(Number(route.params.article_id))) {
          return Promise.reject({
            code: BAD_REQUEST,
            message: i18n.t(LanguageKey.QUERY_PARAMS_ERROR) + 'Article ID → <number>'
          })
        }
      }
    }
  },
  {
    path: '/archive',
    name: RouteName.Archive,
    components: {
      default: DesktopArchivePage,
      mobile: MobileArchivePage
    },
    meta: {
      responsive: true,
      layout: LayoutColumn.Full,
      ssrCacheTTL: 60 * 60 // 1 hours
    }
  },
  {
    path: '/about',
    name: RouteName.About,
    components: {
      default: DesktopAboutPage,
      mobile: MobileAboutPage
    },
    meta: {
      responsive: true,
      layout: LayoutColumn.Full,
      ssrCacheTTL: 60 * 60 * 4 // 4 hours
    }
  },
  {
    name: RouteName.Error,
    path: '/:error(.*)',
    component: {},
    meta: {
      ssrCacheTTL: false,
      async validator({ i18n }) {
        return Promise.reject({
          code: NOT_FOUND,
          message: i18n.t(LanguageKey.NOT_FOUND)
        })
      }
    }
  }
]

export interface RouterCreatorOptions {
  history: RouterHistory
  beforeMiddleware?: NavigationGuard | NavigationGuard[]
  afterMiddleware?: NavigationGuardNext | NavigationGuardNext[]
}
export const createUniversalRouter = (options: RouterCreatorOptions) => {
  const router = createRouter({
    routes,
    strict: true,
    history: options.history,
    linkActiveClass: 'link-active',
    scrollBehavior: () => scrollToPageTop()
  })

  if (options.beforeMiddleware) {
    Array.isArray(options.beforeMiddleware)
      ? options.beforeMiddleware.forEach(router.beforeResolve)
      : router.beforeResolve(options.beforeMiddleware)
  }
  if (options.afterMiddleware) {
    Array.isArray(options.afterMiddleware)
      ? options.afterMiddleware.forEach(router.afterEach)
      : router.afterEach(options.afterMiddleware)
  }

  return router
}
