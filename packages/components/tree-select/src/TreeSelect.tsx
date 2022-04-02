/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TreeSelectNode } from './types'
import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { VKey } from '@idux/cdk/utils'
import type { TreeInstance } from '@idux/components/tree'

import { computed, defineComponent, normalizeClass, provide, ref, watch } from 'vue'

import { useSharedFocusMonitor } from '@idux/cdk/a11y'
import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { useGlobalConfig } from '@idux/components/config'
import { useFormAccessor, useFormElement } from '@idux/components/utils'

import { useMergeNodes } from './composables/useDataSource'
import { useGetNodeKey } from './composables/useGetNodeKey'
import { useInputState } from './composables/useInputState'
import { useOverlayProps } from './composables/useOverlayProps'
import { useSelectedState } from './composables/useSelectedState'
import Content from './content/Content'
import { treeSelectToken } from './token'
import Trigger from './trigger/Trigger'
import { treeSelectProps } from './types'

const defaultOffset: [number, number] = [0, 8]

export default defineComponent({
  name: 'IxTreeSelect',
  inheritAttrs: false,
  props: treeSelectProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tree-select`)
    const config = useGlobalConfig('treeSelect')
    const getNodeKey = useGetNodeKey(props, config)
    const searchValue = ref('')
    const [expandedKeys, setExpandedKeys] = useControlledProp(props, 'expandedKeys', () => [])
    const focusMonitor = useSharedFocusMonitor()
    const { elementRef: inputRef, focus, blur } = useFormElement<HTMLInputElement>()
    const accessor = useFormAccessor()
    const isDisabled = computed(() => accessor.disabled.value)
    const inputStateContext = useInputState(props, inputRef, accessor, searchValue)
    const { clearInput } = inputStateContext
    const { mergedNodeMap } = useMergeNodes(props, getNodeKey, config)

    const selectedStateContext = useSelectedState(props, accessor, mergedNodeMap)

    const triggerRef = ref<HTMLDivElement>()
    const { overlayRef, overlayStyle, overlayOpened, setOverlayOpened } = useOverlayProps(props, triggerRef)

    const treeRef = ref<TreeInstance>()
    const scrollTo: VirtualScrollToFn = options => {
      treeRef.value?.scrollTo(options)
    }
    const setExpandAll = (isAll: boolean) => {
      const _expendedKeys: VKey[] = []
      const _expendedNodes: TreeSelectNode[] = []
      if (isAll) {
        mergedNodeMap.value.forEach(node => {
          if (!node.isLeaf) {
            _expendedKeys.push(node.key)
            _expendedNodes.push(node.rawNode)
          }
        })
      }
      callEmit(props.onExpandedChange, _expendedKeys, _expendedNodes)
      setExpandedKeys(_expendedKeys)
    }

    expose({ focus, blur, scrollTo, setExpandAll })

    const handleNodeClick = () => {
      if (props.multiple) {
        focus()
        clearInput()
      } else {
        setOverlayOpened(false)
      }
    }

    provide(treeSelectToken, {
      props,
      slots,
      config,
      getNodeKey,
      expandedKeys,
      mergedPrefixCls,
      mergedNodeMap,
      focusMonitor,
      triggerRef,
      treeRef,
      inputRef,
      overlayOpened,
      accessor,
      isDisabled,
      searchValue,
      setExpandedKeys,
      setExpandAll,
      handleNodeClick,
      setOverlayOpened,
      ...selectedStateContext,
      ...inputStateContext,
    })

    watch(overlayOpened, opened => {
      opened ? focus() : blur()
      clearInput()
    })

    const classes = computed(() => {
      const { overlayClassName } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-overlay`]: true,
        [overlayClassName || '']: !!overlayClassName,
      })
    })

    const target = computed(() => props.target ?? config.target ?? `${mergedPrefixCls.value}-overlay-container`)

    return () => {
      const renderTrigger = () => <Trigger {...attrs}></Trigger>
      const renderContent = () => <Content />
      const overlayProps = { triggerId: attrs.id, 'onUpdate:visible': setOverlayOpened }

      return (
        <ɵOverlay
          ref={overlayRef}
          {...overlayProps}
          v-slots={{ default: renderTrigger, content: renderContent }}
          visible={overlayOpened.value}
          class={classes.value}
          style={overlayStyle.value}
          target={target.value}
          offset={defaultOffset}
          disabled={isDisabled.value || props.readonly}
          clickOutside
          placement="bottom"
          trigger="manual"
        />
      )
    }
  },
})
