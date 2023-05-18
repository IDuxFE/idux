/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, onUnmounted, watch } from 'vue'

import { type VKey, callEmit } from '@idux/cdk/utils'
import { CascaderPanelProps, IxCascaderPanel } from '@idux/components/cascader'

import PanelFooter from './PanelFooter'
import { proSearchContext } from '../token'
import { proSearchCascaderPanelProps } from '../types'

export default defineComponent({
  props: proSearchCascaderPanelProps,
  setup(props, { slots }) {
    const { mergedPrefixCls, locale } = inject(proSearchContext)!

    watch(
      () => props.searchValue,
      searchValue => {
        callEmit(props.onSearch, searchValue ?? '')
      },
    )
    onUnmounted(() => {
      if (props.searchValue) {
        callEmit(props.onSearch, '')
      }
    })

    const changeSelected = (keys: VKey[] | VKey[] | VKey[][]) => {
      callEmit(props.onChange, props.multiple ? keys : [keys])
    }

    const handleConfirm = () => {
      callEmit(props.onConfirm)
    }
    const handleCancel = () => {
      callEmit(props.onCancel)
    }

    const renderFooter = () => {
      if (!props.multiple || !props.showFooter) {
        return
      }

      return (
        <PanelFooter
          prefixCls={mergedPrefixCls.value}
          locale={locale}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-cascader-panel`
      const {
        dataSource,
        disableData,
        expandIcon,
        expandTrigger,
        fullPath,
        loadChildren,
        multiple,

        searchValue,
        searchFn,
        separator,
        strategy,
        virtual,

        onExpand,
        onLoaded,
      } = props
      const panelProps = {
        selectedKeys: props.value,
        dataSource,
        disableData,
        childrenKey: 'children',
        getKey: 'key',
        expandIcon,
        expandTrigger,
        fullPath,
        loadChildren,
        labelKey: 'label',
        multiple,
        searchFn,
        searchValue,
        separator,
        strategy,
        virtual,
        onExpand,
        onLoaded,
        'onUpdate:selectedKeys': changeSelected,
      } as CascaderPanelProps

      return (
        <div class={prefixCls} tabindex={-1} onMousedown={evt => evt.preventDefault()}>
          <IxCascaderPanel {...panelProps} v-slots={slots} />
          {renderFooter()}
        </div>
      )
    }
  },
})
