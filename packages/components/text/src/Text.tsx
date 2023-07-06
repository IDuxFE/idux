/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Slot, computed, defineComponent, normalizeClass, shallowRef } from 'vue'

import { isObject, isString, throttle } from 'lodash-es'

import { useClipboard } from '@idux/cdk/clipboard'
import { getFirstValidNode, useState } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { IxTooltip } from '@idux/components/tooltip'

import { textProps } from './types'

export default defineComponent({
  name: 'IxText',
  inheritAttrs: false,
  props: textProps,
  setup(props, { attrs, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-text`)

    const elementRef = shallowRef<HTMLElement>()
    const [mergedDisabled, setDisabled] = useState(true)
    const [mergedEntered, setEntered] = useState(false)
    const [mergedExpanded, setExpanded] = useState(false)
    const [mergedCopied, setCopied] = useState(false)

    const { copy } = useClipboard()

    const checkDisabled = () => {
      const element = elementRef.value
      if (mergedExpanded.value || !element) {
        return true
      }

      const { lineClamp } = props
      if (lineClamp !== undefined) {
        return element.scrollHeight <= element.offsetHeight
      } else {
        const currOverflow = element.style.overflow
        if (!currOverflow || currOverflow === 'visible') {
          element.style.overflow = 'hidden'
        }
        const isOverflowing = element.clientWidth < element.scrollWidth || element.clientHeight < element.scrollHeight
        element.style.overflow = currOverflow
        return !isOverflowing
      }
    }

    const onClick = () => {
      const nextExpanded = !mergedExpanded.value
      setExpanded(nextExpanded)
      setDisabled(nextExpanded)
    }

    const onMouseEnter = () => {
      setEntered(true)
      setDisabled(checkDisabled())
    }

    const onCopy = throttle((text: string) => {
      if (!text || mergedCopied.value) {
        return
      }
      copy(text).then(success => {
        if (success) {
          setCopied(true)
          setTimeout(() => setCopied(false), 3000)
        }
      })
    }, 300)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const { lineClamp } = props
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-line-clamp`]: lineClamp !== undefined,
      })
    })

    const style = computed(() => {
      const { expandable, lineClamp } = props
      const expanded = mergedExpanded.value
      return {
        cursor: expandable ? 'pointer' : '',
        'text-overflow': !expanded && lineClamp === undefined ? 'ellipsis' : '',
        '-webkit-line-clamp': !expanded && lineClamp !== undefined ? lineClamp : '',
      }
    })

    return () => {
      const { tag: Tag, tooltip, expandable, copyable } = props
      const prefixCls = mergedPrefixCls.value
      const disabled = mergedDisabled.value
      const entered = mergedEntered.value
      const isNative = tooltip === 'native'
      const titleSlot = slots.title || slots.default

      let node = (
        <Tag
          ref={elementRef}
          class={classes.value}
          style={style.value}
          title={isNative && !disabled ? getStringBySlot(titleSlot) : undefined}
          onClick={expandable ? onClick : undefined}
          onMouseenter={onMouseEnter}
          {...attrs}
        >
          {slots.default?.()}
        </Tag>
      )

      if (!disabled && entered && tooltip && !isNative) {
        const tooltipProps = isObject(tooltip) ? { ...tooltip, disabled } : { disabled }
        node = (
          <IxTooltip {...tooltipProps} v-slots={{ title: titleSlot }}>
            {node}
          </IxTooltip>
        )
      }

      if (copyable) {
        const copied = mergedCopied.value
        const copyIcon = slots.copyIcon ? slots.copyIcon({ copied }) : <IxIcon name={copied ? 'check' : 'copy'} />
        node = (
          <div class={`${prefixCls}-wrapper`}>
            {node}
            <span class={`${prefixCls}-copy-icon`} onClick={() => onCopy(getStringBySlot(slots.default))}>
              {copyIcon}
            </span>
          </div>
        )
      }

      return node
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
