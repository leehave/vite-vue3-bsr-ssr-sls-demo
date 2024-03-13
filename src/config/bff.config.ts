export const BFF_TUNNEL_PREFIX = '/_tunnel'
export const BFF_PROXY_PREFIX = '/_proxy'
export const BFF_PROXY_ALLOWLIST_REGEXP = /^https:\/\/([a-z0-9-]+\.)*felzx\.(com|cn)/

export const getBFFServerPort = () => Number(process.env.PORT || 3000)
export const getOnlineApiURL = () => process.env.VITE_API_ONLINE_URL as string
export const getLocalApiURL = () => process.env.VITE_API_LOCAL_URL as string
export const getStaticURL = () => process.env.VITE_STATIC_URL as string
