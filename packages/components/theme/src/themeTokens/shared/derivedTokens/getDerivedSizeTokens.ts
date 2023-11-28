/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BasicTokens, DerivedSizeTokens } from '../../../types'

export function getDerivedSizeTokens(basicTokens: BasicTokens): DerivedSizeTokens {
  const { spacing, height, borderRadius, screenSm, screenMd, screenLg, screenXl } = basicTokens

  const spacingSizes = {
    xxs: Math.ceil(spacing * 0.25),
    xs: Math.ceil(spacing * 0.5),
    sm: spacing,
    md: Math.ceil(spacing * 1.5),
    lg: Math.ceil(spacing * 2),
    xl: spacing * 3,
    xxl: Math.ceil(spacing * 4),
  }

  return {
    paddingSize2Xs: spacingSizes.xxs,
    paddingSizeXs: spacingSizes.xs,
    paddingSizeSm: spacingSizes.sm,
    paddingSizeMd: spacingSizes.md,
    paddingSizeLg: spacingSizes.lg,
    paddingSizeXl: spacingSizes.xl,
    paddingSize2Xl: spacingSizes.xxl,

    marginSize2Xs: spacingSizes.xxs,
    marginSizeXs: spacingSizes.xs,
    marginSizeSm: spacingSizes.sm,
    marginSizeMd: spacingSizes.md,
    marginSizeLg: spacingSizes.lg,
    marginSizeXl: spacingSizes.xl,
    marginSize2Xl: spacingSizes.xxl,

    heightXs: height * 0.5,
    heightSm: height * 0.75,
    heightMd: height,
    heightLg: height * 1.25,
    heightXl: height * 1.5,
    height2xl: height * 1.75,
    height3xl: height * 2,

    borderRadiusXs: Math.max(2, Math.floor(borderRadius / 4)),
    borderRadiusSm: Math.max(2, Math.floor(borderRadius / 2)),
    borderRadiusMd: borderRadius,
    borderRadiusLg: Math.min(8, borderRadius * 2),

    lineWidthBold: 2,
    arrowSize: 6,

    screenXsMax: screenSm - 0.01,
    screenSmMin: screenSm,
    screenSmMax: screenMd - 0.01,
    screenMdMin: screenMd,
    screenMdMax: screenLg - 0.01,
    screenLgMin: screenLg,
    screenLgMax: screenXl - 0.01,
    screenXlMin: screenXl,
  }
}
