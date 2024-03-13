<script lang="ts" setup>
  import { reactive, watch, onMounted, nextTick } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { onBeforeMount } from 'vue'

  enum MobileHeaderEvents {
    Open = 'open',
    Close = 'close'
  }
  const emit = defineEmits<{
    (e: MobileHeaderEvents.Open): void
    (e: MobileHeaderEvents.Close): void
  }>()

  const { router } = useEnhancer()
  const searchState = reactive({
    open: false,
    focused: false,
    keyword: ''
  })

  const cancelSearch = () => {
    searchState.open = false
  }

  onBeforeMount(() => {
    watch(
      () => router.currentRoute.value,
      () => {
        nextTick(() => {
          cancelSearch()
          emit(MobileHeaderEvents.Close)
        })
      }
    )
  })

  onMounted(() => {})
</script>

<template>
  <header class="header">
    <nav class="navbar">
      <button class="navbar-menu">
        <i class="iconfont icon-menu"></i>
      </button>
      <router-link to="/" class="navbar-logo">
        <uimage class="image" cdn src="/images/logo.svg" />
      </router-link>
      <button class="navbar-search">
        <i class="iconfont icon-search"></i>
      </button>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $mobile-header-height;
    background-color: $module-bg;
    z-index: $z-index-header;
    @include backdrop-blur(5px);

    .navbar {
      width: 100%;
      height: $mobile-header-height;
      display: flex;
      position: relative;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $module-bg-darker-2;

      .navbar-menu,
      .navbar-search {
        height: 100%;
        width: 20%;
        line-height: $mobile-header-height;
        text-align: center;
      }

      .navbar-logo {
        width: 30%;

        .image {
          filter: $theme-logo-rotate;
        }
      }
    }

    .search {
      position: fixed;
      z-index: $z-index-normal + 1;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;

      .search-bar {
        width: 100%;
        height: $mobile-header-height;
        display: flex;
        background-color: $text-reversal;
        border-bottom: 1px solid $module-bg-darker-2;

        > .input {
          width: 80%;
          height: 100%;
          padding: 1em;
        }

        > .close {
          width: 20%;
          height: 100%;
          line-height: $mobile-header-height;
          text-align: center;
        }
      }

      .search-tags {
        flex: 1;
        padding: $lg-gap;
        touch-action: none;
        background-color: $module-bg-translucent;
        @include backdrop-blur(5px);

        .tag-list {
          padding: 0;
          overflow: hidden;
          list-style: none;
          &.input-focused {
            .item {
              margin-bottom: $gap;
            }
          }

          .item {
            display: inline-block;
            padding: 0 $sm-gap;
            margin-right: $lg-gap;
            margin-bottom: $lg-gap;
            line-height: 2em;
            font-size: $font-size-h6;
            font-family: $font-family-normal;
            background-color: $module-bg-darker-1;
            transition: margin-bottom $transition-time-fast;
            @include radius-box($xs-radius);

            .iconfont {
              font-size: $font-size-small;
            }

            .name {
              margin-left: $xs-gap;
            }

            .count {
              margin-left: $xs-gap;
              font-size: $font-size-small;
              color: $text-secondary;
            }

            &.link-active {
              color: $text-reversal;
              background-color: $primary;

              .name {
                font-weight: bold;
              }
              .count {
                color: $text-reversal;
              }
            }
          }
        }
      }
    }
  }
</style>
