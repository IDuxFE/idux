import type { VNodeTypes } from 'vue'
import type { PaginationItemRenderFn, PaginationItemType } from '@idux/components/config'
import type { PaginationItemProps } from './types'

import { computed, defineComponent } from 'vue'
import { IxButton } from '@idux/components/button'
import { paginationItemPropsDef } from './types'

const iconMap = {
  prev: 'left',
  next: 'right',
  prev5: 'double-left',
  next5: 'double-right',
  page: '',
} as const

export default defineComponent({
  name: 'IxPaginationItem',
  components: { IxButton },
  props: paginationItemPropsDef,
  emits: ['itemClick'],
  setup(props: PaginationItemProps, { emit }) {
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
  itemRender: PaginationItemRenderFn,
  index: number,
  type: PaginationItemType,
  active: boolean,
  disabled: boolean,
) => {
  let original: VNodeTypes
  const icon = iconMap[type]
  if (type === 'prev5' || type === 'next5') {
    original = (
      <span class="ix-pagination-item-jumper">
        <ix-button mode="text" icon={icon} disabled={disabled} size="small" shape="circle" />
        <ix-button
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
      <ix-button mode="text" icon={icon} disabled={disabled} size="small" shape="circle">
        {index}
      </ix-button>
    )
  }

  return itemRender ? itemRender({ index, type, active, disabled, original }) : original
}
