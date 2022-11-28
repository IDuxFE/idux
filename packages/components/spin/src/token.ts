/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SpinProviderRef } from './types'
import type { InjectionKey } from 'vue'

// public
export const SPIN_PROVIDER_TOKEN: InjectionKey<SpinProviderRef> = Symbol('SPIN_PROVIDER_TOKEN')
