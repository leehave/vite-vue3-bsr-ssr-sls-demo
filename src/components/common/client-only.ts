import { Transition, cloneVNode, defineComponent, h, onMounted, ref } from 'vue'

import { useEnhancer } from '/@/app/enhancer'

export default defineComponent({
  name: 'ClientOnly',
  props: {
    placeholder: String,
    placeholderTag: {
      type: String,
      default: 'div'
    },
    transition: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    const { gState } = useEnhancer()
    // SSR -> hydrated -> render -> no transition
    const mounted = ref(gState.isHydrated.value ? true : false)

    onMounted(() => {
      // SSR inited -> mounted -> render -> transition
      if (!gState.isHydrated.value) {
        const setRender = () => {
          mounted.value = true
        }
        props.delay ? setTimeout(setRender, props.delay) : setRender()
      }
    })

    const renderResult = (result, resultKey?: string) => {
      if (!props.transition) {
        return result
      }
      if (Array.isArray(result) && result.length > 1) {
        return result
      }
      const singleResult = Array.isArray(result) ? result[0] : result
      return h(Transition, { name: 'client-only', mode: 'out-in' }, () =>
        singleResult
          ? cloneVNode(singleResult, { key: resultKey })
          : h('div', { key: 'empty', class: 'client-only-empty' })
      )
    }

    return () => {
      if (mounted.value) {
        return renderResult(context.slots.default?.(), 'result')
      }

      if (context.slots.placeholder) {
        return renderResult(context.slots.placeholder(), 'placeholder-slot')
      }

      if (props.placeholderTag && props.placeholder) {
        return renderResult(
          h(props.placeholderTag, { class: 'client-only-placeholder' }, props.placeholder),
          'placeholder'
        )
      }

      return renderResult(null)
    }
  }
})
