import type { VNodeTypes } from 'vue'
import type { PaginationItemRenderFn, PaginationItemType } from './types'

import { computed, defineComponent } from 'vue'
import { IxButton } from '@idux/components/button'
import { paginationItemProps } from './types'

const iconMap = {
  prev: 'left',
  next: 'right',
  prev5: 'double-left',
  next5: 'double-right',
  page: '',
} as const

export default defineComponent({
  name: 'IxPaginationItem',
  props: paginationItemProps,
  emits: ['itemClick'],
  setup(props, { emit }) {
    const classes = computed(() => {
      return {
        'ix-pagination-item': true,
        'ix-pagination-item-active': props.active,
      }
    })

    const title = computed(() => {
      if (!props.showTitle) {
        return undefined
      }
      const { locale, type, index } = props
      const { prev, next, prev5, next5 } = locale
      const titles = { prev, next, prev5, next5, page: `${index}` }
      return titles[type]
    })

    const onClick = () => {
      if (props.disabled) {
        return
      }
      const { type, index } = props
      emit('itemClick', { type, index })
    }

    return { classes, title, onClick }
  },

  render() {
    const { classes, title, onClick, index, type, active, disabled } = this
    const itemRender = this.$slots.item ?? this.itemRender
    const children = getChildren(itemRender, index, type, active, disabled)
    return (
      <li class={classes} title={title} onClick={onClick}>
        {children}
      </li>
    )
  },
})

const getChildren = (
  itemRender: PaginationItemRenderFn | undefined,
  index: number | undefined,
  type: PaginationItemType,
  active: boolean,
  disabled: boolean,
) => {
  let original: VNodeTypes
  const icon = iconMap[type]
  if (type === 'prev5' || type === 'next5') {
    original = (
      <span class="ix-pagination-item-jumper">
        <IxButton mode="text" icon={icon} disabled={disabled} size="small" shape="circle" />
        <IxButton
          class="ix-pagination-item-ellipsis"
          mode="text"
          icon="ellipsis"
          disabled={disabled}
          size="small"
          shape="circle"
        />
      </span>
    )
  } else {
    original = (
      <IxButton mode="text" icon={icon} disabled={disabled} size="small" shape="circle">
        {index}
      </IxButton>
    )
  }

  return itemRender ? itemRender({ index, type, active, disabled, original }) : original
}
