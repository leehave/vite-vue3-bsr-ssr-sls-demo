<script lang="ts" setup>
  import { FOOTER_ELEMENT_ID } from '/@/constants/anchor'
</script>

<template>
  <container tag="footer" :id="FOOTER_ELEMENT_ID" v-disabled-wallflower class="footer">
    <i18n zh="vite-vue3-bsr-ssr-sls-demo" en="" />
  </container>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .footer {
    display: flex;
    align-items: center;
    height: $footer-height;
    text-align: center;
    text-transform: uppercase;
    font-size: $font-size-h6;
    color: $text-secondary;
    @include common-bg-module();

    a:hover {
      @include text-underline();
    }
  }
</style>
