/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface ScrollStrategy {
  /** Enable this scroll strategy. */
  enable: () => void

  /** Disable this scroll strategy. */
  disable: () => void
}
