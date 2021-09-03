import { computed, defineComponent, inject, provide } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { menuItemGroupToken, menuToken, menuSubToken } from './token'
import { menuItemGroupProps } from './types'
import { usePaddingLeft } from './usePaddingLeft'

export default defineComponent({
  name: 'IxMenuItemGroup',
  props: menuItemGroupProps,
  setup(props, { slots }) {
    provide(menuItemGroupToken, true)

    // menuContext must exist
    const { mode, indent } = inject(menuToken, null)!
    const menuSubContext = inject(menuSubToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, null)

    const level = menuSubContext ? menuSubContext.level + 1 : 1
    const paddingLeft = usePaddingLeft(mode, indent, level, !!menuItemGroupContext)
    const style = computed(() => {
      return { paddingLeft: paddingLeft.value }
    })

    return () => {
      const { icon, label } = props

      const iconNode = slots.icon?.() ?? icon ? <IxIcon name={icon}></IxIcon> : undefined
      const iconWrapper = iconNode ? <span class="ix-menu-item-group-title-icon">{iconNode}</span> : undefined

      const labelNode = <span> {slots.label?.() ?? label}</span>

      return (
        <li class="ix-menu-item-group">
          <div class="ix-menu-item-group-title" style={style.value}>
            {iconWrapper}
            {labelNode}
          </div>
          <ul class="ix-menu-item-group-content">{slots.default?.()}</ul>
        </li>
      )
    }
  },
})
