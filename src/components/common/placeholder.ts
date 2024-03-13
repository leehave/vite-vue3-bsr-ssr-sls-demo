import { PropType, Transition, defineComponent, h } from 'vue'

import Empty from './empty.vue'
import { LanguageKey } from '/@/language'
import Spin from './spin.vue'
import { isUndefined } from '/@/constants/value'

export enum Events {
  AfterEnter = 'after-enter'
}

export default defineComponent({
  name: 'Placeholder',
  props: {
    data: {
      type: [Array, Object, Boolean, Number],
      default: undefined
    },
    transition: {
      type: Boolean,
      default: true
    },
    transitionName: {
      type: String,
      default: 'module'
    },
    placeholder: String,
    i18nKey: String as PropType<LanguageKey>,
    loading: Boolean
  },
  emits: [Events.AfterEnter],
  setup(props, context) {
    return () => {
      const { data, placeholder, i18nKey, loading, transition, transitionName } = props
      const isEmptyData = !isUndefined(data) && ((Array.isArray(data) && !(data as any).length) || !data)

      const getPlaceholderView = () => {
        return placeholder || i18nKey ? h(Empty, { placeholder, i18nKey }) : context.slots.placeholder?.()
      }

      const getDataView = () => {
        return isEmptyData ? getPlaceholderView() : context.slots.default?.()
      }

      const getLoadingView = () => {
        return context.slots.loading?.() || h(Spin, { loading: true })
      }

      const getView = () => {
        return loading ? getLoadingView() : getDataView()
      }

      if (transition) {
        return h(
          Transition,
          {
            name: transitionName,
            mode: 'out-in',
            onAfterEnter(...args) {
              context.emit(Events.AfterEnter, ...args)
            }
          },
          () => getView()
        )
      }

      return getView()
    }
  }
})
