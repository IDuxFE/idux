import { computed, defineComponent, inject } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { ɵDropdownToken } from '@idux/components/dropdown'
import { menuSubToken } from '../token'

export default defineComponent({
  setup() {
    const { prefixCls } = useGlobalConfig('common')
    const { props, slots, mode, theme, handleMouseEvent } = inject(menuSubToken)!
    const dropdownContext = inject(ɵDropdownToken, null)

    const classes = computed(() => {
      return {
        [`${prefixCls}-menu-content`]: true,
        [`${prefixCls}-menu-vertical`]: true,
        [`${prefixCls}-menu-${theme.value}`]: true,
        [`${prefixCls}-menu-dropdown`]: !!dropdownContext,
      }
    })

    const events = computed(() => {
      if (props.disabled && mode.value === 'inline') {
        return undefined
      }
      return {
        onMouseenter: () => handleMouseEvent(true),
        onMouseleave: () => handleMouseEvent(false),
      }
    })

    return () => (
      <ul class={classes.value} {...events.value}>
        {slots.default?.()}
      </ul>
    )
  },
})
