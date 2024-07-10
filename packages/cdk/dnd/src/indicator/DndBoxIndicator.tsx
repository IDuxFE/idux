/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DndBoxIndicatorProps } from '../types'
import type { FunctionalComponent } from 'vue'

import { isNil } from 'lodash-es'

import { convertCssPixel } from '@idux/cdk/utils'

const DndBoxIndicator: FunctionalComponent<DndBoxIndicatorProps> = ({ edge, gap, isFirst, isLast }) => {
  const prefixCls = 'cdk-dnd-box-indicator'
  const classes = {
    [prefixCls]: true,
    [`${prefixCls}-${edge}`]: true,
    [`${prefixCls}-first`]: !!isFirst,
    [`${prefixCls}-last`]: !!isLast,
  }

  const style = !isNil(gap)
    ? {
        '--cdk-inner-line-gap': convertCssPixel(gap),
      }
    : undefined

  return <div class={classes} style={style}></div>
}

export default DndBoxIndicator
