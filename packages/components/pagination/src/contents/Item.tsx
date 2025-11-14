/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNodeChild, computed, createTextVNode, defineComponent, inject } from 'vue'

import { isNil } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

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
        [`${prefixCls}-${props.type}`]: true,
        [`${prefixCls}-active`]: isActive.value,
        [`${prefixCls}-disabled`]: isDisabled.value,
      }
    })

    const title = computed(() => {
      if (!showTitle.value) {
        return undefined
      }

      const { type, index } = props
      if (type === 'page') {
        return index as unknown as string
      }

      return locale.pagination[type]
    })

    const handleClick = () => {
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

    const handleKeydown = (evt: KeyboardEvent) => {
      if (isDisabled.value || evt.code !== 'Enter') {
        return
      }
      handleClick()
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-item`
      const { index, type } = props
      const disabled = isDisabled.value

      let original: VNodeChild

      if (props.type === 'prev5' || type === 'next5') {
        original = (
          <span class={` ${prefixCls}-jumper`}>
            <IxIcon name={iconMap[type]} />
            <IxIcon class={`${prefixCls}-ellipsis`} name="ellipsis" />
          </span>
        )
      } else if (!isNil(index)) {
        original = createTextVNode(index as unknown as string)
      } else {
        original = (
          <IxIcon name={iconMap[type]} role="button" aria-label={type === 'prev' ? 'paging-prev' : 'paging-next'} />
        )
      }

      const children = slots.item ? slots.item({ index, type, active: isActive.value, disabled, original }) : original

      return (
        <li
          class={classes.value}
          tabindex={disabled ? -1 : 0}
          title={title.value}
          onClick={handleClick}
          onKeydown={handleKeydown}
          role="gridcell"
          aria-selected={isActive.value ? 'true' : undefined}
          aria-disabled={disabled ? 'true' : undefined}
        >
          <span class={`${prefixCls}-content`}>{children}</span>
        </li>
      )
    }
  },
})
