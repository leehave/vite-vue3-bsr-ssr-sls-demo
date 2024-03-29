import { DEFAULT_DELAY } from '/@/config/app.config'

export const delayer = (ms: number = DEFAULT_DELAY) => {
  const start = new Date().getTime()
  return (action: () => void) => {
    if (!ms) {
      action()
      return
    }

    const time = new Date().getTime() - start
    const timeout = ms - time
    const isDelay = timeout > 0
    isDelay ? setTimeout(action, timeout) : action()
  }
}

export const delayPromise = <T>(ms: number, promise: Promise<T>) => {
  const delay = delayer(ms)
  return new Promise<T>((resolve, reject) => {
    promise.then((value) => delay(() => resolve(value))).catch(reject)
  })
}
