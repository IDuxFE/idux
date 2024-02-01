/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export type ContainerType = Element | ShadowRoot

export interface DynamicCssOptions {
  attachTo?: ContainerType
  csp?: { nonce?: string }
}
