/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TabComponent } from './types'

const tabKey = Symbol('IxTab')
const Tab = (() => {}) as TabComponent
Tab.displayName = 'IxTab'
;(Tab as any)[tabKey] = true

export { Tab, tabKey }
