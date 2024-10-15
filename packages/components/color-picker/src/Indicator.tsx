/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import { colorPickerIndicatorProps } from './types'
import { Color, isBrightColor } from './utils'
import { getThemeTokens } from '../theme'

export default defineComponent({
  name: 'IxColorPickerIndicator',
  props: colorPickerIndicatorProps,
  setup(props) {
    const { hashId, globalHashId, registerToken } = useThemeToken('colorPicker')
    const { themeTokens } = useThemeToken()

    registerToken(getThemeTokens)

    const { prefixCls } = useGlobalConfig('common')

    const indicatorPrefixCls = computed(() => `${prefixCls}-color-picker-indicator`)

    const color = computed(() => new Color(props.color))
    const bgColorToken = computed(() => themeTokens.value.colorBg)
    const isBlank = computed(() => !props.color || !color.value.isValid())
    const isBright = computed(() => isBrightColor(props.color, bgColorToken.value))

    const classes = computed(() => {
      const indicatorCls = indicatorPrefixCls.value

      return {
        [indicatorCls]: true,
        [globalHashId.value]: !!globalHashId.value,
        [hashId.value]: !!hashId.value,
        [`${indicatorCls}-hoverable`]: props.hoverable,
        [`${indicatorCls}-with-box-shadow`]: props.showBoxShadow,
        [`${indicatorCls}-disabled`]: props.disabled,
        [`${indicatorCls}-focused`]: props.focused,
        [`${indicatorCls}-blank`]: isBlank.value,
        [`${indicatorCls}-bright`]: isBright.value,
        [`${indicatorCls}-checked`]: !!props.checked,
      }
    })

    const innerStyle = computed(() => {
      if (isBlank.value) {
        return
      }

      return {
        backgroundColor: color.value.toRgbString(),
      }
    })

    return () => (
      <div class={classes.value}>
        <div class={`${indicatorPrefixCls.value}-inner`} style={innerStyle.value}></div>
      </div>
    )
  },
})
