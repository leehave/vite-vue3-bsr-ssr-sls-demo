// polyfills
import 'intersection-observer'
import './effects/swiper/style'
import './effects/elements/index.scss'
import './components/common/loading-indicator/index.scss'
import './styles/app.scss'

import { Language, LanguageKey } from '/@/language'
import { computed, watch } from 'vue'
import { getSSRContextData, getSSRContextValue, getSSRStateValue } from '/@/universal'
import { resetTitler, runTitler } from '/@/effects/titler'

import { META } from '/@/config/app.config'
import { consoleSlogan } from '/@/effects/slogan'
import { createDefer } from '/@/composables/defer'
import { createMainApp } from '/@/app/main'
import { createMusic } from '/@/composables/music'
import { createPopup } from '/@/composables/popup'
import { createWebHistory } from 'vue-router'
import { exportAppToGlobal } from '/@/effects/exporter'
import { exportEmojiRainToGlobal } from '/@/effects/emoji-23333'
import { exportStickyEventsToGlobal } from '/@/effects/sticky'
import { getLayoutByRouteMeta } from '/@/transforms/layout'
import { initCopyrighter } from '/@/effects/copyright'
import { isProd } from '/@/app/environment'
import lozad from '/@/composables/lozad'

console.group(`🔵 [SSR:CONTEXT]`)
console.table(getSSRContextData())
console.groupEnd()

// app
const { app, router, head, globalState, i18n, store, getGlobalHead } = createMainApp({
  historyCreator: createWebHistory,
  language: navigator.language,
  userAgent: navigator.userAgent,
  region: getSSRStateValue('region')!,
  layout: getSSRStateValue('layout')!,
  theme: getSSRStateValue('theme')!,
  error: getSSRContextValue('error')
})

// services
const defer = createDefer()
const popup = createPopup()
const music = createMusic({ delay: 668, continueNext: true })

// plugins & services
app.use(music)
app.use(lozad, { exportToGlobal: true })
app.use(defer, { exportToGlobal: true })
app.use(popup, { exportToGlobal: true })

// init: store (from SSR context or fetch)
store.hydrate()

// init: services with client
exportEmojiRainToGlobal()
exportStickyEventsToGlobal()
exportAppToGlobal(app)
initCopyrighter()

// init global head attributes: https://unhead.harlanzw.com/api/core/push
const globalHead = computed(() => getGlobalHead())
const mainHead = head.push(globalHead, { mode: 'client' })
watch(globalHead, (newValue) => mainHead.patch(newValue))

// router ready -> mount
router.isReady().finally(() => {
  // UI layout: set UI layout by route (for SPA)
  globalState.setLayoutColumn(getLayoutByRouteMeta(router.currentRoute.value.meta))
  // mount (force hydrate)
  app.mount('#app', true).$nextTick(() => {
    // set hydration state
    globalState.setHydrate()
    // reset: i18n language
    i18n.set(globalState.userAgent.isZhUser ? Language.Chinese : Language.English)
    // title surprise
    document.addEventListener(
      'visibilitychange',
      (event) => {
        // @ts-ignore
        const isHidden = event.target?.hidden || event.target?.webkitHidden
        const surprises = [
          // tltle: zero width character
          // { favicon: '🌝', title: '​' },
          // { favicon: '⛔️', title: 'FORBIDDEN' },
          // { favicon: '⭕️', title: 'FBI WARNING' },
          { favicon: '🌱', title: META.en_sub_title }
        ]
        const index = Math.floor(Math.random() * surprises.length)
        isHidden ? runTitler(surprises[index]) : resetTitler()
      },
      false
    )
    // production only
    if (isProd) {
      consoleSlogan(i18n.t(LanguageKey.APP_SLOGAN)!, store.stores.appOption.data?.site_email)
    }
  })
})
