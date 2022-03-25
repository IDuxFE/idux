/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { ɵEmpty } from '@idux/components/_private/empty'
import { IxTable } from '@idux/components/table'
import { TRANSFER_SOURCE_TOKEN, TRANSFER_TARGET_TOKEN } from '@idux/components/transfer'

import { useTransferTableProps } from '../composables/useTransferTableProps'
import { proTransferContext } from '../token'
import { proTransferTableContentProps } from '../types'

export default defineComponent({
  props: proTransferTableContentProps,
  setup(props) {
    const {
      props: proTransferProps,
      slots,
      mergedPrefixCls,
      sourceContentRef,
      targetContentRef,
    } = inject(proTransferContext)!

    const proTransferTableCls = computed(() => `${mergedPrefixCls.value}-table-content`)

    const transferBindings = inject(props.isSource ? TRANSFER_SOURCE_TOKEN : TRANSFER_TARGET_TOKEN)!
    const tableProps = useTransferTableProps(
      proTransferProps,
      slots,
      transferBindings,
      proTransferTableCls,
      props.isSource,
    )

    return () => {
      const dataSource = tableProps.value.dataSource
      const prefixCls = proTransferTableCls.value

      if (dataSource && dataSource.length > 0) {
        const contentRef = props.isSource ? sourceContentRef : targetContentRef
        return <IxTable ref={contentRef} class={prefixCls} {...tableProps.value} />
      }

      return (
        <div class={`${mergedPrefixCls.value}-empty-wrapper`}>
          <ɵEmpty v-slots={slots} empty={proTransferProps.empty} />
        </div>
      )
    }
  },
})
