import { ComputedGetter, computed } from 'vue'
import { Head, useHead as useUnhead, useSeoMeta as useUnheadSeoMeta } from '@unhead/vue'

import { META } from '/@/config/app.config'
import { UseSeoMetaInput } from '@unhead/schema'
import { getPageURL } from '/@/transforms/url'
import { useEnhancer } from '/@/app/enhancer'

export type { Head } from '@unhead/vue'
export { createHead } from '@unhead/vue'

export const useHead = (source: Head | ComputedGetter<Head>) => {
  return useUnhead(
    computed<Head>(() => {
      return typeof source === 'function' ? source() : source
    })
  )
}

const DEFAULT_TITLER = (title: string) => `${title} | ${META.title}`
const DEFAULT_OG_IMAGE = getPageURL('/images/og-social-card.jpg')

export interface SeoMetaObject extends Omit<UseSeoMetaInput, 'title'> {
  title?: string
  pageTitle?: string
  description?: string
  keywords?: string
}

export function useSeoMeta(source: SeoMetaObject | ComputedGetter<SeoMetaObject>) {
  const { i18n, route } = useEnhancer()
  const input = computed(() => {
    const value = typeof source === 'function' ? source() : source
    const { title, pageTitle, description, keywords, ...rest } = value
    // title | page title
    const pureTitle = title ?? pageTitle
    const fullTitle = title ? title : pageTitle ? DEFAULT_TITLER(pageTitle) : ''
    return { pureTitle, fullTitle, description, keywords, _: rest }
  })

  return useUnheadSeoMeta({
    title: computed(() => input.value.fullTitle),
    description: () => input.value.description ?? '',
    keywords: () => input.value.keywords ?? '',
    ogSiteName: () => META.title,
    ogType: () => input.value._.ogType ?? ('object' as any),
    ogTitle: () => input.value._.ogTitle ?? input.value.pureTitle ?? '',
    ogDescription: () => input.value._.ogDescription ?? input.value.description ?? '',
    ogUrl: () => input.value._.ogUrl ?? getPageURL(route.fullPath),
    ogImage: () => input.value._.ogImage ?? DEFAULT_OG_IMAGE,
    ogImageAlt: () => input.value._.ogImageAlt ?? input.value._.ogTitle ?? input.value.fullTitle ?? '',
    ogImageWidth: () => input.value._.ogImageWidth ?? (input.value._.ogImage ? '' : '1000'),
    ogImageHeight: () => input.value._.ogImageHeight ?? (input.value._.ogImage ? '' : '526'),
    ogLocale: () => i18n.l.value?.iso ?? ''
  })
}
