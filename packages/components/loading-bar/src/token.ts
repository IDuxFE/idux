/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { LoadingBarProviderRef } from './types'
import type { InjectionKey } from 'vue'

// public
export const LOADING_BAR_PROVIDER_TOKEN: InjectionKey<LoadingBarProviderRef> = Symbol('LOADING_BAR_PROVIDER_TOKEN')
