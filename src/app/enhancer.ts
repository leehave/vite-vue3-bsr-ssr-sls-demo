import { Defer, useDefer } from '/@/composables/defer'
import { Theme, useTheme } from '/@/composables/theme'
import { useHead, useSeoMeta } from '/@/composables/head'
import { useRoute, useRouter } from 'vue-router'

import { Language } from '/@/language'
import type { Popup } from '/@/composables/popup'
import { UNDEFINED } from '/@/constants/value'
import { computed } from 'vue'
import { isClient } from './environment'
import { useAppOptionStore } from '/@/stores/basic'
import { useCDNDomain } from '/@/app/context'
import { useGlobalState } from '/@/app/state'
import { useI18n } from '/@/composables/i18n'
import { usePopup } from '/@/composables/popup/hook'

export const useEnhancer = () => {
  const route = useRoute()
  const router = useRouter()
  const i18n = useI18n()
  const theme = useTheme()
  const globalState = useGlobalState()
  const appOptionStore = useAppOptionStore()

  const adConfig = computed(() => appOptionStore.adConfig)
  const isMobile = computed(() => globalState.userAgent.isMobile)
  const isDarkTheme = computed(() => theme.theme.value === Theme.Dark)
  const isZhLang = computed(() => i18n.language.value === Language.Chinese)

  return {
    route,
    router,
    i18n,
    theme,
    head: useHead,
    seoMeta: useSeoMeta,
    gState: globalState,
    cdnDomain: useCDNDomain(),

    adConfig,
    isMobile,
    isDarkTheme,
    isZhLang,

    defer: (isClient ? useDefer() : UNDEFINED) as Defer,
    popup: (isClient ? usePopup() : UNDEFINED) as Popup
  }
}
