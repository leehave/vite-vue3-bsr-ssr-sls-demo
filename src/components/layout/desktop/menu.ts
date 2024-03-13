import { CategorySlug, RouteName } from '/@/app/router'
import { getCategoryFlowRoute, getPageRoute } from '/@/transforms/route'

import { LanguageKey } from '/@/language'
import { VALUABLE_LINKS } from '/@/config/app.config'

export interface MenuItem {
  id: string
  route?: string
  url?: string
  i18nKey: LanguageKey
  icon?: string
  imageIcon?: string
  divider?: boolean
  newWindow?: boolean
  disabledUppercase?: boolean
  hot?: boolean
}

export const menus: Array<MenuItem> = [
  {
    id: RouteName.Home,
    route: '/',
    icon: 'icon-home',
    i18nKey: LanguageKey.PAGE_HOME
  },
  {
    id: CategorySlug.Code,
    route: getCategoryFlowRoute(CategorySlug.Code),
    icon: 'icon-code',
    i18nKey: LanguageKey.CATEGORY_CODE
  },
  {
    id: 'github',
    url: VALUABLE_LINKS.GITHUB,
    icon: 'icon-github',
    i18nKey: LanguageKey.PAGE_GITHUB,
    newWindow: true
  },
  {
    id: RouteName.About,
    route: getPageRoute(RouteName.About),
    icon: 'icon-swordsman',
    i18nKey: LanguageKey.PAGE_ABOUT
  }
]
