/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeStyle } from 'vue'

import { type VKey, convertCssPixel } from '@idux/cdk/utils'
import { ɵEmpty } from '@idux/components/_private/empty'
import { TRANSFER_SOURCE_TOKEN, TRANSFER_TARGET_TOKEN } from '@idux/components/transfer'
import { IxTree } from '@idux/components/tree'

import { useTransferTreeProps } from '../composables/useTransferTreeProps'
import { proTransferContext } from '../token'
import { type TreeTransferData, proTransferTreeContentProps } from '../types'
import { genFlattenedTreeKeys } from '../utils'
import { renderRemoveIcon } from './RenderRemovableLabel'

export default defineComponent({
  props: proTransferTreeContentProps,
  setup(props) {
    const {
      props: proTransferProps,
      slots,
      mergedPrefixCls,
      expandedKeysContext,
      childrenKey,
      parentKeyMap,
      sourceContentRef,
      targetContentRef,
    } = inject(proTransferContext)!

    const proTransferTreeCls = computed(() => `${mergedPrefixCls.value}-tree-content`)

    const transferBindings = inject(props.isSource ? TRANSFER_SOURCE_TOKEN : TRANSFER_TARGET_TOKEN)!
    const { disabledKeys, getKey, triggerRemove } = transferBindings
    const treeProps = useTransferTreeProps(
      proTransferProps,
      transferBindings,
      expandedKeysContext!,
      parentKeyMap!,
      childrenKey,
      props.isSource,
    )

    const renderTreeRemovableSuffix = ({ node }: { node: TreeTransferData<VKey> }) => {
      const prefixCls = proTransferTreeCls.value
      const key = getKey.value(node)

      const onClick = () => {
        triggerRemove(genFlattenedTreeKeys([node], childrenKey.value, getKey.value))
      }

      return (
        <span class={`${prefixCls}-suffix`}>
          {slots.suffix?.()}
          {!disabledKeys.value.has(key) && renderRemoveIcon(prefixCls, onClick)}
        </span>
      )
    }

    const treeStyle = computed(() => {
      const scroll = proTransferProps.scroll
      if (!scroll) {
        return
      }

      return normalizeStyle({
        [scroll.fullHeight ? 'height' : 'min-height']: convertCssPixel(scroll.height),
      })
    })

    return () => {
      const dataSource = treeProps.value.dataSource
      const prefixCls = proTransferTreeCls.value

      const treeSlots = {
        prefix: slots.prefix,
        label: slots.label,
        suffix: proTransferProps.mode === 'immediate' && !props.isSource ? renderTreeRemovableSuffix : slots.suffix,
      }

      if (dataSource && dataSource.length > 0) {
        const contentRef = props.isSource ? sourceContentRef : targetContentRef
        return (
          <IxTree ref={contentRef} class={prefixCls} style={treeStyle.value} v-slots={treeSlots} {...treeProps.value} />
        )
      }

      return (
        <div class={`${mergedPrefixCls.value}-empty-wrapper`}>
          <ɵEmpty v-slots={slots} empty={proTransferProps.empty} />
        </div>
      )
    }
  },
})
