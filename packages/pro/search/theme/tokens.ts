/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface ProSearchThemeTokens {
  heightSm: number
  heightMd: number
  containerPaddingSm: number
  containerPaddingMd: number
  tagGapSm: number
  tagGapMd: number
  quickSelectPaddingSm: string | number
  quickSelectPaddingMd: string | number

  tagColor: string
  tagBgColor: string
  tagColorDisabled: string
  tagBgColorDisabled: string

  tagNameColor: string

  segmentPaddingHorizontal: number
  segmentMaxWidth: number

  namePanelMinWidth: number
  operatorPanelMinWidth: number
  selectPanelMinWidth: number
  treeSelectPanelMinWidth: number
  treeSelectPanelMaxWidth: number
}
