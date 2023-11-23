/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { RateComponent } from './src/types'

import Rate from './src/Rate'

const IxRate = Rate as unknown as RateComponent

export { IxRate }

export type { RateInstance, RateComponent, RatePublicProps as RateProps } from './src/types'

export { getThemeTokens as getRateThemeTokens } from './theme'

export type { RateThemeTokens } from './theme'
