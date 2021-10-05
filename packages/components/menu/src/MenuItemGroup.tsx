import { computed, defineComponent, inject, provide } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { menuItemGroupToken, menuToken, menuSubToken } from './token'
import { menuItemGroupProps } from './types'
import { usePaddingLeft } from './usePaddingLeft'

export default defineComponent({
  name: 'IxMenuItemGroup',
  props: menuItemGroupProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
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
      const iconWrapper = iconNode ? (
        <span class={`${prefixCls}-menu-item-group-title-icon`}>{iconNode}</span>
      ) : undefined

      const labelNode = <span> {slots.label?.() ?? label}</span>

      return (
        <li class={`${prefixCls}-menu-item-group`}>
          <div class={`${prefixCls}-menu-item-group-title`} style={style.value}>
            {iconWrapper}
            {labelNode}
          </div>
          <ul class={`${prefixCls}-menu-item-group-content`}>{slots.default?.()}</ul>
        </li>
      )
    }
  },
})
