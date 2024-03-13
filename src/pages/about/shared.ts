import { Language, LanguageKey } from '/@/language'

import { META } from '/@/config/app.config'
import { firstUpperCase } from '/@/transforms/text'
import { getAssetURL } from '/@/transforms/url'
import { useCDNDomain } from '/@/app/context'
import { useEnhancer } from '/@/app/enhancer'
import { useStores } from '/@/stores'

export const useAdminAvatar = (avatar?: string) => {
  return avatar || getAssetURL(useCDNDomain(), '/images/anonymous.png')
}

export interface AboutI18nConfig {
  [Language.Chinese]: string
  [Language.English]: string
}

export const i18ns = {
  footprint: {
    [Language.Chinese]: 'vite-vue3-bsr-ssr-sls-demo',
    [Language.English]: 'vite-vue3-bsr-ssr-sls-demo'
  },
  archive: {
    [Language.Chinese]: '笔文存档',
    [Language.English]: 'Archive'
  }
}

export const useAboutPageMeta = () => {
  const { i18n, seoMeta, isZhLang } = useEnhancer()
  const { adminInfo } = useStores()

  return seoMeta(() => {
    const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_ABOUT, Language.English)!)
    const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_ABOUT), enTitle] : [enTitle]
    const description = `${isZhLang.value ? '关于' : 'About'} ${META.author}`
    return {
      pageTitle: titles.join(' | '),
      description,
      ogType: 'profile',
      ogImage: adminInfo.data?.avatar
    }
  })
}

export const SPECIAL_LINKS = Object.freeze([
  {
    name: 'GitHub',
    url: 'https://github.com'
  },
  {
    name: `Vite`,
    url: 'https://vitejs.dev/'
  }
])
