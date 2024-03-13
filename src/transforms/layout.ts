import { LayoutColumn } from '/@/app/state'
import { RouteMeta } from 'vue-router'

export const getLayoutByRouteMeta = (routeMeta: RouteMeta) => {
  return routeMeta.layout === LayoutColumn.Wide
    ? LayoutColumn.Wide
    : routeMeta.layout === LayoutColumn.Full
      ? LayoutColumn.Full
      : LayoutColumn.Normal
}
