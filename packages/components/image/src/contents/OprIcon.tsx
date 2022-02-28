/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FunctionalComponent } from 'vue'

import { computed, normalizeClass } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { useKey } from '@idux/components/utils'

interface OprIconProps {
  disabled: boolean
  icon: string
  prefixCls: string
  opr: () => void
}

const OprIcon: FunctionalComponent<OprIconProps> = props => {
  const { disabled, icon, prefixCls, opr } = props

  const key = useKey()
  const classes = computed(() =>
    normalizeClass({
      [`${prefixCls}-opr-item`]: true,
      [`${prefixCls}-opr-item-disabled`]: disabled,
    }),
  )

  return <IxIcon class={classes.value} name={icon} onClick={opr} key={key} />
}

export default OprIcon
