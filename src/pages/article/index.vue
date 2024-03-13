<script lang="ts" setup>
  import { watch, shallowRef, onBeforeMount, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { useStores } from '/@/stores'
  import * as ANCHORS from '/@/constants/anchor'
  import * as URL_HASHS from '/@/constants/anchor'
  import { CUSTOM_ELEMENTS } from '/@/effects/elements'
  import { scrollToAnchor } from '/@/utils/scroller'
  import ArticleSkeleton from './skeleton.vue'
  import ArticleContent from './content.vue'
  import ArticleNeighbour from './neighbour.vue'

  const props = defineProps<{
    articleId: number
    isMobile?: boolean
  }>()

  const { head, seoMeta, route } = useEnhancer()
  const { articleDetail: articleDetailStore } = useStores()
  const { article, fetching, prevArticle, nextArticle } = storeToRefs(articleDetailStore)

  const fetchArticleDetail = (articleId: number) => {
    const articleRequest = articleDetailStore.fetchCompleteArticle(articleId)
    return Promise.all([articleRequest])
  }

  const customElementsStyle = shallowRef<string | null>(null)
  const handleContentRendered = (element: HTMLDivElement) => {
    CUSTOM_ELEMENTS.verse.effect?.(element)
    customElementsStyle.value = CUSTOM_ELEMENTS.verse.style?.(element) ?? null
  }

  head(() => ({
    style: customElementsStyle.value ? [{ children: customElementsStyle.value }] : []
  }))

  seoMeta(() => ({
    pageTitle: article.value?.title,
    description: article.value?.description || '',
    keywords: article.value?.keywords?.join(',') || article.value?.title,
    ogType: 'article',
    ogImage: article.value?.thumb,
    ogImageWidth: 1190,
    ogImageHeight: 420
  }))

  useUniversalFetch(() => {
    return fetchArticleDetail(props.articleId)
  })

  onBeforeMount(() => {
    watch(
      () => props.articleId,
      (articleId) => fetchArticleDetail(articleId),
      { flush: 'post' }
    )
  })

  onMounted(() => {
    const urlHash = route.hash.slice(1)
    if (!urlHash) return

    const articleHeadings = [
      ...(articleDetailStore.defaultContent?.headings ?? []),
      ...(articleDetailStore.moreContent?.headings ?? [])
    ]
    const elementID =
      urlHash === URL_HASHS.COMMENTS_URL_HASH
        ? ANCHORS.COMMENT_ELEMENT_ID
        : articleHeadings.find(({ anchor }) => anchor === urlHash)?.id

    if (elementID && document.getElementById(elementID)) {
      // Allow a certain amount of time to ensure that the browser is rendered.
      setTimeout(() => scrollToAnchor(elementID), 400)
    }
  })
</script>

<template>
  <div class="article-page">
    <placeholder :loading="fetching">
      <template #loading>
        <article-skeleton :social-count="isMobile ? 3 : 8" :related-count="isMobile ? 2 : 3" />
      </template>
      <template #default>
        <div v-if="article">
          <div class="module margin background overflow">
            <article-content
              :id="ANCHORS.ARTICLE_CONTENT_ELEMENT_ID"
              :readmore-id="ANCHORS.ARTICLE_READMORE_ELEMENT_ID"
              :article="article"
              @rendered="handleContentRendered"
            />
            <div class="divider"></div>
          </div>

          <div class="module margin overflow">
            <article-neighbour :prev="prevArticle" :next="nextArticle" />
          </div>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .article-page {
    .module {
      position: relative;

      &.margin {
        margin-bottom: $lg-gap;
      }

      &.background {
        border-radius: $sm-radius;
        @include common-bg-module();
      }

      &.overflow {
        overflow: hidden;
      }

      .divider {
        border-top: 2px dotted $module-bg-darker-1;
      }

      .bridge {
        $distance: 3rem;
        position: absolute;
        top: -$lg-gap;
        width: $lg-gap;
        height: $lg-gap;
        background: linear-gradient(to bottom, $module-bg, $module-bg-darker-1);
        &.left {
          left: $distance;
        }
        &.right {
          right: $distance;
        }
      }
    }

    .comment {
      .chat-gpt-link {
        margin-left: 1rem;
        width: 2em;
        border-radius: 2px;
        text-align: center;
        background-color: $module-bg-darker-1;
        &:hover {
          background-color: $chatgpt-primary;
          color: $white;
        }
      }
    }
  }
</style>
