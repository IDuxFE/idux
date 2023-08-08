/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CascaderPanelProps } from '../types'

import { computed, defineComponent, inject, provide, toRef } from 'vue'

import { type VKey, useControlledProp } from '@idux/cdk/utils'
import { type CascaderConfig, useGlobalConfig } from '@idux/components/config'
import { useGetDisabled, useGetKey } from '@idux/components/utils'

import { useActiveState } from '../composables/useActiveState'
import { useDataSource } from '../composables/useDataSource'
import { useExpandable } from '../composables/useExpandable'
import { useIndeterminateKeys } from '../composables/useIndeterminateKeys'
import { useSearchable } from '../composables/useSearchable'
import { useSelectedLimit } from '../composables/useSelectedLimit'
import { useSelectedState } from '../composables/useSelectedState'
import { CASCADER_PANEL_DATA_TOKEN, type CascaderPanelContext, cascaderPanelToken } from '../token'
import { cascaderPanelProps } from '../types'
import OverlayOptionGroup from './OptionGroup'

export default defineComponent({
  props: cascaderPanelProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('cascader')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-cascader`)

    const cascaderPanelContext = useCascaderPanelContext(props, config)
    const { mergedData, mergedDataMap, expandedKeys, searchedData } = cascaderPanelContext

    const defaultKey = Symbol() as VKey
    const contentData = computed(() => {
      const dataSource = [{ key: defaultKey, dataSource: mergedData.value }]
      const dataMap = mergedDataMap.value
      expandedKeys.value.forEach(key => {
        const currData = dataMap.get(key)
        if (currData && currData.children) {
          dataSource.push({ key, dataSource: currData.children })
        }
      })
      return dataSource
    })

    provide(cascaderPanelToken, {
      ...cascaderPanelContext,
      props,
      config,
      slots,
      mergedPrefixCls,
    })

    return () => (
      <div class={`${mergedPrefixCls.value}-panel`}>
        {props.searchValue ? (
          <OverlayOptionGroup dataSource={searchedData.value} />
        ) : (
          contentData.value.map(item => <OverlayOptionGroup {...item} />)
        )}
      </div>
    )
  },
})

function useCascaderPanelContext(
  props: CascaderPanelProps,
  config: CascaderConfig,
): Omit<CascaderPanelContext, 'props' | 'config' | 'mergedPrefixCls' | 'slots'> {
  let dataContext = inject(CASCADER_PANEL_DATA_TOKEN, null)

  const mergedChildrenKey = computed(() => props.childrenKey ?? config.childrenKey)
  const mergedExpandIcon = computed(() => props.expandIcon ?? config.expandIcon)
  const mergedFullPath = computed(() => props.fullPath ?? config.fullPath)
  const mergedGetKey = useGetKey(props, config, 'components/cascader')
  const mergedGetDisabled = useGetDisabled(
    props as CascaderPanelProps & Required<Pick<CascaderPanelProps, 'disableData'>>,
  )
  const mergedLabelKey = computed(() => props.labelKey ?? config.labelKey)

  if (!dataContext) {
    const [selectedKeys, setSelectedKeys] = useControlledProp(props, 'selectedKeys')

    const dataSourceContext = useDataSource(props, mergedGetKey, mergedChildrenKey, mergedLabelKey, mergedFullPath)
    const { mergedDataMap } = dataSourceContext
    const selectedStateContext = useSelectedState(
      mergedDataMap,
      mergedFullPath,
      mergedGetDisabled,
      toRef(props, 'multiple'),
      toRef(props, 'strategy'),
      selectedKeys,
      setSelectedKeys,
    )
    dataContext = {
      ...dataSourceContext,
      ...selectedStateContext,
    }
  }

  const { resolvedSelectedKeys, selectedWithStrategyKeys, strategyEnabled, mergedDataMap, mergedData } = dataContext
  const selectedLimitContext = useSelectedLimit(resolvedSelectedKeys, toRef(props, 'multipleLimit'))
  const expandableContext = useExpandable(
    props,
    mergedGetKey,
    mergedGetDisabled,
    mergedChildrenKey,
    mergedLabelKey,
    mergedFullPath,
    mergedDataMap,
    resolvedSelectedKeys,
  )
  const indeterminateKeys = useIndeterminateKeys(
    mergedDataMap,
    selectedWithStrategyKeys,
    mergedGetDisabled,
    strategyEnabled,
  )
  const searchableContext = useSearchable(props, mergedData, mergedDataMap, mergedLabelKey, mergedGetDisabled)
  const activeStateContext = useActiveState(mergedDataMap)

  return {
    ...activeStateContext,
    ...dataContext,
    ...expandableContext,
    ...selectedLimitContext,
    ...searchableContext,
    mergedChildrenKey,
    mergedExpandIcon,
    mergedFullPath,
    mergedGetKey,
    mergedGetDisabled,
    mergedLabelKey,
    indeterminateKeys,
  }
}
