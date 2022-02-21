/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type ComputedRef,
  type VNodeTypes,
  computed,
  defineComponent,
  inject,
  nextTick,
  normalizeClass,
  provide,
  ref,
  watch,
} from 'vue'

import { debounce } from 'lodash-es'

import { type VKey, useState } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { useGlobalConfig } from '@idux/components/config'
import { useKey } from '@idux/components/utils'

import { usePaddingLeft } from '../../composables/usePaddingLeft'
import { type MenuSubContext, menuItemGroupToken, menuSubToken, menuToken } from '../../token'
import { type MenuData, type MenuMode, type MenuSubProps, menuSubProps } from '../../types'
import InlineContent from './InlineContent'
import Label from './Label'
import OverlayContent from './OverlayContent'

const defaultDelay: [number, number] = [0, 100]

export default defineComponent({
  name: 'MenuSub',
  props: menuSubProps,
  setup(props) {
    const common = useGlobalConfig('common')
    const mergedTransitionName = computed(() => `${common.prefixCls}-fade`)

    // menuContext must exist
    const {
      props: menuProps,
      config,
      mergedPrefixCls,
      indent,
      mode: menuMode,
      selectedKeys,
      expandedKeys,
      handleExpand,
      handleClick,
    } = inject(menuToken)!
    const menuSubContext = inject(menuSubToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, false)

    const key = useKey()
    const target = computed(() => menuProps.target ?? config.target ?? `${mergedPrefixCls.value}-overlay-container`)
    const mode = useMode(menuMode, menuSubContext)
    const level = menuSubContext ? menuSubContext.level + 1 : 1
    const paddingLeft = usePaddingLeft(menuProps, mode, indent, level, menuItemGroupContext)
    const isSelected = computed(() => getState(props.data!.children, selectedKeys.value))
    const { isExpanded, changeExpanded, handleMouseEvent } = useExpanded(props, key, expandedKeys, handleExpand, mode)

    const handleItemClick = () => {
      if (!props.data.disabled && mode.value !== 'inline' && !menuProps.multiple) {
        handleExpand(key, false)
      }
    }

    provide(menuSubToken, {
      props,
      isExpanded,
      isSelected,
      mode,
      level,
      paddingLeft,
      changeExpanded,
      handleMouseEvent,
      handleItemClick,
    })

    const placement = computed(() => (mode.value === 'vertical' ? 'rightStart' : 'bottomStart'))

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-sub`
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: props.data.disabled,
        [`${prefixCls}-expanded`]: isExpanded.value,
        [`${prefixCls}-selected`]: isSelected.value,
        [`${prefixCls}-${mode.value}`]: true,
      })
    })

    const overlayClasses = computed(() => {
      const { overlayClassName } = menuProps
      return normalizeClass({
        [`${mergedPrefixCls.value}-overlay`]: true,
        [overlayClassName || '']: !!overlayClassName,
      })
    })

    const offset = computed(() => props.data.offset ?? config.offset)

    const onClick = (evt: Event) => {
      evt.stopPropagation()
      handleClick(key, 'sub', evt)
    }

    return () => {
      const { additional, disabled } = props.data
      let children: VNodeTypes
      if (mode.value === 'inline') {
        children = [<Label></Label>, <InlineContent></InlineContent>]
      } else {
        const trigger = () => <Label></Label>
        const content = () => <OverlayContent></OverlayContent>
        children = (
          <ɵOverlay
            visible={isExpanded.value}
            v-slots={{ default: trigger, content: content }}
            class={overlayClasses.value}
            autoAdjust
            destroyOnHide={false}
            delay={defaultDelay}
            disabled={disabled}
            offset={offset.value}
            placement={placement.value}
            target={target.value}
            transitionName={mergedTransitionName.value}
            trigger="manual"
          />
        )
      }
      return (
        <li class={classes.value} {...additional} onClick={disabled ? undefined : onClick}>
          {children}
        </li>
      )
    }
  },
})

function useMode(menuMode: ComputedRef<MenuMode>, menuSubContext: MenuSubContext | null) {
  const currMode = menuMode.value
  const defaultMode = currMode !== 'inline' && !!menuSubContext ? 'vertical' : currMode
  const [mode, setMode] = useState(defaultMode)

  watch(menuMode, mode => {
    // 避免重复渲染
    nextTick(() => setMode(mode !== 'inline' && !!menuSubContext ? 'vertical' : mode))
  })

  return mode
}

function useExpanded(
  props: { data: MenuSubProps },
  key: VKey,
  expandedKeys: ComputedRef<VKey[]>,
  handleExpand: (key: VKey, expanded: boolean) => void,
  mode: ComputedRef<'vertical' | 'horizontal' | 'inline'>,
) {
  const isHover = ref(false)
  const isExpanded = computed(() => {
    // https://github.com/IDuxFE/idux/issues/636
    if (mode.value === 'inline') {
      return expandedKeys.value.includes(key)
    }
    return (isHover.value && expandedKeys.value.includes(key)) || childExpanded.value
  })
  const changeExpanded = (expanded: boolean) => handleExpand(key, expanded)
  const childExpanded = computed(() => getState(props.data.children, expandedKeys.value))
  const handleMouseEvent = debounce((value: boolean) => (isHover.value = value), 100)
  watch([mode, childExpanded, isHover], ([currMode, currChildExpanded, currIsHover]) => {
    if (currMode !== 'inline') {
      changeExpanded(currChildExpanded || currIsHover)
    }
  })
  return { isExpanded, changeExpanded, handleMouseEvent }
}

function getState(children: MenuData[] | undefined, selectedKeys: VKey[]): boolean {
  if (!children || children.length === 0) {
    return false
  }

  return children.some(item => {
    return (
      (item.key && selectedKeys.includes(item.key)) || ('children' in item && getState(item.children, selectedKeys))
    )
  })
}
