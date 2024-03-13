import { disableCopyrighter, enableCopyrighter } from '/@/effects/copyright'

export const read = () => navigator.clipboard.readText()
export const copy = (text: string) => {
  disableCopyrighter()
  // https://www.w3.org/TR/clipboard-apis/#async-clipboard-api
  // MARK: only https site
  return window.navigator.clipboard?.writeText(text).finally(() => {
    enableCopyrighter()
  })
}

export default { copy, read }
