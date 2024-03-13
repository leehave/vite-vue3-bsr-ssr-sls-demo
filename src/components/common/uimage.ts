import { defineComponent, h, ref } from 'vue'
import { getAssetURL, getProxyURL } from '/@/transforms/url'

import { onClient } from '/@/universal'
import { useEnhancer } from '/@/app/enhancer'

export default defineComponent({
  name: 'Uimage',
  props: {
    src: {
      type: String,
      required: true
    },
    cdn: {
      type: Boolean,
      default: false
    },
    proxy: {
      type: Boolean,
      default: false
    },
    defer: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { defer, cdnDomain } = useEnhancer()
    const deferRenderable = ref(false)
    if (props.defer) {
      onClient(() => {
        defer.addTask(() => {
          deferRenderable.value = true
        })
      })
    }

    return () => {
      const { src, cdn, proxy, defer, ...restProps } = props

      let imageSrc = src
      if (cdn) {
        imageSrc = getAssetURL(cdnDomain, src)
      }
      if (proxy) {
        imageSrc = getProxyURL(cdnDomain, src)
      }
      if (defer && !deferRenderable.value) {
        return null
      }

      return h('img', {
        draggable: false,
        ...restProps,
        src: imageSrc
      })
    }
  }
})
