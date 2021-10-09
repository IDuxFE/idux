/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MenuContext, MenuSubContext } from '../token'
import type { MenuMode, MenuSubProps } from '../types'
import type { ComputedRef, Ref, VNodeTypes } from 'vue'

import { computed, defineComponent, inject, provide, ref, watch } from 'vue'

import { debounce } from 'lodash-es'

import { IxOverlay } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import { useKey } from '@idux/components/utils'

import { menuItemGroupToken, menuSubToken, menuToken } from '../token'
import { menuSubProps } from '../types'
import { usePaddingLeft } from '../usePaddingLeft'
import InlineContent from './InlineContent'
import OverlayContent from './OverlayContent'
import Title from './Title'

const defaultDelay: [number, number] = [0, 100]

export default defineComponent({
  name: 'IxMenuSub',
  props: menuSubProps,
  setup(props, { slots }) {
    // menuContext must exist
    const menuContext = inject(menuToken, null)!
    const menuSubContext = inject(menuSubToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, false)

    const config = useGlobalConfig('menuSub')
    const key = useKey()
    const level = menuSubContext ? menuSubContext.level + 1 : 1
    const mode = useMode(menuContext.mode, !!menuSubContext)
    const { isExpanded, changeExpanded, handleExpand, handleMouseEvent } = useExpand(
      key,
      mode,
      menuContext,
      menuSubContext,
    )
    const { isSelected, handleSelect } = useSelect(key, menuContext.multiple, menuSubContext)
    const handleItemClick = () => {
      if (!props.disabled && mode.value !== 'inline' && !menuContext.multiple.value) {
        changeExpanded(false)
      }
    }
    const paddingLeft = usePaddingLeft(mode, menuContext.indent, level, menuItemGroupContext)

    provide(menuSubToken, {
      props,
      slots,
      config,
      isExpanded,
      changeExpanded,
      handleExpand,
      handleMouseEvent,
      handleSelect,
      handleItemClick,
      level,
      mode,
      paddingLeft,
      theme: menuContext.theme,
    })

    const placement = computed(() => (mode.value === 'vertical' ? 'rightStart' : 'bottomStart'))

    const classes = useClasses(props, mode, isExpanded, isSelected)
    const offset = computed(() => props.offset ?? config.offset)

    return () => {
      let children: VNodeTypes
      if (mode.value === 'inline') {
        children = [<Title></Title>, <InlineContent></InlineContent>]
      } else {
        const trigger = () => <Title></Title>
        const content = () => <OverlayContent></OverlayContent>
        children = (
          <IxOverlay
            visible={isExpanded.value}
            v-slots={{ default: trigger, content: content }}
            class="ix-menu-sub-overlay"
            autoAdjust
            destroyOnHide={false}
            delay={defaultDelay}
            disabled={props.disabled}
            offset={offset.value}
            placement={placement.value}
            showArrow={false}
            target="ix-menu-container"
            transitionName="ix-fade"
            trigger="manual"
          />
        )
      }
      return <li class={classes.value}>{children}</li>
    }
  },
})

function useClasses(
  props: MenuSubProps,
  mode: ComputedRef<MenuMode>,
  isExpanded: Ref<boolean>,
  isSelected: Ref<boolean>,
) {
  return computed(() => {
    return {
      'ix-menu-sub': true,
      'ix-menu-sub-disabled': props.disabled,
      'ix-menu-sub-expanded': isExpanded.value,
      'ix-menu-sub-selected': isSelected.value,
      [`ix-menu-sub-${mode.value}`]: true,
    }
  })
}

function useMode(menuMode: ComputedRef<MenuMode>, hasParentMenuSub: boolean) {
  return computed(() => {
    const currMode = menuMode.value
    if (currMode !== 'inline' && hasParentMenuSub) {
      return 'vertical'
    }
    return currMode
  })
}

function useExpand(
  key: string | number,
  mode: ComputedRef<MenuMode>,
  menuContext: MenuContext,
  menuSubContext: MenuSubContext | null,
) {
  const isExpanded = computed(() => menuContext.expandedKeys.value.includes(key))

  const childExpanded = ref(false)
  const isHover = ref(false)

  const changeExpanded = (expanded: boolean) => {
    menuContext.handleExpand(key, expanded)
    if (menuSubContext) {
      menuSubContext.handleExpand(key, expanded)
    }
  }

  const handleExpand = (_: string | number, expanded: boolean) => {
    childExpanded.value = expanded
  }

  const handleMouseEvent = debounce((value: boolean) => (isHover.value = value), 100)

  watch([mode, childExpanded, isHover], ([currMode, currChildExpanded, currIsHover]) => {
    if (currMode !== 'inline') {
      changeExpanded(currChildExpanded || currIsHover)
    }
  })

  return { isExpanded, changeExpanded, handleExpand, handleMouseEvent }
}

function useSelect(key: string | number, multiple: ComputedRef<boolean>, menuSubContext: MenuSubContext | null) {
  const selectedKeys = ref<Array<string | number>>([])

  const isSelected = computed(() => selectedKeys.value.length > 0)
  watch(isSelected, selected => menuSubContext?.handleSelect(key, selected))

  const handleSelect = (key: string | number, selected: boolean) => {
    const index = selectedKeys.value.indexOf(key)
    if (selected && index > -1) {
      return
    }

    if (selected) {
      multiple.value ? selectedKeys.value.push(key) : (selectedKeys.value = [key])
    } else if (index > -1) {
      multiple.value ? selectedKeys.value.splice(index, 1) : (selectedKeys.value = [])
    }
  }

  return { isSelected, handleSelect }
}
