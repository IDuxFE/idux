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

import { renderRemoveIcon } from './RenderRemovableLabel'
import { useTransferTreeProps } from '../composables/useTransferTreeProps'
import { proTransferContext, treeTransferContext } from '../token'
import { type TreeTransferData, proTransferTreeContentProps } from '../types'
import { genFlattenedTreeKeys } from '../utils'

export default defineComponent({
  props: proTransferTreeContentProps,
  setup(props) {
    const {
      props: proTransferProps,
      slots,
      mergedPrefixCls,
      sourceContentRef,
      targetContentRef,
    } = inject(proTransferContext)!
    const { expandedKeysContext, childrenKey, loadSourceChildren, loadTargetChildren } = inject(treeTransferContext)!

    const proTransferTreeCls = computed(() => `${mergedPrefixCls.value}-tree-content`)

    const transferBindings = inject(props.isSource ? TRANSFER_SOURCE_TOKEN : TRANSFER_TARGET_TOKEN)!
    const { disabledKeys, getKey, triggerRemove } = transferBindings
    const treeProps = useTransferTreeProps(
      proTransferProps,
      transferBindings,
      expandedKeysContext!,
      childrenKey,
      props.isSource ? loadSourceChildren! : loadTargetChildren!,
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
      const showRemovableSuffix = proTransferProps.mode === 'immediate' && !props.isSource

      const treeSlots = {
        prefix: slots.prefix,
        label:
          slots.label &&
          ((params: { node: TreeTransferData }) => slots.label?.({ item: params.node, isSource: props.isSource })),
        suffix: showRemovableSuffix ? renderTreeRemovableSuffix : slots.suffix,
      }

      if (dataSource && dataSource.length > 0) {
        const contentRef = props.isSource ? sourceContentRef : targetContentRef
        return (
          <IxTree
            ref={contentRef}
            class={[prefixCls, showRemovableSuffix && `${prefixCls}-removable`]}
            style={treeStyle.value}
            v-slots={treeSlots}
            {...treeProps.value}
          />
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
