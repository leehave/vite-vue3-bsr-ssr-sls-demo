import { verseConfig } from './verse'

export enum CustomElementId {
  Verse = 'verse'
}

export interface CustomElementConfig {
  transform: (html: string) => string
  style?: (element: HTMLElement) => string | null
  effect?: (element: HTMLElement) => void
}

export const CUSTOM_ELEMENTS: Record<CustomElementId, CustomElementConfig> = {
  [CustomElementId.Verse]: verseConfig
}

export const CUSTOM_ELEMENT_LIST = Object.values(CUSTOM_ELEMENTS)
