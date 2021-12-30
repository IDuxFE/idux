/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VNodeTypes } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { isNil } from 'lodash-es'

import { IxButton } from '@idux/components/button'

import { paginationToken } from '../token'
import { paginationItemProps } from '../types'

const iconMap = {
  prev: 'left',
  next: 'right',
  prev5: 'double-left',
  next5: 'double-right',
  page: '',
} as const

const indexDiffMap = {
  next: 1,
  prev: -1,
  prev5: -5,
  next5: 5,
} as const

export default defineComponent({
  props: paginationItemProps,
  setup(props) {
    const {
      props: paginationProps,
      slots,
      config,
      locale,
      mergedPrefixCls,
      activeIndex,
      changePageIndex,
    } = inject(paginationToken)!

    const isActive = computed(() => activeIndex.value === props.index)
    const isDisabled = computed(() => props.disabled || paginationProps.disabled)
    const showTitle = computed(() => paginationProps.showTitle ?? config.showTitle)

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-item`
      return {
        [prefixCls]: true,
        [`${prefixCls}-active`]: isActive.value,
      }
    })

    const title = computed(() => {
      if (!showTitle.value) {
        return undefined
      }

      const { type, index } = props
      if (type === 'page') {
        return index!.toString()
      }

      return locale.value[type]
    })

    const onClick = () => {
      if (isDisabled.value) {
        return
      }
      const { type, index } = props
      let newIndex: number
      if (type === 'page') {
        newIndex = index!
      } else {
        newIndex = activeIndex.value + indexDiffMap[type]
      }
      changePageIndex(newIndex)
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-item`

      const { index, type } = props
      const disabled = isDisabled.value
      const active = isActive.value
      let original: VNodeTypes
      const icon = iconMap[type]
      const commonButtonProps = { mode: 'text', size: 'sm', shape: 'circle' } as const
      if (props.type === 'prev5' || type === 'next5') {
        original = (
          <span class={`${prefixCls}-jumper`}>
            <IxButton {...commonButtonProps} icon={icon} disabled={disabled} />
            <IxButton {...commonButtonProps} class={`${prefixCls}-ellipsis`} icon="ellipsis" disabled={disabled} />
          </span>
        )
      } else if (!isNil(index)) {
        original = (
          <IxButton {...commonButtonProps} icon={icon} disabled={disabled}>
            {index}
          </IxButton>
        )
      } else {
        original = <IxButton {...commonButtonProps} icon={icon} disabled={disabled}></IxButton>
      }

      const children = slots.item ? slots.item({ index, type, active, disabled, original }) : original

      return (
        <li class={classes.value} title={title.value} onClick={onClick}>
          {children}
        </li>
      )
    }
  },
})
