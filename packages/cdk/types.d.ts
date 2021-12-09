/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalComponent } from '@idux/cdk/portal'
import type { VirtualScrollComponent } from '@idux/cdk/scroll'

declare module 'vue' {
  export interface GlobalComponents {
    CdkPortal: PortalComponent
    CdkVirtualScroll: VirtualScrollComponent
  }
}

export {}
