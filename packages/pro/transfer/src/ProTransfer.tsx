/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide, ref } from 'vue'

import { useGlobalConfig as useComponentGlobalConfig } from '@idux/components/config'
import { useGetKey } from '@idux/components/utils'
import { useGlobalConfig } from '@idux/pro/config'
import { useThemeToken } from '@idux/pro/theme'

import { type ProTransferContext, proTransferContext } from './token'
import { type ProTransferApis, type TransferContentInstance, proTransferProps } from './types'
import { getThemeTokens } from '../theme'
import TableTransferWrapper from './wrapper/TableTransferWrapper'
import TreeTransferWrapper from './wrapper/TreeTransferWrapper'

export default defineComponent({
  name: 'IxProTransfer',
  props: proTransferProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const { registerToken } = useThemeToken('proTransfer')
    registerToken(getThemeTokens)

    const mergedPrefixCls = computed(() => `${common.prefixCls}-transfer`)

    const transferConfig = useComponentGlobalConfig('transfer')
    const getKey = useGetKey(props, transferConfig, 'ProTransfer')

    const sourceContentRef = ref<TransferContentInstance>()
    const targetContentRef = ref<TransferContentInstance>()

    const context: ProTransferContext = {
      props,
      slots,
      getKey,
      mergedPrefixCls,
      sourceContentRef,
      targetContentRef,
    }

    provide(proTransferContext, context)

    const transferApi: ProTransferApis = {
      scrollTo: (isSource, ...params) => (isSource ? sourceContentRef : targetContentRef).value?.scrollTo?.(...params),
    }

    expose(transferApi)

    return () => (props.type === 'tree' ? <TreeTransferWrapper /> : <TableTransferWrapper />)
  },
})
