import type { InjectionKey, Ref, Slots } from 'vue'
import type { ModalConfig } from '@idux/components/config'
import type { ModalBindings, ModalProps, ModalProviderRef } from './types'

export interface ModalContext {
  props: ModalProps
  slots: Slots
  config: ModalConfig
  visible: Ref<boolean>
  animatedVisible: Ref<boolean>
  cancelLoading: Ref<boolean>
  okLoading: Ref<boolean>
}

export const modalToken: InjectionKey<ModalContext> = Symbol('modalToken')
export const modalProviderToken: InjectionKey<ModalProviderRef> = Symbol('modalProviderToken')

// public token
export const MODAL_TOKEN: InjectionKey<ModalBindings & { props: ModalProps }> = Symbol('MODAL_TOKEN')
