/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import Indicator from './Indicator'
import { colorPickerTriggerProps } from './types'
import { Color, getTargetFormatColorStr } from './utils'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxColorPickerTrigger',
  props: colorPickerTriggerProps,
  setup(props, { slots }) {
    const { hashId, globalHashId, registerToken } = useThemeToken('colorPicker')
    registerToken(getThemeTokens)
    const common = useGlobalConfig('common')

    const triggerCls = computed(() => `${common.prefixCls}-color-picker-trigger`)

    const color = computed(() => new Color(props.value))
    const text = computed(() => (color.value.isValid() ? getTargetFormatColorStr(color.value, props.format) : ''))

    const classes = computed(() => {
      const prefixCls = triggerCls.value
      return {
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-${props.size}`]: props.size,
        [`${prefixCls}-focused`]: props.focused,
        [`${prefixCls}-disabled`]: props.disabled,
      }
    })

    const renderContent = () => {
      if (slots.default) {
        return slots.default({
          value: props.value,
          format: props.format,
          text: text.value,
          disabled: props.disabled,
          focused: props.focused,
          size: props.size,
        })
      }

      const indicator = <Indicator color={props.value} disabled={props.disabled} focused={props.focused} />

      if (!props.showText) {
        return indicator
      }

      return [indicator, <span class={`${triggerCls.value}-text`}>{text.value}</span>]
    }

    return () => (
      <div class={classes.value} tabindex={-1}>
        {renderContent()}
      </div>
    )
  },
})
