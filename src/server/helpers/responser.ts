import { RequestHandler, Response } from 'express'

import { INVALID_ERROR } from '@/constants/http-code'
import { createLogger } from '@/utils/logger'
import { isAxiosError } from 'axios'
import isObject from 'lodash-es/isObject'

export const logger = createLogger('BFF')

export const getErrorMessage = (_error: unknown) => {
  const error = isAxiosError(_error) ? _error.toJSON() : _error
  return typeof error === 'string'
    ? error
    : error instanceof Error || isObject(error)
      ? (error as any).message || (error as any)?.name
      : JSON.stringify(error)
}

export interface ErrorerOptions {
  message: unknown
  code?: number
}

export const errorer = (response: Response, { code, message }: ErrorerOptions) => {
  logger.failure(`Error:`, isAxiosError(message) ? message.toJSON() : message)
  response.status(code ?? INVALID_ERROR)
  response.send(getErrorMessage(message))
}

export const responser = (promise: () => Promise<any>): RequestHandler => {
  return (_, response) => {
    promise()
      .then((data) => response.send(data))
      .catch((error: unknown) => errorer(response, { message: error }))
  }
}
