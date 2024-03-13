import { inject, onMounted } from 'vue'

import type { Popup } from '.'
import { PopupSymbol } from './constant'

export const usePopup = (): Popup => {
  return inject(PopupSymbol) as Popup
}

export const usePopupWithRoot = (fn: () => HTMLElement): Popup => {
  const popup = usePopup()
  onMounted(() => popup.$setRoot(fn()))
  return popup
}
