<script lang="ts" setup>
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch, onClient } from '/@/universal'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import { LanguageKey } from '/@/language'
  import { META } from '/@/config/app.config'
  import ArticleList from '/@/components/flow/desktop/list.vue'

  const { seoMeta, i18n: _i18n, isZhLang } = useEnhancer()
  const { appOption, articleList: articleListStore } = useStores()

  seoMeta(() => ({
    title: `${META.title} - ${_i18n.t(LanguageKey.APP_SLOGAN)!.replaceAll('，', ' ')}`,
    description: isZhLang.value ? META.zh_description : META.en_description,
    keywords: appOption.data?.keywords.join(',')
  }))

  const loadmoreArticles = async () => {
    const targetPage = articleListStore.pagination!.current_page + 1
    await articleListStore.fetch({ page: targetPage })
    if (targetPage > 1) {
      onClient(scrollToNextScreen)
    }
  }

  useUniversalFetch(() => {
    return Promise.all([articleListStore.fetch()])
  })
</script>

<template>
  <div class="index-page">
    <article-list
      :mammon="false"
      :fetching="articleListStore.fetching"
      :articles="articleListStore.data"
      :pagination="articleListStore.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .index-page {
    .carrousel,
    .twitter {
      margin-bottom: $lg-gap;
    }
  }
</style>
