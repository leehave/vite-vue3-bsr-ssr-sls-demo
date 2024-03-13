import { PopupUiProps, omitUiProps } from './popup'
import { defineComponent, h } from 'vue'

import { usePopup } from './hook'

export default defineComponent({
  props: {
    src: String,
    ...PopupUiProps
  },
  setup(props, context) {
    const popup = usePopup()

    // Image -> click -> visible modal, ignore (clone/visible)
    return () => {
      const { src, ...popupProps } = props
      if (!src) {
        return null
      }

      const imageProps = omitUiProps(props)
      const imageAttrs = {
        ...imageProps,
        ...context.attrs
      }

      return h('img', {
        ...imageAttrs,
        src,
        onClick(...args) {
          ; (imageProps as any)?.onClick?.(...args)
          popup?.vImage(src, imageAttrs, popupProps)
        }
      })
    }
  }
})
