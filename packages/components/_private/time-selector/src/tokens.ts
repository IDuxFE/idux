/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ComputedRef, InjectionKey } from 'vue'

export interface TimeSelectorContext {
  mergedPrefixCls: ComputedRef<string>
}

export const timeSelectorContext: InjectionKey<TimeSelectorContext> = Symbol('timePickerSelectorContext')
