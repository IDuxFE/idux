/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide } from 'vue'

import { type VKey, useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import { collapseToken } from './token'
import { collapseProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxCollapse',
  props: collapseProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('collapse')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-collapse`)
    const config = useGlobalConfig('collapse')
    const accordion = computed(() => props.accordion ?? config.accordion)
    const borderless = computed(() => props.borderless ?? config.borderless)
    const expandIcon = computed(() => props.expandIcon ?? config.expandIcon)
    const ghost = computed(() => props.ghost ?? config.ghost)
    const mergedSize = computed(() => props.size ?? config.size)

    const [expandedKeys, setExpandedKeys] = useControlledProp(props, 'expandedKeys', () => [])

    const handleExpand = (key: VKey) => {
      let tempKeys = [...expandedKeys.value]
      const index = tempKeys.indexOf(key)
      if (accordion.value) {
        tempKeys = index > -1 ? [] : [key]
      } else {
        index > -1 ? tempKeys.splice(index, 1) : tempKeys.push(key)
      }

      setExpandedKeys(tempKeys)
    }

    provide(collapseToken, { props, slots, mergedSize, expandedKeys, expandIcon, handleExpand })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-${mergedSize.value}`]: true,
        [`${prefixCls}-borderless`]: borderless.value,
        [`${prefixCls}-ghost`]: ghost.value,
      })
    })

    return () => <div class={classes.value}>{slots.default?.()}</div>
  },
})
