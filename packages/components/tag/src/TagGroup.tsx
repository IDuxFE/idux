/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide } from 'vue'

import { type VKey, callEmit, useControlledProp, useState } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxSpace } from '@idux/components/space'

import Tag from './Tag'
import { tagToken } from './token'
import { tagGroupProps } from './types'

export default defineComponent({
  name: 'IxTagGroup',
  props: tagGroupProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('tagGroup')

    const mergedPrefixCls = computed(() => `${common.prefixCls}-tag-group`)
    const mergedGap = computed(() => props.gap ?? config.gap)
    const mergedWrap = computed(() => props.wrap ?? config.wrap)

    const [mergedActiveKeys, setActiveKeys] = useControlledProp(props, 'activeKeys', () => [])
    const [mergedClosedKeys, setClosedKeys] = useState<VKey[]>([])

    const handleTagClick = (key: VKey, evt: MouseEvent) => {
      callEmit(props.onClick, key, evt)
      const activeKeys = [...mergedActiveKeys.value]
      const targetIndex = activeKeys.findIndex(currentKey => currentKey === key)
      targetIndex === -1 ? activeKeys.push(key) : activeKeys.splice(targetIndex, 1)
      setActiveKeys(activeKeys)
    }

    const handleTagClose = async (key: VKey) => {
      const result = await callEmit(props.onClose, key)
      if (result !== false) {
        const activeKeys = mergedActiveKeys.value

        const targetIndex = activeKeys.findIndex(currentKey => currentKey === key)
        if (targetIndex !== -1) {
          const tempActiveKeys = [...activeKeys]
          tempActiveKeys.splice(targetIndex, 1)
          setActiveKeys(tempActiveKeys)
        }

        setClosedKeys([...mergedClosedKeys.value, key])
      }
    }

    provide(tagToken, { props, mergedActiveKeys, mergedClosedKeys, handleTagClick, handleTagClose })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return {
        [prefixCls]: true,
        [`${prefixCls}-clickable`]: props.clickable,
      }
    })

    return () => {
      return (
        <IxSpace class={classes.value} size={mergedGap.value} wrap={mergedWrap.value}>
          {props.dataSource?.map((data, index) => {
            const { key = index, label, ...reset } = data
            return (
              <Tag v-slots={{ suffix: slots.closeIcon }} {...reset} key={key}>
                {label}
              </Tag>
            )
          }) || slots.default?.()}
        </IxSpace>
      )
    }
  },
})
