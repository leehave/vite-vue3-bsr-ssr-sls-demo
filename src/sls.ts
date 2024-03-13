import { createExpressApp } from './server'
import { enableProdRenderer } from './server/renderer/prod'
import { getBFFServerPort } from '@/config/bff.config'

let slsServer: Awaited<ReturnType<typeof createExpressApp>> | null = null

export const initializer = async (context, callback) => {
  console.log('serverless initializing')
  slsServer = await createExpressApp()
  enableProdRenderer(slsServer.app, slsServer.cache)
  slsServer.server.listen(getBFFServerPort())
  callback(null, '')
}

// TODO: Serverless
export const handler = (request, response) => {
  // slsServer?.app
  // ...
  console.log('hello world')
  response.send('hello world')
}
