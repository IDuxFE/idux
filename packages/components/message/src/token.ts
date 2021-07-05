import type { InjectionKey } from 'vue'
import type { MessageProviderRef } from './types'

export const messageProviderToken: InjectionKey<MessageProviderRef> = Symbol('messageProviderToken')
