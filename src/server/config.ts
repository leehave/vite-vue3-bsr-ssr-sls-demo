import { getLocalApiURL, getOnlineApiURL } from '@/config/bff.config'

import { isNodeDev } from '@/server/environment'
import path from 'path'

// Keep it as a function, since the process.env variables are only valid after the application is completely run
export const getNodePressAPI = () => {
  const local = getLocalApiURL()
  const online = getOnlineApiURL()
  return isNodeDev ? local : online
}

export const ROOT_PATH = process.cwd()
export const DIST_PATH = path.join(ROOT_PATH, 'dist')
export const PRDO_CLIENT_PATH = path.join(DIST_PATH, 'client')
export const PRDO_SERVER_PATH = path.join(DIST_PATH, 'server')

export const PUBLIC_PATH = isNodeDev ? path.join(ROOT_PATH, 'public') : PRDO_CLIENT_PATH
