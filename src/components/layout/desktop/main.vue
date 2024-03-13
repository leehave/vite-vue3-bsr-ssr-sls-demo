<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { MAIN_ELEMENT_ID, MAIN_CONTENT_ELEMENT_ID } from '/@/constants/anchor'
  import { useEnhancer } from '/@/app/enhancer'
  import { getLayoutByRouteMeta } from '/@/transforms/layout'
  import Wallflower from '/@/components/widget/wallflower/garden.vue'
  import Background from '/@/components/widget/background.vue'
  import FooterView from './footer.vue'

  const { route, gState } = useEnhancer()
  const { layoutColumn } = gState
  const handlePageTransitionDone = () => {
    gState.setLayoutColumn(getLayoutByRouteMeta(route.meta))
  }

  onMounted(() => {})
</script>

<template>
  <div class="desktop-main">
    <background />
    <wallflower />
    <!-- <header-view /> -->
    <main :id="MAIN_ELEMENT_ID" class="main-container" :class="{ 'full-page': layoutColumn.isFull }">
      <!-- MARK: keep order > long content > flicker -->
      <div
        :id="MAIN_CONTENT_ELEMENT_ID"
        class="main-view"
        :class="{
          'layout-normal': layoutColumn.isNormal,
          'layout-wide': layoutColumn.isWide,
          'layout-full': layoutColumn.isFull
        }"
      >
        <!-- unuse suspense -> async route component -> can't extract style to css file -->
        <router-view v-slot="{ Component, route: r }">
          <div class="router-view" v-disabled-wallflower>
            <transition name="page" mode="out-in" @before-enter="handlePageTransitionDone">
              <suspense>
                <component :is="Component" :key="r.name" />
              </suspense>
            </transition>
          </div>
        </router-view>
      </div>
    </main>
    <footer-view class="footer-view" />
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .sponsor-modal {
    width: 50rem;
    height: 28rem;
    display: flex;
    flex-direction: column;
    background-color: $module-bg-lighter !important;

    .sponsor {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      .tabs {
        background-color: $module-bg-lighter;
        border-bottom: 1px solid $module-bg-darker-1;
      }

      .provider {
        flex: 1;
      }
    }
  }

  .desktop-main {
    padding-top: $header-height + $lg-gap;
    height: 100%;
    @media screen and (max-width: 1200px) {
      #theme,
      #language,
      .main-share {
        display: none !important;
      }
    }

    .main-share {
      position: fixed;
      top: 12%;
      left: 0;
      height: auto;
      max-width: 4rem;
      display: flex;
      flex-direction: column;
      opacity: 0.4;

      &:hover {
        opacity: 1;
      }

      ::v-deep(.share-ejector) {
        $height: 2.1em;
        width: 3rem;
        height: $height;
        line-height: $height;
        font-size: $font-size-h4;
        border-top-right-radius: $xs-radius;
        border-bottom-right-radius: $xs-radius;
        transition: width $transition-time-fast;
        &:hover {
          width: 120%;
        }
      }
    }

    .main-container {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: $container-width;
      min-height: 100%;
      &.full-page {
        width: 100%;
      }

      .nav-view {
        order: 1;
        flex-shrink: 0;
        margin-right: $lg-gap;
      }

      .aside-view {
        order: 3;
        flex-shrink: 0;
        margin-left: $lg-gap;
      }

      .main-view {
        order: 2;
        flex-grow: 1;
        position: relative;
        overflow: hidden;
        transition: none;

        &:-moz-full-screen {
          overflow-y: auto;
        }

        &:-webkit-full-screen {
          overflow-y: auto;
        }

        &:fullscreen {
          overflow-y: auto;
        }

        &.layout-normal {
          /* flex-grow: 1; */
        }

        &.layout-wide {
          flex-grow: unset;
          width: 100%;
          margin: 0;
        }

        &.layout-full {
          flex-grow: unset;
          width: 100%;
          margin: -$lg-gap 0;
        }
      }
    }

    .footer-view {
      margin-top: $lg-gap;
    }
  }
</style>
