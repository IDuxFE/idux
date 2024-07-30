/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ControlTriggerProps } from './types'
import type { ɵOverlayInstance } from '@idux/components/_private/overlay'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface ControlTriggerContext {
  props: ControlTriggerProps
  overlayFocused: ComputedRef<boolean>
  mergedPrefixCls: ComputedRef<string>
  bindOverlayMonitor: (overlayRef: Ref<ɵOverlayInstance | undefined>, overlayOpened: Ref<boolean>) => void
  resetTriggerFocus: () => void
}

export const controlTriggerToken: InjectionKey<ControlTriggerContext> = Symbol('controlTriggerToken')
