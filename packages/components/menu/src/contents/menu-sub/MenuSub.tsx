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
import { useKey, useOverlayContainer } from '@idux/components/utils'

import { usePaddingLeft } from '../../composables/usePaddingLeft'
import { type MenuSubContext, menuItemGroupToken, menuSubToken, menuToken } from '../../token'
import { type MenuData, type MenuProps, type MenuSubProps, menuSubProps } from '../../types'
import InlineContent from './InlineContent'
import Label from './Label'
import OverlayContent from './OverlayContent'

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
      selectedKeys,
      expandedKeys,
      handleExpand,
    } = inject(menuToken)!
    const menuSubContext = inject(menuSubToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, false)

    const key = useKey()
    const mergedOverlayContainer = useOverlayContainer(menuProps, config, common, mergedPrefixCls)
    const mode = useMode(menuProps, menuSubContext)
    const level = menuSubContext ? menuSubContext.level + 1 : 1
    const paddingLeft = usePaddingLeft(menuProps, mode, indent, level, menuItemGroupContext)
    const isSelected = computed(() => getState(props.data!.children, selectedKeys.value))
    const { isExpanded, changeExpanded, handleMouseEvent } = useExpanded(props, key, expandedKeys, handleExpand, mode)

    const handleItemClick = () => {
      if (!props.data.disabled && mode.value !== 'inline' && !menuProps.multiple) {
        handleMouseEvent(false)
        handleExpand(key, false)
      }
    }

    provide(menuSubToken, {
      props,
      key,
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
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-sub`]: true,
        [`${prefixCls}-level-${level}`]: true,
        [`${prefixCls}-sub-disabled`]: props.data.disabled,
        [`${prefixCls}-sub-expanded`]: isExpanded.value,
        [`${prefixCls}-sub-selected`]: isSelected.value,
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

    return () => {
      const { disabled } = props.data
      const isInline = mode.value === 'inline'
      let children: VNodeTypes
      if (isInline) {
        children = [<Label></Label>, <InlineContent></InlineContent>]
      } else {
        const trigger = () => <Label></Label>
        const content = () => <OverlayContent></OverlayContent>
        children = (
          <ɵOverlay
            v-slots={{ default: trigger, content: content }}
            class={overlayClasses.value}
            autoAdjust
            container={mergedOverlayContainer.value}
            destroyOnHide={false}
            delay={menuProps.overlayDelay}
            disabled={disabled}
            offset={offset.value}
            placement={placement.value}
            transitionName={mergedTransitionName.value}
            trigger="manual"
            visible={isExpanded.value}
          />
        )
      }
      const customAdditional = menuProps.customAdditional
        ? menuProps.customAdditional({ data: props.data, index: props.index })
        : undefined
      return (
        <li
          class={classes.value}
          aria-expanded={isExpanded.value}
          aria-haspopup={!isInline}
          role="menuitem"
          {...customAdditional}
        >
          {children}
        </li>
      )
    }
  },
})

function useMode(menuProps: MenuProps, menuSubContext: MenuSubContext | null) {
  const defaultMode = menuProps.mode !== 'inline' && !!menuSubContext ? 'vertical' : menuProps.mode
  const [mode, setMode] = useState(defaultMode)

  watch(
    () => menuProps.mode,
    mode => {
      // 避免重复渲染
      nextTick(() => setMode(mode !== 'inline' && !!menuSubContext ? 'vertical' : mode))
    },
  )

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
