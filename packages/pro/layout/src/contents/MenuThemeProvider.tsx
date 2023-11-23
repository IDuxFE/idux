/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent } from 'vue'

import { IxThemeProvider } from '@idux/components/theme'
import { useThemeToken } from '@idux/pro/theme'

export default defineComponent({
  inheritAttrs: true,
  setup(_, { slots }) {
    const { themeTokens } = useThemeToken('proLayout')

    return () => (
      <IxThemeProvider
        tag="div"
        inherit="all"
        tokens={{
          components: {
            menu: {
              itemColor: themeTokens.value.menuItemColor,
              itemColorHover: themeTokens.value.menuItemColorHover,
              itemColorActive: themeTokens.value.menuItemColorActive,
              itemColorDisabled: themeTokens.value.menuItemColorDisabled,
              itemGroupColor: themeTokens.value.menuItemGroupColor,

              itemBg: themeTokens.value.menuItemBg,
              itemBgHover: themeTokens.value.menuItemBgHover,
              itemBgDisabled: themeTokens.value.menuItemBgDisabled,
              itemBgActive: themeTokens.value.menuItemBgActive,
              itemGroupBg: themeTokens.value.menuItemGroupBg,

              horizontalItemColorHover: themeTokens.value.menuHorizontalItemColorHover,
              horizontalItemColorActive: themeTokens.value.menuHorizontalItemColorActive,
              horizontalItemBgHover: themeTokens.value.menuHorizontalItemBgHover,
              horizontalItemBgActive: themeTokens.value.menuHorizontalItemBgActive,

              darkItemColor: themeTokens.value.darkMenuItemColor,
              darkItemColorHover: themeTokens.value.darkMenuItemColorHover,
              darkItemColorActive: themeTokens.value.darkMenuItemColorActive,
              darkItemColorDisabled: themeTokens.value.darkMenuItemColorDisabled,
              darkItemGroupColor: themeTokens.value.darkMenuItemGroupColor,
              darkItemFontWeightActive: themeTokens.value.darkMenuItemFontWeightActive,

              darkItemBg: themeTokens.value.darkMenuItemBg,
              darkItemBgHover: themeTokens.value.darkMenuItemBgHover,
              darkItemBgActive: themeTokens.value.darkMenuItemBgActive,
              darkItemBgDisabled: themeTokens.value.darkMenuItemBgDisabled,
              darkItemGroupBg: themeTokens.value.darkMenuItemGroupBg,

              darkHorizontalItemColorHover: themeTokens.value.darkMenuHorizontalItemColorHover,
              darkHorizontalItemColorActive: themeTokens.value.darkMenuHorizontalItemColorActive,
              darkHorizontalItemBgHover: themeTokens.value.darkMenuHorizontalItemBgHover,
              darkHorizontalItemBgActive: themeTokens.value.darkMenuHorizontalItemBgActive,
            },
          },
        }}
      >
        {slots.default?.()}
      </IxThemeProvider>
    )
  },
})
