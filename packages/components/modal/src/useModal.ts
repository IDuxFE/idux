import type { ModalProviderRef } from './types'

import { inject } from 'vue'
import { throwError } from '@idux/cdk/utils'
import { modalProviderToken } from './token'

export const useModal = (): ModalProviderRef => {
  const modalProviderRef = inject(modalProviderToken, null)
  if (modalProviderRef === null) {
    return throwError('modal', '<ix-modal-provider> not found.')
  }
  return modalProviderRef
}
