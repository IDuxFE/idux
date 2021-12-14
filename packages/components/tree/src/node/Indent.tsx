/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FunctionalComponent, VNodeTypes } from 'vue'

const Indent: FunctionalComponent<{ level: number; noopIdentUnit: number; prefixCls: string }> = ({
  level,
  noopIdentUnit,
  prefixCls,
}) => {
  const children: VNodeTypes[] = []
  for (let index = 0; index < level; index++) {
    children.push(
      <span
        key={index}
        class={index < noopIdentUnit ? `${prefixCls}-node-indent-noop-unit` : `${prefixCls}-node-indent-unit`}
      />,
    )
  }
  return (
    <span aria-hidden={true} class={`${prefixCls}-node-indent`}>
      {children}
    </span>
  )
}

export default Indent
