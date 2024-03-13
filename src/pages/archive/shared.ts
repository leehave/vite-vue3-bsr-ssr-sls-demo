import { Language, LanguageKey } from '/@/language'

import { META } from '/@/config/app.config'
import { computed } from 'vue'
import { firstUpperCase } from '/@/transforms/text'
import { useEnhancer } from '/@/app/enhancer'

export const i18ns = {
  title: {
    [Language.Chinese]: '万物之中，希望至美',
    [Language.English]: 'Hope is a good thing'
  },
  description: {
    [Language.Chinese]: '至美之物，永不凋零',
    [Language.English]: 'Maybe the best of things and no good thing ever dies'
  }
} as const

export const useArchivePageMeta = () => {
  const { i18n, seoMeta, isZhLang } = useEnhancer()
  seoMeta(() => {
    const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_ARCHIVE, Language.English)!)
    const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_ARCHIVE), enTitle] : [enTitle]
    return {
      pageTitle: titles.join(' | '),
      description: `${META.title} ${isZhLang.value ? '数据归档' : 'archives'}`
    }
  })
}

export const useArchivePageStatistics = () => {
  const { i18n } = useEnhancer()
  const statistics = computed(() => ({
    tags: {
      icon: 'icon-quill',
      title: i18n.t(LanguageKey.STATISTIC_TAGS)!,
      content: 0
    },
    articles: {
      icon: 'icon-quill',
      title: i18n.t(LanguageKey.STATISTIC_ARTICLES)!,
      content: 0
    },
    comments: {
      icon: 'icon-comment',
      title: i18n.t(LanguageKey.STATISTIC_COMMENTS)!,
      content: 0
    },
    todayViews: {
      icon: 'icon-eye',
      title: i18n.t(LanguageKey.STATISTIC_TODAY_VIEWS)!,
      content: 0
    },
    totalViews: {
      icon: 'icon-eye',
      title: i18n.t(LanguageKey.STATISTIC_TOTAL_VIEWS)!,
      content: 0
    },
    totalLikes: {
      icon: 'icon-like',
      title: i18n.t(LanguageKey.STATISTIC_TOTAL_UPVOTES)!,
      content: 0
    },
    averageEmotion: {
      icon: 'icon-emoji',
      title: i18n.t(LanguageKey.STATISTIC_AVERAGE_EMOTION)!,
      content: '-'
    }
  }))

  return {
    statistics,
    fetch: () => { }
  }
}
