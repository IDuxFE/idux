import type { MessageProviderRef } from './types'

import { inject } from 'vue'
import { throwError } from '@idux/cdk/utils'
import { messageProviderToken } from './token'

export const useMessage = (): MessageProviderRef => {
  const modalProviderRef = inject(messageProviderToken, null)
  if (modalProviderRef === null) {
    return throwError('components/message', '<ix-message-provider> not found.')
  }
  return modalProviderRef
}
