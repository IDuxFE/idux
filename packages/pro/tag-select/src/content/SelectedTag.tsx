/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VKey } from '@idux/cdk/utils'

import { type PropType, computed, defineComponent, inject } from 'vue'

import { isNil } from 'lodash-es'

import { ɵHeader } from '@idux/components/_private/header'
import { IxButton } from '@idux/components/button'
import { IxControlTriggerOverlay } from '@idux/components/control-trigger'
import { IxIcon } from '@idux/components/icon'
import { IxTag } from '@idux/components/tag'

import { proTagSelectContext } from '../token'

export default defineComponent({
  props: {
    disabled: Boolean,
    prefixCls: String,
    removable: Boolean,
    value: [String, Number, Symbol] as PropType<VKey>,
  },
  setup(props, { slots }) {
    const {
      props: proTagSelectProps,
      locale,
      mergedPrefixCls,
      dataToSelect,
      selectConfirmPanelOpened,
      getTagDataByKey,
      handleTagRemove,
      handleTagSelectOk,
      handleTagSelectCancel,
    } = inject(proTagSelectContext)!
    const tagData = computed(() => {
      if (isNil(props.value)) {
        return
      }

      if (props.value === dataToSelect.value?.key) {
        return dataToSelect.value
      }

      return getTagDataByKey(props.value)
    })
    const removable = computed(() => props.removable && dataToSelect.value?.key !== props.value)

    const tagStyle = computed(() => {
      if (!tagData.value) {
        return
      }

      const {
        color: { labelColor, backgroundColor, borderColor },
      } = tagData.value
      return {
        '--ix-tag-color': labelColor,
        '--ix-tag-background-color': backgroundColor,
        '--ix-tag-border-color': borderColor ?? backgroundColor,
      }
    })

    const handleRemoveIconClick = (evt: Event) => {
      if (!props.value) {
        return
      }

      evt.preventDefault()
      evt.stopImmediatePropagation()

      handleTagRemove(props.value)
    }

    const renderConfirmOverlay = () => {
      const prefixCls = `${mergedPrefixCls.value}-select-confirm`
      return (
        <div class={prefixCls}>
          <ɵHeader class={`${prefixCls}-header`} header={proTagSelectProps.selectConfirmHeader} size="sm" />
          <div class={`${prefixCls}-content`}>{slots.selectConfirmContent?.(tagData.value)}</div>
          <div class={`${prefixCls}-footer`}>
            <IxButton mode="primary" size="xs" onClick={handleTagSelectOk}>
              {locale.ok}
            </IxButton>
            <IxButton size="xs" onClick={handleTagSelectCancel}>
              {locale.cancel}
            </IxButton>
          </div>
        </div>
      )
    }

    return () => {
      const labelSlot = slots.selectedLabel ?? slots.tagLabel

      return (
        <IxControlTriggerOverlay
          trigger="manual"
          showArrow
          visible={selectConfirmPanelOpened.value && dataToSelect.value?.key === props.value}
          v-slots={{ content: renderConfirmOverlay }}
        >
          <IxTag shape="round" class={`${mergedPrefixCls.value}-selected-tag`} style={tagStyle.value}>
            {labelSlot?.(tagData.value) ?? tagData.value?.label}
            {removable.value && (
              <IxIcon
                class={`${mergedPrefixCls.value}-selected-tag-remove-icon`}
                name="close"
                onClick={handleRemoveIconClick}
              />
            )}
          </IxTag>
        </IxControlTriggerOverlay>
      )
    }
  },
})
