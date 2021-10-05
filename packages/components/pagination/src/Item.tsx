import type { VNodeTypes } from 'vue'

import { computed, defineComponent, inject } from 'vue'
import { isNil } from 'lodash-es'
import { useGlobalConfig } from '@idux/components/config'
import { IxButton } from '@idux/components/button'
import { paginationItemProps } from './types'
import { paginationToken } from './token'

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
    const { prefixCls } = useGlobalConfig('common')

    const { props: paginationProps, slots, config, locale, activeIndex, onPageIndexChange } = inject(paginationToken)!

    const isActive = computed(() => activeIndex.value === props.index)
    const isDisabled = computed(() => props.disabled || paginationProps.disabled)
    const showTitle = computed(() => paginationProps.showTitle ?? config.showTitle)
    const itemRender = computed(() => slots.item ?? paginationProps.itemRender ?? config.itemRender)

    const classes = computed(() => {
      return {
        [`${prefixCls}-pagination-item`]: true,
        [`${prefixCls}-pagination-item-active`]: isActive.value,
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
      onPageIndexChange(newIndex)
    }

    return () => {
      const { index, type } = props
      const disabled = isDisabled.value
      const active = isActive.value
      const _itemRender = itemRender.value
      let original: VNodeTypes
      const icon = iconMap[type]
      const commonButtonProps = { mode: 'text', size: 'small', shape: 'circle' } as const
      if (props.type === 'prev5' || type === 'next5') {
        original = (
          <span class={`${prefixCls}-pagination-item-jumper`}>
            <IxButton {...commonButtonProps} icon={icon} disabled={disabled} />
            <IxButton
              {...commonButtonProps}
              class={`${prefixCls}-pagination-item-ellipsis" icon="ellipsis`}
              disabled={disabled}
            />
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

      const children = _itemRender ? _itemRender({ index, type, active, disabled, original }) : original

      return (
        <li class={classes.value} title={title.value} onClick={onClick}>
          {children}
        </li>
      )
    }
  },
})
