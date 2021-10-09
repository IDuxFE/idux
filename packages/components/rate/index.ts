/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { RateComponent } from './src/types'

import Rate from './src/Rate.vue'

const IxRate = Rate as unknown as RateComponent

export { IxRate }

export type { RateInstance, RatePublicProps as RateProps } from './src/types'
