import type { ComputedRef } from 'vue'
import type { ɵDropdownContext } from '@idux/components/dropdown'
import type { MenuMode, MenuProps } from './types'

import { computed, defineComponent, inject, provide, watch } from 'vue'
import { callEmit, convertCssPixel } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { ɵDropdownToken } from '@idux/components/dropdown'
import { menuToken } from './token'
import { menuProps } from './types'
import { useMergedProp } from '@idux/components/utils'

export default defineComponent({
  name: 'IxMenu',
  props: menuProps,
  setup(props, { slots }) {
    const dropdownContext = inject(ɵDropdownToken, null)
    const { expandedKeys, handleExpand } = useExpanded(props)
    const { selectedKeys, handleItemClick } = useSelected(props, dropdownContext)

    const config = useGlobalConfig('menu')
    const indent = computed(() => props.indent ?? config.indent)
    const mode = useMenuMode(props)
    const multiple = computed(() => props.multiple)
    const theme = computed(() => props.theme ?? config.theme)

    provide(menuToken, {
      expandedKeys,
      handleExpand,
      selectedKeys,
      handleItemClick,
      indent,
      mode,
      multiple,
      theme,
    })

    const classes = useClasses(props, theme, mode, !!dropdownContext)
    const style = computed(() => {
      if (!props.collapsed || mode.value === 'horizontal') {
        return undefined
      }
      return { width: convertCssPixel(props.collapsedWidth ?? config.collapsedWidth) }
    })

    return () => (
      <ul class={classes.value} style={style.value}>
        {slots.default?.()}
      </ul>
    )
  },
})

function useExpanded(props: MenuProps) {
  const expandedKeys = useMergedProp(props, 'expandedKeys')

  const handleExpand = (key: string | number, expanded: boolean) => {
    const index = expandedKeys.value.indexOf(key)
    if (expanded) {
      index === -1 && (expandedKeys.value = [...expandedKeys.value, key])
    } else {
      if (index > -1) {
        expandedKeys.value.splice(index, 1)
        expandedKeys.value = [...expandedKeys.value]
      }
    }
  }

  let cachedExpandedKeys: Array<string | number> = []
  watch(
    () => props.collapsed,
    collapsed => {
      if (collapsed) {
        cachedExpandedKeys = [...expandedKeys.value]
        expandedKeys.value = []
      } else {
        expandedKeys.value = cachedExpandedKeys
        cachedExpandedKeys = []
      }
    },
  )

  return { expandedKeys, handleExpand }
}

function useSelected(props: MenuProps, dropdownContext: ɵDropdownContext | null) {
  const selectedKeys = useMergedProp(props, 'selectedKeys')

  const handleItemClick = (key: string | number, evt: Event) => {
    callEmit(props.onItemClick, key, evt)
    dropdownContext?.changeVisible?.(false)
    // dropdown 默认为 false, 其他情况默认为 true
    const selectable = props.selectable ?? !dropdownContext
    if (!selectable) {
      return
    }

    const index = selectedKeys.value.indexOf(key)
    if (index > -1) {
      if (props.multiple) {
        selectedKeys.value.splice(index, 1)
        selectedKeys.value = [...selectedKeys.value]
      }
    } else {
      selectedKeys.value = props.multiple ? [...selectedKeys.value, key] : [key]
    }
  }

  return { selectedKeys, handleItemClick }
}

function useMenuMode(props: MenuProps) {
  return computed(() => {
    const { collapsed, mode } = props
    if (collapsed && mode !== 'horizontal') {
      return 'vertical'
    }
    return mode
  })
}

function useClasses(props: MenuProps, theme: ComputedRef<string>, mode: ComputedRef<MenuMode>, isDropdown: boolean) {
  return computed(() => {
    return {
      'ix-menu': true,
      [`ix-menu-${theme.value}`]: true,
      [`ix-menu-${mode.value}`]: true,
      'ix-menu-collapsed': props.collapsed,
      'ix-menu-dropdown': isDropdown,
    }
  })
}
