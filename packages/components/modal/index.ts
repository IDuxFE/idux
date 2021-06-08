import type { ModalComponent, ModalProviderComponent } from './src/types'

import Modal from './src/Modal'
import ModalProvider from './src/ModalProvider'

const IxModal = Modal as unknown as ModalComponent
const IxModalProvider = ModalProvider as unknown as ModalProviderComponent

export { IxModal, IxModalProvider }
export { useModal } from './src/useModal'
export { modalToken } from './src/token'

export type {
  ModalInstance,
  ModalPublicProps as ModalProps,
  ModalProviderInstance,
  ModalProviderRef,
  ModalType,
  ModalButtonProps,
  ModalOptions,
  ModalRef,
  ModalBindings,
} from './src/types'
