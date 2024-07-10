/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DndTreeIndicatorProps, TreeIndicatorInstruction } from '../types'
import type { FunctionalComponent } from 'vue'

import { convertCssPixel } from '@idux/cdk/utils'

const DndTreeIndicator: FunctionalComponent<DndTreeIndicatorProps> = ({ instruction, isFirst, isLast }) => {
  const prefixCls = 'cdk-dnd-tree-indicator'
  const classes = {
    [prefixCls]: true,
    [`${prefixCls}-${instruction.type}`]: true,
    [`${prefixCls}-first`]: !!isFirst,
    [`${prefixCls}-last`]: !!isLast,
  }
  const style = {
    '--cdk-inner-indent': getIndent(instruction),
  }

  return <div class={classes} style={style}></div>
}

function getIndent(instruction: TreeIndicatorInstruction) {
  if (instruction.type === 'instruction-blocked') {
    return
  }

  if (instruction.type === 'reparent') {
    return convertCssPixel(instruction.desiredLevel * instruction.indentPerLevel)
  }

  return convertCssPixel(instruction.currentLevel * instruction.indentPerLevel)
}

DndTreeIndicator.displayName = 'DndTreeIndicator'

export default DndTreeIndicator
