/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MenuContext, MenuSubContext } from '../token'
import type { MenuMode } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, VNodeTypes } from 'vue'

import { computed, defineComponent, inject, normalizeClass, provide, ref, watch } from 'vue'

import { debounce } from 'lodash-es'

import { ɵOverlay } from '@idux/components/_private'
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
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-menu-sub`)
    const mergedTransitionName = computed(() => `${common.prefixCls}-fade`)

    // menuContext must exist
    const menuContext = inject(menuToken, null)!
    const menuSubContext = inject(menuSubToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, false)

    const config = useGlobalConfig('menuSub')
    const key = useKey()
    const level = menuSubContext ? menuSubContext.level + 1 : 1
    const mode = computed(() => {
      const currMode = menuContext.mode.value
      return currMode !== 'inline' && !!menuSubContext ? 'vertical' : currMode
    })
    const paddingLeft = usePaddingLeft(mode, menuContext.indent, level, menuItemGroupContext)
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

    provide(menuSubToken, {
      props,
      slots,
      config,
      isExpanded,
      mode,
      level,
      paddingLeft,
      changeExpanded,
      handleExpand,
      handleMouseEvent,
      handleSelect,
      handleItemClick,
    })

    const placement = computed(() => (mode.value === 'vertical' ? 'rightStart' : 'bottomStart'))

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-expanded`]: isExpanded.value,
        [`${prefixCls}-selected`]: isSelected.value,
        [`${prefixCls}-${mode.value}`]: true,
      })
    })

    const offset = computed(() => props.offset ?? config.offset)

    const onClick = (evt: Event) => {
      menuContext.handleClick(key, 'sub', evt)
    }

    return () => {
      let children: VNodeTypes
      if (mode.value === 'inline') {
        children = [<Title></Title>, <InlineContent></InlineContent>]
      } else {
        const prefixCls = mergedPrefixCls.value
        const trigger = () => <Title></Title>
        const content = () => <OverlayContent></OverlayContent>
        children = (
          <ɵOverlay
            visible={isExpanded.value}
            v-slots={{ default: trigger, content: content }}
            class={`${prefixCls}-overlay`}
            autoAdjust
            destroyOnHide={false}
            delay={defaultDelay}
            disabled={props.disabled}
            offset={offset.value}
            placement={placement.value}
            target={menuContext.target.value}
            transitionName={mergedTransitionName.value}
            trigger="manual"
          />
        )
      }
      return (
        <li class={classes.value} onClick={onClick}>
          {children}
        </li>
      )
    }
  },
})

function useExpand(
  key: VKey,
  mode: ComputedRef<MenuMode>,
  menuContext: MenuContext,
  menuSubContext: MenuSubContext | null,
) {
  const isExpanded = computed(() => menuContext.expandedKeys.value.includes(key))

  const childExpanded = ref(false)
  const isHover = ref(false)

  const changeExpanded = (expanded: boolean) => {
    menuContext.handleExpand(key, expanded)
    menuSubContext?.handleExpand(key, expanded)
  }

  const handleExpand = (_: VKey, expanded: boolean) => {
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

function useSelect(key: VKey, multiple: ComputedRef<boolean>, menuSubContext: MenuSubContext | null) {
  const selectedKeys = ref<VKey[]>([])

  const isSelected = computed(() => selectedKeys.value.length > 0)
  watch(isSelected, selected => menuSubContext?.handleSelect(key, selected))

  const handleSelect = (key: VKey, selected: boolean) => {
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
