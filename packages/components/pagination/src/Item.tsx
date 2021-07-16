import type { VNodeTypes } from 'vue'
import type { PaginationItemRenderFn, PaginationItemType } from './types'

import { computed, defineComponent, inject } from 'vue'
import { isNil } from '@idux/cdk/utils'
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
    const { props: paginationProps, slots, config, locale, activeIndex, onPageIndexChange } = inject(paginationToken)!

    const isActive = computed(() => activeIndex.value === props.index)
    const isDisabled = computed(() => props.disabled || paginationProps.disabled)
    const showTitle = computed(() => paginationProps.showTitle ?? config.showTitle)
    const itemRender = computed(() => slots.item ?? paginationProps.itemRender ?? config.itemRender)

    const classes = computed(() => {
      return {
        'ix-pagination-item': true,
        'ix-pagination-item-active': isActive.value,
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

    return { classes, title, isActive, isDisabled, onClick, itemRender }
  },

  render() {
    const child = getChild(this.itemRender, this.index, this.type, this.isActive, this.isDisabled)
    return (
      <li class={this.classes} title={this.title} onClick={this.onClick}>
        {child}
      </li>
    )
  },
})

const getChild = (
  itemRender: PaginationItemRenderFn | undefined,
  index: number | undefined,
  type: PaginationItemType,
  active: boolean,
  disabled: boolean,
) => {
  let original: VNodeTypes
  const icon = iconMap[type]
  const commonButtonProps = { mode: 'text', size: 'small', shape: 'circle' } as const
  if (type === 'prev5' || type === 'next5') {
    original = (
      <span class="ix-pagination-item-jumper">
        <IxButton {...commonButtonProps} icon={icon} disabled={disabled} />
        <IxButton {...commonButtonProps} class="ix-pagination-item-ellipsis" icon="ellipsis" disabled={disabled} />
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

  return itemRender ? itemRender({ index, type, active, disabled, original }) : original
}
