/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CollapsePanelProps } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, Slots, VNodeTypes } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { isString } from 'lodash-es'

import { getFirstValidNode } from '@idux/cdk/utils'
import { ɵCollapseTransition } from '@idux/components/_private'
import { IxHeader } from '@idux/components/header'
import { IxIcon } from '@idux/components/icon'
import { useKey } from '@idux/components/utils'

import { collapseToken } from './token'
import { collapsePanelProps } from './types'

export default defineComponent({
  name: 'IxCollapsePanel',
  props: collapsePanelProps,
  setup(props, { slots }) {
    const { slots: collapseSlots, expandedKeys, expandIcon, handleExpand } = inject(collapseToken)!

    const key = useKey()
    const isExpanded = computed(() => expandedKeys.value.includes(key))
    const classes = computed(() => {
      return {
        'ix-collapse-panel': true,
        'ix-collapse-panel-disabled': props.disabled,
        'ix-collapse-panel-expanded': isExpanded.value,
      }
    })

    const handleClick = () => {
      if (props.disabled) {
        return
      }
      handleExpand(key)
    }

    return () => {
      const expanded = isExpanded.value
      const headerNode = renderHeader(props, slots, collapseSlots, key, expanded, expandIcon, handleClick)
      return (
        <div class={classes.value}>
          {headerNode}
          <ɵCollapseTransition appear>
            <div v-show={expanded} class="ix-collapse-panel-content">
              <div class="ix-collapse-panel-content-box">{slots.default?.()}</div>
            </div>
          </ɵCollapseTransition>
        </div>
      )
    }
  },
})

function renderHeader(
  props: CollapsePanelProps,
  slots: Slots,
  collapseSlots: Slots,
  key: VKey,
  expanded: boolean,
  expandIcon: ComputedRef<string>,
  handleClick: () => void,
) {
  if (slots.header) {
    return slots.header({ expanded, onClick: handleClick })
  }
  let iconNode: VNodeTypes | undefined
  if (collapseSlots.expandIcon) {
    const tempNode = collapseSlots.expandIcon({ key, expanded })
    if (getFirstValidNode(tempNode)) {
      iconNode = tempNode
    }
  } else {
    const iconName = expandIcon.value
    iconNode = iconName ? <IxIcon name={iconName} rotate={expanded ? 90 : 0}></IxIcon> : undefined
  }
  const headerSlots = iconNode ? { prefix: () => iconNode } : undefined
  const { header, disabled } = props
  const headerProps = isString(header) ? { title: header } : header
  return <IxHeader v-slots={headerSlots} disabled={disabled} onClick={handleClick} {...headerProps}></IxHeader>
}
