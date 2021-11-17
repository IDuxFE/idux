/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide, withKeys } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'

import { useTimePickerRender } from './UseTimePickerRender'
import { useCommonOverlayProps } from './hooks'
import { timePickerToken } from './tokens'
import { timePickerProps } from './types'

export default defineComponent({
  name: 'IxTimePicker',
  props: timePickerProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-time-picker`)
    const [visibility, setVisibility] = useControlledProp(props, 'open', false)
    const { isDisabled, renderInput, renderPanel, focus, blur, handleClose } = useTimePickerRender(props)

    provide(timePickerToken, { mergedPrefixCls })

    expose({ focus, blur })

    const changeVisible = (visible: boolean) => {
      setVisibility(visible)
      if (!visible) {
        handleClose()
      }
    }

    const overlayProps = useCommonOverlayProps(props, changeVisible)
    const handleInputConfirm = withKeys(() => changeVisible(false), ['enter'])
    const handleInput = () => changeVisible(true)
    const handleInputClick = () => changeVisible(true)
    const handleInputClear = () => changeVisible(false)

    return () => {
      const inputSlots = {
        suffix: slots.suffix,
        clearIcon: slots.clearIcon,
      }
      const renderTrigger = () => {
        const cls = visibility.value ? `${common.prefixCls}-input-focused` : ''
        return (
          <div class={mergedPrefixCls}>
            {renderInput(
              {
                ...attrs,
                class: cls,
                onInput: handleInput,
                onKeydown: handleInputConfirm,
                onClick: handleInputClick,
                onClear: handleInputClear,
              },
              inputSlots,
            )}
          </div>
        )
      }
      const renderContent = () => renderPanel({ visible: visibility.value })

      return (
        <ɵOverlay
          {...overlayProps.value}
          visible={visibility.value}
          v-slots={{ default: renderTrigger, content: renderContent }}
          disabled={isDisabled.value || props.readonly}
        />
      )
    }
  },
})
