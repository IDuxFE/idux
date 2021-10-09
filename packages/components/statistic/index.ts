/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { StatisticComponent } from './src/types'

import Statistic from './src/Statistic.vue'

const IxStatistic = Statistic as unknown as StatisticComponent

export { IxStatistic }

export type { StatisticInstance, StatisticPublicProps as StatisticProps } from './src/types'
