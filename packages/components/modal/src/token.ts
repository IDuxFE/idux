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

export const modalInnerToken: InjectionKey<ModalContext> = Symbol('modalInnerToken')
export const modalProviderToken: InjectionKey<ModalProviderRef> = Symbol('modalProviderToken')

// public token
export const modalToken: InjectionKey<ModalBindings & { props: ModalProps }> = Symbol('modalToken')
