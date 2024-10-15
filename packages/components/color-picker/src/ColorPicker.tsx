/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, toRef } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { type ControlTriggerProps, IxControlTrigger } from '@idux/components/control-trigger'
import { useThemeToken } from '@idux/components/theme'

import Panel from './ColorPickerPanel'
import Trigger from './ColorPickerTrigger'
import { getThemeTokens } from '../theme'
import { useColorPickerPanelContext } from './composables/useColorPickerPanelContext'
import { usePickerState } from './composables/usePickerState'
import { colorPickerProps } from './types'

export default defineComponent({
  name: 'IxColorPicker',
  inheritAttrs: false,
  props: colorPickerProps,
  setup(props, { attrs, slots }) {
    const { globalHashId, hashId, registerToken } = useThemeToken('colorPicker')
    registerToken(getThemeTokens)

    const config = useGlobalConfig('colorPicker')

    const [overlayOpened, setOverlayOpened] = useControlledProp(props, 'open', false)

    const { accessor, mergedSize, mergedStatus, focused, handleFocus, handleBlur, handleChange } = usePickerState(
      props,
      config,
    )

    const valueRef = toRef(accessor, 'value')
    const { mergedPrefixCls, format } = useColorPickerPanelContext(props, valueRef, handleChange)

    const renderTrigger = () => (
      <Trigger
        value={accessor.value}
        disabled={accessor.disabled}
        format={format.value}
        focused={focused.value}
        size={mergedSize.value}
        showText={props.showText}
        v-slots={{ default: slots.trigger }}
      ></Trigger>
    )
    const renderContent = () => <Panel v-slots={{ default: slots.panel }}></Panel>
    const overlayClass = computed(() =>
      normalizeClass([`${mergedPrefixCls.value}-overlay`, globalHashId.value, hashId.value, props.overlayClassName]),
    )

    const triggerProps = computed<ControlTriggerProps>(() => {
      return {
        autoFocus: props.autofocus,
        value: accessor.value,
        clearable: false,
        disabled: accessor.disabled,
        open: overlayOpened.value,
        overlayContainer: props.overlayContainer ?? config.overlayContainer,
        overlayContainerFallback: `.${mergedPrefixCls.value}-overlay-container`,
        overlayTabindex: props.overlayTabindex ?? config.overlayTabindex,
        readonly: props.readonly,
        size: mergedSize.value,
        status: mergedStatus.value,
        'onUpdate:open': setOverlayOpened,
        onFocus: handleFocus,
        onBlur: handleBlur,
      }
    })

    return () => (
      <IxControlTrigger
        {...triggerProps.value}
        class={`${mergedPrefixCls.value} ${globalHashId.value} ${hashId.value}`}
        overlayClassName={overlayClass.value}
        {...attrs}
        v-slots={{ trigger: renderTrigger, overlay: renderContent }}
      />
    )
  },
})
