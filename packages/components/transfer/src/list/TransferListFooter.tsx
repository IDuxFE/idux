/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { isArray } from 'lodash-es'

import { IxPagination } from '@idux/components/pagination'

import { TRANSFER_SOURCE_TOKEN, TRANSFER_TARGET_TOKEN, transferContext } from '../token'
import { transferListFooterProps } from '../types'
import { convertToSlotParams } from '../utils'

export default defineComponent({
  props: transferListFooterProps,
  setup(props) {
    const { slots, props: transferProps, mergedPrefixCls } = inject(transferContext)!
    const transferBindings = props.isSource ? inject(TRANSFER_SOURCE_TOKEN)! : inject(TRANSFER_TARGET_TOKEN)!
    const { pagination, filteredData, filteredDataSource } = transferBindings

    const renderFooter = (prefixCls: string) => {
      if (slots.footer) {
        return slots.footer({ ...convertToSlotParams(transferBindings), isSource: props.isSource })
      }

      if (!pagination.value) {
        return
      }

      const total =
        pagination.value?.total ??
        (props.isSource && transferProps.mode === 'immediate'
          ? filteredDataSource.value.length
          : filteredData.value.length)

      return (
        <div class={`${prefixCls}-inner`}>
          <IxPagination class={`${prefixCls}-pagination`} {...pagination.value} total={total} />
        </div>
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-list-footer`

      const children = renderFooter(prefixCls)

      if (!children || (isArray(children) && children.length <= 0)) {
        return
      }

      return <div class={prefixCls}>{children}</div>
    }
  },
})
