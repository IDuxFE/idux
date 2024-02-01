/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, provide } from 'vue'

import { Logger } from '@idux/cdk/utils'

import { createThemeProviderContext, useSharedThemeProvider } from './composables/useThemeProvider'
import { THEME_PROVIDER_TOKEN } from './token'
import { themeProviderProps } from './types'

export default defineComponent({
  name: 'IxThemeProvider',
  props: themeProviderProps,
  setup(props, { slots, attrs }) {
    let supperContext = inject(THEME_PROVIDER_TOKEN, null)

    if (props.inherit === 'all' && !supperContext) {
      if (__DEV__) {
        Logger.warn(
          'components/theme',
          `parent IxThemeProvider not found when using inherit 'all', this may cause unexpected theme errors`,
        )
      }
      supperContext = useSharedThemeProvider()
    }

    const context = createThemeProviderContext(supperContext, props)
    provide(THEME_PROVIDER_TOKEN, context)

    return () => (props.tag ? <props.tag {...attrs}>{slots.default?.()}</props.tag> : <>{slots.default?.()}</>)
  },
})
