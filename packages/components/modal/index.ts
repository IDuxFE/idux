/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ModalComponent, ModalProviderComponent } from './src/types'

import Modal from './src/Modal'
import ModalProvider from './src/ModalProvider'

const IxModal = Modal as unknown as ModalComponent
const IxModalProvider = ModalProvider as unknown as ModalProviderComponent

export { IxModal, IxModalProvider }
export { useModal } from './src/useModal'
export { MODAL_TOKEN, MODAL_PROVIDER_TOKEN } from './src/token'

export type {
  ModalInstance,
  ModalComponent,
  ModalPublicProps as ModalProps,
  ModalProviderInstance,
  ModalProviderComponent,
  ModalProviderRef,
  ModalType,
  ModalButtonProps,
  ModalOptions,
  ModalRef,
  ModalBindings,
} from './src/types'

export { getThemeTokens as getModalThemeTokens } from './theme'

export type { ModalThemeTokens } from './theme'
