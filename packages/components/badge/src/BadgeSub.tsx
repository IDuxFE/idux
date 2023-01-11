/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, Transition, type VNodeChild, computed, defineComponent, normalizeClass } from 'vue'

import { badgeSubProps } from './types'

export default defineComponent({
  name: 'IxBadgeSub',
  props: badgeSubProps,
  setup(props, { slots }) {
    const mergedCountArray = computed(() =>
      props.count
        .toString()
        .split('')
        .map(char => +char),
    )
    const mergedOverflowCountArray = computed(() => props.overflowCount.toString().split(''))

    const classes = computed(() => {
      const { prefixCls, dot } = props
      return normalizeClass({
        [`${prefixCls}-sub`]: true,
        [`${prefixCls}-dot`]: dot,
        [`${prefixCls}-count`]: !dot,
        [`${prefixCls}-count-multiple`]: !dot && mergedCountArray.value.length > 1,
      })
    })

    return () => {
      const { prefixCls, dot, text } = props
      if (dot || text) {
        return (
          <Transition name={`${prefixCls}-sub`} appear>
            <sup class={classes.value} title={props.title}>
              {text && <span class={`${prefixCls}-sub-text`}>{text}</span>}
            </sup>
          </Transition>
        )
      }
      const count = props.count
      const { title = count, showZero, overflowCount } = props
      let countNode: VNodeChild
      if (slots.default) {
        countNode = slots.default()
      } else if (count !== 0 || showZero) {
        countNode = renderNumbers(prefixCls, count, overflowCount, mergedCountArray, mergedOverflowCountArray)
      }
      return (
        <Transition name={`${prefixCls}-sub`} appear>
          {countNode && (
            <sup class={classes.value} title={title as string}>
              <span class={`${prefixCls}-count-track-wrapper`}>{countNode}</span>
            </sup>
          )}
        </Transition>
      )
    }
  },
})

const chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function renderNumbers(
  prefixCls: string,
  count: number,
  overflowCount: number,
  mergedCountArray: ComputedRef<number[]>,
  mergedOverflowCountArray: ComputedRef<string[]>,
) {
  if (count > overflowCount) {
    return `${overflowCount}+`
  }
  const countArray = mergedCountArray.value
  return mergedOverflowCountArray.value.map((_, index) => {
    const currentNumber = countArray[index]
    if (currentNumber === undefined) {
      return undefined
    }
    return (
      <span key={index} class={`${prefixCls}-count-track`} style={`transform: translateY(${-currentNumber * 100}%);`}>
        {chars.map(char => {
          const classes = normalizeClass({
            [`${prefixCls}-count-unit`]: true,
            [`${prefixCls}-count-current`]: char === currentNumber,
          })
          return (
            <span key={char} class={classes}>
              {char}
            </span>
          )
        })}
      </span>
    )
  })
}
