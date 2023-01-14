/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, ref } from 'vue'

import { IxTooltip } from '@idux/components/tooltip'

import { rateItemProps } from './types'

export default defineComponent({
  props: rateItemProps,
  setup(props, { slots }) {
    const liRef = ref<HTMLElement>()

    const handleClick = (evt: MouseEvent) => props.onClick(evt, liRef.value!, props.index)

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === 'Enter') {
        handleClick(evt as unknown as MouseEvent)
      }
    }

    const handleMouseMove = (evt: MouseEvent) => props.onMouseMove(evt, liRef.value!, props.index)

    const classes = computed(() => {
      const { focused, index, prefixCls, value } = props
      const itemValue = index + 1

      const isHalf = value + 0.5 >= itemValue && value < itemValue
      const isFull = !isHalf && itemValue <= value
      const isZero = !isFull && !isHalf
      return {
        [prefixCls]: true,
        [`${prefixCls}-focused`]: focused && (isHalf || value === itemValue || (index === 0 && value === 0)),
        [`${prefixCls}-full`]: isFull,
        [`${prefixCls}-half`]: isHalf,
        [`${prefixCls}-zero`]: isZero,
      }
    })

    return () => {
      const { count, disabled, index, prefixCls, tooltip, value, color } = props

      const iconNode = slots.default!()
      const itemNode = (
        <li ref={liRef} class={classes.value} style={`color: ${color}`}>
          <span
            aria-checked={value > index}
            aria-posinset={index + 1}
            aria-setsize={count}
            role="radio"
            tabindex={disabled ? -1 : 0}
            onClick={disabled ? undefined : handleClick}
            onKeydown={disabled ? undefined : handleKeyDown}
            onMousemove={disabled ? undefined : handleMouseMove}
          >
            <span class={`${prefixCls}-first`}>{iconNode}</span>
            <span class={`${prefixCls}-second`}>{iconNode}</span>
          </span>
        </li>
      )

      return tooltip ? <IxTooltip title={tooltip}>{itemNode}</IxTooltip> : itemNode
    }
  },
})
