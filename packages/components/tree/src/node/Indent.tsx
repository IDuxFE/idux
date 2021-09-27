/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FunctionalComponent, VNodeTypes } from 'vue'

const Indent: FunctionalComponent<{ level: number; prefixCls: string }> = ({ level, prefixCls }) => {
  const children: VNodeTypes[] = []
  for (let index = 0; index < level; index++) {
    children.push(<span key={index} class={`${prefixCls}-node-indent-unit`} />)
  }
  return (
    <span aria-hidden={true} class={`${prefixCls}-node-indent`}>
      {children}
    </span>
  )
}

export default Indent
