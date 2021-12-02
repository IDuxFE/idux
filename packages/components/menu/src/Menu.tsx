/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MenuData, MenuProps } from './types'
import type { ɵDropdownContext } from '@idux/components/dropdown'
import type { Slots, VNode } from 'vue'

import { computed, defineComponent, inject, normalizeClass, provide, watch } from 'vue'

import { Logger, VKey, callEmit, convertCssPixel, useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { ɵDropdownToken } from '@idux/components/dropdown'

import MenuDivider from './MenuDivider'
import MenuItem from './MenuItem'
import MenuItemGroup from './MenuItemGroup'
import MenuSub from './menu-sub/MenuSub'
import { menuToken } from './token'
import { menuProps } from './types'
export default defineComponent({
  name: 'IxMenu',
  props: menuProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-menu`)
    const config = useGlobalConfig('menu')
    // TODO remove 'sub'
    const target = computed(() => props.target ?? config.target ?? `${mergedPrefixCls.value}-sub-overlay-container`)
    const indent = computed(() => props.indent ?? config.indent)
    const mode = computed(() => {
      const { collapsed, mode } = props
      return collapsed && mode !== 'horizontal' ? 'vertical' : mode
    })
    const multiple = computed(() => props.multiple)
    const theme = computed(() => props.theme ?? config.theme)

    const dropdownContext = inject(ɵDropdownToken, null)
    const { expandedKeys, handleExpand } = useExpanded(props)
    const { selectedKeys, handleSelected } = useSelected(props, dropdownContext)

    const handleClick = (key: VKey, type: 'item' | 'itemGroup' | 'sub', evt: Event) => {
      if (type === 'item') {
        handleSelected(key)
      }
      callEmit(props.onClick, { key, type, event: evt })
    }

    provide(menuToken, {
      mergedPrefixCls,
      target,
      indent,
      mode,
      multiple,
      theme,
      expandedKeys,
      handleExpand,
      selectedKeys,
      handleClick,
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${theme.value}`]: true,
        [`${prefixCls}-${mode.value}`]: true,
        [`${prefixCls}-collapsed`]: props.collapsed,
        [`${prefixCls}-dropdown`]: !!dropdownContext,
      })
    })

    const style = computed(() => {
      if (!props.collapsed || mode.value === 'horizontal') {
        return undefined
      }
      return { width: convertCssPixel(props.collapsedWidth ?? config.collapsedWidth) }
    })

    return () => {
      const { dataSource } = props
      const children = dataSource ? coverChildren(dataSource) : slots.default?.()
      return (
        <ul class={classes.value} style={style.value}>
          {children}
        </ul>
      )
    }
  },
})

function useExpanded(props: MenuProps) {
  const [expandedKeys, setExpandedKeys] = useControlledProp(props, 'expandedKeys', () => [])

  const handleExpand = (key: VKey, expanded: boolean) => {
    const index = expandedKeys.value.indexOf(key)
    if (expanded) {
      index === -1 && setExpandedKeys([...expandedKeys.value, key])
    } else {
      if (index > -1) {
        expandedKeys.value.splice(index, 1)
        setExpandedKeys([...expandedKeys.value])
      }
    }
  }

  let cachedExpandedKeys: Array<VKey> = []
  watch(
    () => props.collapsed,
    collapsed => {
      if (collapsed) {
        cachedExpandedKeys = [...expandedKeys.value]
        setExpandedKeys([])
      } else {
        setExpandedKeys(cachedExpandedKeys)
        cachedExpandedKeys = []
      }
    },
  )

  return { expandedKeys, handleExpand }
}

function useSelected(props: MenuProps, dropdownContext: ɵDropdownContext | null) {
  const [selectedKeys, setSelectedKeys] = useControlledProp(props, 'selectedKeys', () => [])

  const handleSelected = (key: VKey) => {
    dropdownContext?.setVisibility?.(false)
    // dropdown 默认为 false, 其他情况默认为 true
    const selectable = props.selectable ?? !dropdownContext
    if (!selectable) {
      return
    }

    const index = selectedKeys.value.indexOf(key)
    if (index > -1) {
      if (props.multiple) {
        selectedKeys.value.splice(index, 1)
        setSelectedKeys([...selectedKeys.value])
      }
    } else {
      setSelectedKeys(props.multiple ? [...selectedKeys.value, key] : [key])
    }
  }

  return { selectedKeys, handleSelected }
}

function coverChildren(data?: MenuData[]) {
  if (!data || data.length === 0) {
    return []
  }

  const nodes: VNode[] = []
  data.forEach(item => {
    const { type, additional, children, slots, ...rest } = item as MenuData & { children?: MenuData[]; slots?: Slots }
    if (type === 'item') {
      nodes.push(<MenuItem v-slots={slots} {...rest} {...additional}></MenuItem>)
    } else if (type === 'divider') {
      nodes.push(<MenuDivider {...rest} {...additional}></MenuDivider>)
    } else if (type === 'itemGroup') {
      nodes.push(
        <MenuItemGroup v-slots={slots} {...rest} {...additional}>
          {coverChildren(children)}
        </MenuItemGroup>,
      )
    } else if (type === 'sub') {
      nodes.push(
        <MenuSub v-slots={slots} {...rest} {...additional}>
          {coverChildren(children)}
        </MenuSub>,
      )
    } else {
      __DEV__ && Logger.warn('components/menu', `type [${type}] not supported`)
    }
  })
  return nodes
}
