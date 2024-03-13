<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import { useAdminInfoStore } from '/@/stores/basic'
  import { useUniversalFetch } from '/@/universal'
  import { useAboutPageMeta, useAdminAvatar } from './shared'

  const { isZhLang } = useEnhancer()
  const adminInfo = useAdminInfoStore()

  useAboutPageMeta()
  useUniversalFetch(() => adminInfo.fetch())
</script>

<template>
  <div class="about-page">
    <div class="profile">
      <div class="avatar">
        <uimage class="image" :src="useAdminAvatar(adminInfo.data?.avatar)" />
      </div>
      <h2 class="name">{{ adminInfo.data?.name || '-' }}</h2>
      <h5 class="slogan">{{ adminInfo.data?.slogan || '-' }}</h5>
      <h4 class="description">
        <webfont bolder>{{ isZhLang ? META.zh_description : META.en_description }}</webfont>
      </h4>
    </div>

    <div class="links">
      <div class="list col-3">
        <ulink class="item center github" :href="VALUABLE_LINKS.GITHUB">
          <i class="iconfont icon-github" />
          <span class="text">GitHub</span>
        </ulink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .about-page {
    .profile {
      position: relative;
      padding: $lg-gap;
      padding-top: $gap * 5;
      border-bottom-left-radius: $lg-radius;
      border-bottom-right-radius: $lg-radius;
      background-color: $module-bg-opaque;
      &::before {
        content: '';
        position: absolute;
        display: block;
        height: 1rem;
        bottom: -0.5rem;
        left: 0;
        right: 0;
        background-image: radial-gradient(circle, transparent 70%, $module-bg-opaque 70%);
        background-size: 0.7em 1em;
        background-position: 0 -0.5em;
      }

      .avatar {
        width: 100%;
        position: absolute;
        top: -$gap * 4;
        left: 0;
        text-align: center;

        .image {
          $size: 7rem;
          width: $size;
          height: $size;
          z-index: $z-index-normal + 2;
          border-radius: 100%;
          border: 6px solid $module-bg-opaque;
          box-sizing: content-box;
        }
      }

      .name,
      .slogan {
        text-align: center;
        margin-top: 0;
        margin-bottom: $xs-gap;
      }

      .slogan {
        line-height: $line-height-base * 1.2;
      }

      .description {
        margin: 0;
        line-height: $line-height-base * 1.3;
        text-align: center;
      }

      .biography {
        text-indent: 2em;
        line-height: $line-height-base * 1.4;
        margin-bottom: 0;

        ::v-deep(a) {
          font-weight: bold;
          text-decoration: underline;
          text-underline-offset: 0.2em;
        }
      }
    }

    .links {
      margin-top: $lg-gap;
      padding: $gap;
      border-radius: $lg-radius;
      background-color: $module-bg-opaque;
      overflow: hidden;

      .list {
        display: grid;
        grid-gap: $lg-gap;
        &.col-2 {
          grid-template-columns: repeat(2, 1fr);
        }
        &.col-3 {
          grid-template-columns: repeat(3, 1fr);
        }
        &.col-4 {
          grid-template-columns: repeat(4, 1fr);
        }

        .image-item {
          max-width: 100%;
        }

        .item {
          display: inline-flex;
          align-items: center;
          height: 3rem;
          padding: 0 1em;
          border-radius: $sm-radius;
          color: $white;
          overflow: hidden;
          &.center {
            justify-content: center;
          }
          &.text-only {
            background-color: $primary;
          }
          &.icon-only {
            justify-content: center;
            .iconfont {
              font-size: $font-size-h3;
              margin: 0;
            }
          }

          .iconfont {
            margin-right: $sm-gap;
          }

          .text {
            font-weight: bold;
          }

          &.github {
            background-color: $github-primary;
          }
          &.twitter {
            background-color: $twitter-primary;
          }
          &.instagram {
            background: $instagram-primary;
            background: $instagram-gradient;
            @include visibility-transition();
          }
          &.discord {
            background-color: $discord-primary;
          }
          &.telegram {
            background-color: $telegram-primary;
          }
          &.douban {
            background-color: $douban-primary;
          }
          &.youtube {
            background-color: $youtube-primary;
          }
          &.linkedin {
            background-color: $linkedin-primary;
          }
        }
      }
    }

    .qrcodes {
      margin-top: $lg-gap;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: $lg-gap;

      .item {
        width: 100%;
        padding: $gap;
        border-radius: $lg-radius;
        overflow: hidden;
        background-color: $module-bg-opaque;

        .image {
          width: 100%;
          height: 100%;
          border-radius: $xs-radius;
        }
      }
    }
  }
</style>
