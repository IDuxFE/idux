import type { ComputedRef, Slots, VNodeTypes } from 'vue'
import type { CollapsePanelProps } from './types'

import { computed, defineComponent, inject } from 'vue'
import { isString } from 'lodash-es'
import { useGlobalConfig } from '@idux/components/config'
import { useKey } from '@idux/components/utils'
import { IxCollapseTransition } from '@idux/components/_private'
import { IxHeader } from '@idux/components/header'
import { IxIcon } from '@idux/components/icon'
import { collapseToken } from './token'
import { collapsePanelProps } from './types'
import { getFirstValidNode } from '@idux/cdk/utils'

export default defineComponent({
  name: 'IxCollapsePanel',
  props: collapsePanelProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    const { slots: collapseSlots, expandedKeys, expandIcon, handleExpand } = inject(collapseToken)!

    const key = useKey()
    const isExpanded = computed(() => expandedKeys.value.includes(key))
    const classes = computed(() => {
      return {
        [`${prefixCls}-collapse-panel`]: true,
        [`${prefixCls}-collapse-panel-disabled`]: props.disabled,
        [`${prefixCls}-collapse-panel-expanded`]: isExpanded.value,
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
          <IxCollapseTransition>
            <div v-show={expanded} class={`${prefixCls}-collapse-panel-content`}>
              <div class={`${prefixCls}-collapse-panel-content-box`}>{slots.default?.()}</div>
            </div>
          </IxCollapseTransition>
        </div>
      )
    }
  },
})

function renderHeader(
  props: CollapsePanelProps,
  slots: Slots,
  collapseSlots: Slots,
  key: string | number,
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
  return (
    <IxHeader v-slots={headerSlots} size="medium" disabled={disabled} onClick={handleClick} {...headerProps}></IxHeader>
  )
}
