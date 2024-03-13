import { build } from 'vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export const bundleClientRender = async (paths) => {
  const plugins = []
  if (process.env.SENTRY_AUTH_TOKEN) {
    plugins.push(
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: 'leehave',
        project: 'vite-vue3-bsr-ssr-sls-demo',
        release: {
          name: paths.packageJSON.version
        }
      })
    )
  }

  await build({
    plugins,
    build: {
      outDir: paths.client,
      sourcemap: true,
      minify: true,
      manifest: true,
      emptyOutDir: false
    }
  })
}
