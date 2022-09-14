/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type VNode, computed, defineComponent, inject, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { ɵInput } from '@idux/components/_private/input'

import { cascaderToken } from '../token'
import OverlayOptionGroup from './OverlayOptionGroup'

export default defineComponent({
  setup() {
    const {
      props,
      mergedPrefixCls,
      mergedClearIcon,
      mergedData,
      mergedDataMap,
      searchedData,
      expandedKeys,
      inputValue,
      setInputValue,
      updateOverlay,
    } = inject(cascaderToken)!

    const contentData = computed(() => {
      const dataSource = [mergedData.value]
      const dataMap = mergedDataMap.value
      expandedKeys.value.forEach(key => {
        const currData = dataMap.get(key)
        if (currData && currData.children) {
          dataSource.push(currData.children)
        }
      })
      return dataSource
    })

    watch([() => contentData.value.length, inputValue], () => {
      updateOverlay()
    })

    const handleInput = (evt: Event) => {
      const { value } = evt.target as HTMLInputElement
      setInputValue(value)
      props.searchable && callEmit(props.onSearch, value)
    }
    const handleClear = () => setInputValue('')

    return () => {
      const { overlayRender } = props
      const searchValue = inputValue.value
      const prefixCls = mergedPrefixCls.value
      const children: VNode[] = []

      if (props.searchable === 'overlay') {
        children.push(
          <div key="__search-wrapper" class={`${prefixCls}-overlay-search-wrapper`}>
            <ɵInput
              clearable
              clearIcon={mergedClearIcon.value}
              clearVisible={!!searchValue}
              size="sm"
              suffix="search"
              value={searchValue}
              onClear={handleClear}
              onInput={handleInput}
            />
          </div>,
        )
      }

      const contentNode = searchValue ? (
        <OverlayOptionGroup dataSource={searchedData.value} />
      ) : (
        contentData.value.map((dataSource, index) => <OverlayOptionGroup key={index} dataSource={dataSource} />)
      )
      children.push(
        <div key="__content" class={`${prefixCls}-overlay-content`}>
          {contentNode}
        </div>,
      )

      return <div>{overlayRender ? overlayRender(children) : children}</div>
    }
  },
})
