/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass } from 'vue'

import { convertNumber, isNumeric } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import BadgeSub from './BadgeSub'
import { badgeProps } from './types'

export default defineComponent({
  name: 'IxBadge',
  props: badgeProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('badge')

    const mergedPrefixCls = computed(() => `${common.prefixCls}-badge`)
    const mergedDot = computed(() => props.dot ?? config.dot)
    const mergedShowZero = computed(() => props.showZero ?? config.showZero)
    const mergedCount = computed(() => Math.max(0, convertNumber(props.count, 0)))
    const mergedOverflowCount = computed(() =>
      Math.max(0, convertNumber(props.overflowCount ?? config.overflowCount, Number.MAX_VALUE)),
    )
    // 兼容之前的用法
    const mergedText = computed(() => {
      const { count } = props
      return isNumeric(count) ? undefined : (count as string)
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${props.status}`]: true,
      })
    })

    /**
     * @deprecated please use `--ix-badge-background-color` instead
     */
    const style = computed(() => {
      const { color } = props
      return color ? `background-color: ${color}` : undefined
    })

    return () => {
      const dot = mergedDot.value
      const prefixCls = mergedPrefixCls.value
      const contentNode = slots.default && slots.default()
      return (
        <span class={classes.value}>
          {dot === 'inline' && <span class={`${prefixCls}-dot`} style={style.value}></span>}
          {contentNode && <span class={`${prefixCls}-content`}>{contentNode}</span>}
          {dot !== 'inline' && (
            <BadgeSub
              v-slots={{ default: slots.count }}
              style={style.value}
              count={mergedCount.value}
              dot={dot}
              overflowCount={mergedOverflowCount.value}
              prefixCls={prefixCls}
              showZero={mergedShowZero.value}
              status={props.status}
              text={mergedText.value}
              title={props.title}
            />
          )}
        </span>
      )
    }
  },
})
