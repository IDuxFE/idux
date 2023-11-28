/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasicTokens, DerivedMotionTokens } from '../../../types'

export function getDerivedMotionTokens(basicTokens: BasicTokens): DerivedMotionTokens {
  const { motionDuration } = basicTokens
  return {
    motionDurationFast: 0.18,
    motionDurationMedium: motionDuration,
    motionDurationSlow: 0.3,
  }
}
