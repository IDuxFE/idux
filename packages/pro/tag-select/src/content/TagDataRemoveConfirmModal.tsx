/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { IxModal, type ModalProps } from '@idux/components/modal'

import { proTagSelectContext } from '../token'

export default defineComponent({
  setup(_, { slots }) {
    const {
      locale,
      props: proTagSelectProps,
      mergedPrefixCls,
      modalVisible,
      dataToRemove,
      handleTagDataRemoveOk,
      handleTagDataRemoveCancel,
      handleTagDataRemoveModalAfterClose,
    } = inject(proTagSelectContext)!

    const modalProps = computed<ModalProps>(() => {
      return {
        header: proTagSelectProps.removeConfirmHeader ?? locale.removeTag,
        title: proTagSelectProps.removeConfirmTitle,
        closable: true,
        visible: modalVisible.value,
        onAfterClose: handleTagDataRemoveModalAfterClose,
        onClose: handleTagDataRemoveCancel,
        onOk: handleTagDataRemoveOk,
        onCancel: handleTagDataRemoveCancel,
      }
    })

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-remove-confirm-modal`

      const modalSlots = {
        title: slots.removeConfirmTitle
          ? () => (dataToRemove.value ? slots.removeConfirmTitle!(dataToRemove.value) : undefined)
          : undefined,
        default: slots.removeConfirmContent
          ? () => (dataToRemove.value ? slots.removeConfirmContent!(dataToRemove.value) : undefined)
          : undefined,
      }

      return <IxModal type="confirm" class={prefixCls} v-slots={modalSlots} {...modalProps.value} />
    }
  },
})
