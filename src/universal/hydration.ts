import { SSRData, getSSRContextValue } from './context'
import { isClient, isServer } from '/@/app/environment'
// https://github.com/nuxt/framework/blob/main/packages/nitro/src/runtime/app/render.ts
import { useSSRContext, watchEffect } from 'vue'

export const useHydration = <T>(key: keyof SSRData, get: () => T, set: (value: T | undefined) => void) => {
  if (isServer) {
    // https://vuejs.org/api/ssr.html#usessrcontext
    const ssrContext = useSSRContext()!
    watchEffect(() => {
      ssrContext[key] = get()
    })
  }
  if (isClient) {
    set(getSSRContextValue(key))
  }
}
