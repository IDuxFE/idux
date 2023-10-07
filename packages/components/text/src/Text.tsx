/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Slot, computed, defineComponent, normalizeClass, shallowRef } from 'vue'

import { isObject, isString } from 'lodash-es'

import { getFirstValidNode } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxTooltip } from '@idux/components/tooltip'

import { useCopyTooltip } from './composables/useCopyTooltip'
import { useCopyable } from './composables/useCopyable'
import { useEllipsis } from './composables/useEllipsis'
import { useExpandable } from './composables/useExpandable'
import { textProps } from './types'

const measureElementStyle = {
  display: 'block',
  position: 'absolute',
  visibility: 'hidden',
  top: '-100px',
  left: '-100px',
} as const
const rowMeasureElementStyle = {
  ...measureElementStyle,
  wordBreak: 'keep-all',
  whiteSpace: 'nowrap',
}

export default defineComponent({
  name: 'IxText',
  inheritAttrs: false,
  props: textProps,
  setup(props, { attrs, slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('text')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-text`)

    const contentRef = shallowRef<HTMLElement>()
    const innerRef = shallowRef<HTMLElement>()
    const measureRef = shallowRef<HTMLElement>()
    const rowMeasureRef = shallowRef<HTMLElement>()

    const { expanded, expandable, setExpanded, expandIconRenderer } = useExpandable(props, config)
    const { copied, copy, copyIconRenderer } = useCopyable(props, config)
    const copyTooltip = useCopyTooltip(props)
    const { isSimple, isEllipsis, measureStatus, onRender, onMeasureRender, renderClampedContent } = useEllipsis(
      props,
      expandable,
      contentRef,
      innerRef,
      measureRef,
      rowMeasureRef,
    )

    const toggleExpanded = () => {
      const nextExpanded = !expanded.value
      setExpanded(nextExpanded)
    }

    const renderEllipsisNode = () => {
      return <span class={`${mergedPrefixCls.value}-ellipsis`}>{slots.ellipsis?.() ?? '...'}</span>
    }

    const renderCopyNode = () => {
      if (!props.copyable) {
        return
      }

      const node = (
        <span class={`${mergedPrefixCls.value}-copy-icon`} onClick={() => copy(getStringBySlot(slots.default))}>
          {(slots.copyIcon ?? copyIconRenderer)({ copied: copied.value })}
        </span>
      )

      if (!copyTooltip.value) {
        return node
      }

      return <IxTooltip {...(copied.value ? copyTooltip.value[1] : copyTooltip.value[0])}>{node}</IxTooltip>
    }

    const renderMeasureElement = () => {
      const { tag: Tag } = props
      const nodes = slots.default?.()

      return (
        <Tag ref={measureRef} class={`${mergedPrefixCls.value}-inner`} style={measureElementStyle}>
          {renderClampedContent(nodes, true)}
          {renderEllipsisNode()}
          {slots.suffix?.()}
          {renderCopyNode()}
        </Tag>
      )
    }
    const renderRowMeasureElement = () => {
      const { tag: Tag } = props

      return (
        <Tag ref={rowMeasureRef} class={`${mergedPrefixCls.value}-inner`} style={rowMeasureElementStyle}>
          {slots.default?.()}
        </Tag>
      )
    }

    return () => {
      const { tag: Tag, tooltip } = props
      const prefixCls = mergedPrefixCls.value
      const isNative = tooltip === 'native'
      const titleSlot = slots.title || slots.default

      const hasExpandIcon = !!slots.expandIcon || !!expandIconRenderer.value
      const expandNode =
        expandable.value && hasExpandIcon ? (
          <div class={`${prefixCls}-expand-icon`} onClick={toggleExpanded}>
            {(slots.expandIcon ?? expandIconRenderer.value)!({ expanded: expanded.value })}
          </div>
        ) : undefined

      const contentNodes = slots.default?.()

      let node = (
        <Tag
          ref={innerRef}
          class={`${prefixCls}-inner`}
          title={isNative && isEllipsis.value ? getStringBySlot(titleSlot) : undefined}
          onClick={expandable.value && !hasExpandIcon ? toggleExpanded : undefined}
          {...attrs}
        >
          {!isSimple.value && isEllipsis.value && !expanded.value && measureStatus.value === 'none'
            ? renderClampedContent(contentNodes)
            : contentNodes}
          {!isSimple.value && isEllipsis.value && !expanded.value && renderEllipsisNode()}
        </Tag>
      )

      if (isEllipsis.value && !expanded.value && tooltip && !isNative) {
        const tooltipProps = isObject(tooltip) ? tooltip : {}
        node = (
          <IxTooltip {...tooltipProps} v-slots={{ title: titleSlot }}>
            {node}
          </IxTooltip>
        )
      }

      const classes = normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-simple`]: isSimple.value,
        [`${prefixCls}-ellipsis`]: isEllipsis.value,
        [`${prefixCls}-expandable`]: expandable.value,
        [`${prefixCls}-has-expand-icon`]: hasExpandIcon,
      })

      onRender(contentNodes)

      if (measureStatus.value !== 'none') {
        onMeasureRender()
      }

      return (
        <div ref={contentRef} class={classes}>
          {node}
          {slots.suffix?.()}
          {renderCopyNode()}
          {isEllipsis.value && expandNode}
          {measureStatus.value !== 'none' && renderMeasureElement()}
          {measureStatus.value === 'preparing' && renderRowMeasureElement()}
        </div>
      )
    }
  },
})

function getStringBySlot(slot: Slot | undefined) {
  const validNode = getFirstValidNode(slot?.())
  if (!validNode) {
    return ''
  }
  const { children } = validNode
  if (isString(children)) {
    return children
  }
  return ''
}
