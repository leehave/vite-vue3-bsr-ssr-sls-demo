import { CategorySlug, RouteName } from '/@/app/router'

type RouteRecordName = string | symbol | null | undefined

export const getTagFlowRoute = (tagSlug: string) => {
  return `/tag/${tagSlug}`
}

export const getCategoryFlowRoute = (categorySlug: string | CategorySlug) => {
  return `/category/${categorySlug}`
}

export const getDateFlowRoute = (date: string) => {
  return `/date/${date}`
}

export const getArticleDetailRoute = (articleId: string | number) => {
  return `/article/${articleId}`
}

export const getPageRoute = (routeName: RouteName) => {
  return `/${routeName}`
}

export const isArticleDetail = (name: RouteRecordName) => name === RouteName.Article
