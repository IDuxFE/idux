/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

interface DerivedPrimaryColorTokens {
  colorPrimaryBorder: string
  colorPrimaryBorderHover: string
  colorPrimaryBorderActive: string

  colorPrimaryHover: string
  colorPrimaryActive: string

  colorPrimaryText: string
  colorPrimaryTextHover: string
  colorPrimaryTextActive: string
  colorPrimaryIcon: string
}

interface DerivedSuccessColorTokens {
  colorSuccessBorder: string
  colorSuccessBorderHover: string
  colorSuccessBorderActive: string

  colorSuccessBg: string
  colorSuccessBgHover: string
  colorSuccessBgActive: string

  colorSuccessText: string
  colorSuccessTextHover: string
  colorSuccessTextActive: string
  colorSuccessIcon: string
}

interface DerivedWarningColorTokens {
  colorWarningBorder: string
  colorWarningBorderHover: string
  colorWarningBorderActive: string

  colorWarningBg: string
  colorWarningBgHover: string
  colorWarningBgActive: string

  colorWarningText: string
  colorWarningTextHover: string
  colorWarningTextActive: string
  colorWarningIcon: string
}

interface DerivedErrorColorTokens {
  colorErrorBorder: string
  colorErrorBorderHover: string
  colorErrorBorderActive: string

  colorErrorBg: string
  colorErrorBgHover: string
  colorErrorBgActive: string

  colorErrorText: string
  colorErrorTextHover: string
  colorErrorTextActive: string
  colorErrorIcon: string
}

interface DerivedRiskColorTokens {
  colorRiskBorder: string
  colorRiskBorderHover: string
  colorRiskBorderActive: string

  colorRiskBg: string
  colorRiskBgHover: string
  colorRiskBgActive: string

  colorRiskText: string
  colorRiskTextHover: string
  colorRiskTextActive: string
  colorRiskIcon: string
}

interface DerivedFatalColorTokens {
  colorFatalBorder: string
  colorFatalBorderHover: string
  colorFatalBorderActive: string

  colorFatalBg: string
  colorFatalBgHover: string
  colorFatalBgActive: string

  colorFatalText: string
  colorFatalTextHover: string
  colorFatalTextActive: string
  colorFatalIcon: string
}

interface DerivedInfoColorTokens {
  colorInfoBorder: string
  colorInfoBorderHover: string
  colorInfoBorderActive: string

  colorInfoBg: string
  colorInfoBgHover: string
  colorInfoBgActive: string

  colorInfoText: string
  colorInfoTextHover: string
  colorInfoTextActive: string
  colorInfoIcon: string
}

export interface DerivedColorTokens
  extends DerivedPrimaryColorTokens,
    DerivedSuccessColorTokens,
    DerivedWarningColorTokens,
    DerivedErrorColorTokens,
    DerivedRiskColorTokens,
    DerivedFatalColorTokens,
    DerivedInfoColorTokens {
  colorOffline: string
  colorOfflineBg: string
  colorOfflineText: string
}
