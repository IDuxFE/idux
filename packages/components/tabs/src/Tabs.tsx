/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, reactive } from 'vue'

import { isNil, isString } from 'lodash-es'

import { type VKey, callEmit, useControlledProp, useState } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import { useDataSource } from './composables/useDataSource'
import TabNavWrapper from './contents/TabNavWrapper'
import TabPane from './contents/TabPane'
import { tabsToken } from './tokens'
import { type TabsData, tabsProps } from './types'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxTabs',
  props: tabsProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('tabs')
    registerToken(getThemeTokens)

    const config = useGlobalConfig('tabs')

    const mergedPrefixCls = computed(() => `${common.prefixCls}-tabs`)
    const mergedSize = computed(() => props.size ?? config.size)

    const mergedDataSource = useDataSource(props, slots)
    const horizontalPlacement = ['top', 'bottom']
    const isHorizontal = computed(() => horizontalPlacement.includes(props.placement))

    const [selectedKey, setSelectedKey] = useControlledProp(props, 'selectedKey')
    const [closedKeys, setClosedKeys] = useState<VKey[]>([])

    // 存储每个标签的尺寸和偏移
    const navAttrs = reactive<Record<VKey, { offset: number; size: number }>>({})

    const handleTabClick = async (key: VKey, evt: Event) => {
      const result = await callEmit(props.onBeforeLeave, key, selectedKey.value)
      if (result !== false) {
        setSelectedKey(key)
        /**
         * @deprecated
         */
        callEmit(props.onTabClick, key, evt)
      }
    }

    const handleTabClose = async (key: VKey) => {
      const result = await callEmit(props.onClose, key)
      if (result !== false) {
        const currSelectedKey = selectedKey.value
        const currClosedKeys = closedKeys.value

        if (key === selectedKey.value) {
          setSelectedKey(getNextSelectedKey(mergedDataSource.value, currClosedKeys, currSelectedKey))
        }

        setClosedKeys([...currClosedKeys, key])
      }
    }

    provide(tabsToken, {
      props,
      mergedPrefixCls,
      mergedDataSource,
      isHorizontal,
      closedKeys,
      navAttrs,
      handleTabClick,
      handleTabClose,
      setSelectedKey,
    })

    const classes = computed(() => {
      const { type, placement, mode } = props
      const prefixCls = mergedPrefixCls.value
      const size = mergedSize.value
      return normalizeClass({
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-nav-${placement}`]: placement === 'top' || type === 'line',
        [`${prefixCls}-nav-${mode}`]: type === 'segment',
      })
    })

    return () => {
      const dataSource = mergedDataSource.value
      const currClosedKeys = closedKeys.value
      const currSelectedKey = selectedKey.value ?? getNextSelectedKey(dataSource, currClosedKeys)
      return (
        <div class={classes.value}>
          <TabNavWrapper selectedKey={currSelectedKey} v-slots={slots} />
          <div class={`${mergedPrefixCls.value}-pane-wrapper`}>
            {dataSource.map(data => {
              const { key, content, forceRender, customContent = 'content' } = data
              const contentSlot = isString(customContent) ? slots[customContent] : customContent
              return (
                <TabPane
                  key={key}
                  closed={currClosedKeys.includes(key)}
                  content={content}
                  forceRender={forceRender}
                  selected={key === currSelectedKey}
                  v-slots={{ content: contentSlot }}
                />
              )
            })}
          </div>
        </div>
      )
    }
  },
})

function getNextSelectedKey(dataSource: TabsData[], closedKeys: VKey[], currSelectedKey?: VKey) {
  const isValidNext = (data: TabsData) => !data.disabled && !closedKeys.includes(data.key)

  const currSelectedIndex = isNil(currSelectedKey) ? -1 : dataSource.findIndex(item => item.key === currSelectedKey)

  if (currSelectedIndex === -1) {
    return dataSource.find(isValidNext)?.key
  }

  for (let index = currSelectedIndex + 1; index < dataSource.length; index++) {
    const data = dataSource[index]
    if (isValidNext(data)) {
      return data.key
    }
  }

  for (let index = currSelectedIndex - 1; index > 0; index--) {
    const data = dataSource[index]
    if (isValidNext(data)) {
      return data.key
    }
  }

  return
}
