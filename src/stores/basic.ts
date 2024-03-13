import { AdminInfo, AppAdConfig, AppOption } from '/@/interfaces/option'

import { UNDEFINED } from '/@/constants/value'
import { computed } from 'vue'
import { createFetchStore } from './_fetch'
import { defineStore } from 'pinia'
import nodepress from '/@/services/nodepress'

export const useAdminInfoStore = defineStore('adminInfo', () => {
  return createFetchStore<AdminInfo | null>({
    data: null,
    async fetcher() {
      const response = await nodepress.get<AdminInfo>('/auth/admin')
      return response.result
    }
  })
})

export const useAppOptionStore = defineStore('appOption', () => {
  const fetchStore = createFetchStore<AppOption | null>({
    shallow: false,
    data: null,
    async fetcher() {
      const response = await nodepress.get<AppOption>('/option')
      return response.result
    }
  })

  const adConfig = computed<AppAdConfig>(() => {
    const adConfig = fetchStore.data.value?.ad_config
    return {
      PC_CARROUSEL: UNDEFINED,
      PC_NAV: [],
      PC_ASIDE_SWIPER: [],
      ...(adConfig ? JSON.parse(adConfig) : {})
    }
  })

  return {
    ...fetchStore,
    adConfig
  }
})
