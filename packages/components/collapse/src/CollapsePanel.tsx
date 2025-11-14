/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CollapsePanelProps, CollapseSize } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, Slots, VNodeTypes } from 'vue'

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { isString } from 'lodash-es'

import { getFirstValidNode, uniqueId, useKey } from '@idux/cdk/utils'
import { ɵCollapseTransition } from '@idux/components/_private/collapse-transition'
import { useGlobalConfig } from '@idux/components/config'
import { IxHeader } from '@idux/components/header'
import { IxIcon } from '@idux/components/icon'
import { useThemeToken } from '@idux/components/theme'

import { collapseToken } from './token'
import { collapsePanelProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxCollapsePanel',
  props: collapsePanelProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('collapse')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-collapse-panel`)
    const { slots: collapseSlots, mergedSize, expandedKeys, expandIcon, handleExpand } = inject(collapseToken)!

    const key = useKey()
    const isExpanded = computed(() => expandedKeys.value.includes(key))
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [`${prefixCls}`]: true,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-expanded`]: isExpanded.value,
      })
    })

    const handleClick = () => {
      if (props.disabled) {
        return
      }
      handleExpand(key)
    }

    return () => {
      const expanded = isExpanded.value
      const prefixCls = mergedPrefixCls.value
      const triggerId = uniqueId('control-collapse-panel')
      const headerNode = renderHeader(
        props,
        slots,
        prefixCls,
        collapseSlots,
        key,
        mergedSize,
        expanded,
        expandIcon,
        handleClick,
        triggerId,
      )

      return (
        <div class={classes.value}>
          {headerNode}
          <ɵCollapseTransition appear>
            <div v-show={expanded} class={`${prefixCls}-content`} id={triggerId}>
              <div class={`${prefixCls}-content-box`}>{slots.default?.()}</div>
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
  prefixCls: string,
  collapseSlots: Slots,
  key: VKey,
  mergedSize: ComputedRef<CollapseSize>,
  expanded: boolean,
  expandIcon: ComputedRef<string>,
  changeExpand: () => void,
  triggerId: string,
) {
  if (slots.header) {
    const headerSlots = slots.header({ expanded, onClick: changeExpand, changeExpand })

    if (headerSlots?.length) {
      const headerNode = headerSlots[0]
      headerNode.props = {
        ...headerNode.props,
        'aria-controls': triggerId,
      }
    }

    return headerSlots
  }
  let iconNode: VNodeTypes | undefined
  if (collapseSlots.expandIcon) {
    const tempNode = collapseSlots.expandIcon({ key, expanded })
    if (getFirstValidNode(tempNode)) {
      iconNode = tempNode
    }
  } else {
    const iconName = expandIcon.value
    iconNode = iconName ? (
      <IxIcon class={`${prefixCls}-expand-icon`} name={iconName} rotate={expanded ? 90 : 0} />
    ) : undefined
  }
  const headerSlots = iconNode ? { prefix: () => iconNode } : undefined
  const { header, disabled } = props
  const headerProps = isString(header) ? { title: header } : header
  return (
    <IxHeader
      v-slots={headerSlots}
      disabled={disabled}
      size={mergedSize.value}
      onClick={changeExpand}
      aria-controls={triggerId}
      {...headerProps}
    />
  )
}
