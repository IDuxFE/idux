/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, toRaw } from 'vue'

import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { useThemeToken } from '@idux/components/theme'

import ColorPalette from './ColorPalette'
import { getThemeTokens } from '../theme'
import { useColorPickerPanelContext } from './composables/useColorPickerPanelContext'
import Editor from './editor/Editor'
import Presets from './presets/Presets'
import { colorPickerPanelToken } from './token'
import { colorPickerPanelProps } from './types'

export default defineComponent({
  name: 'IxColorPickerPanel',
  props: colorPickerPanelProps,
  setup(props, { slots }) {
    const { hashId, globalHashId, registerToken } = useThemeToken('colorPicker')
    registerToken(getThemeTokens)

    let context = inject(colorPickerPanelToken, null)

    if (!context) {
      const [valueRef, setValue] = useControlledProp(props, 'value')

      const handleChange = (value: string) => {
        const oldValue = toRaw(valueRef.value)
        setValue(value)
        callEmit(props.onChange, value, oldValue)
      }

      context = useColorPickerPanelContext(props, valueRef, handleChange)
    }

    const { mergedPrefixCls, resolvedPresets } = context

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-panel`

      return {
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [prefixCls]: true,
        [`${prefixCls}-paddingless`]: props.paddingless,
      }
    })

    const renderPanelContent = (prefixCls: string) => {
      if (slots.default) {
        return slots.default()
      }

      return (
        <div class={`${prefixCls}-inner`}>
          <ColorPalette />
          <Editor />
          {resolvedPresets.value.length ? [<div class={`${prefixCls}-separator`}></div>, <Presets />] : undefined}
        </div>
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-panel`
      return <div class={classes.value}>{renderPanelContent(prefixCls)}</div>
    }
  },
})
