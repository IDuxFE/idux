/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { WatermarkProps } from './../types'

export type DensityData = {
  gapHorizontal: number
  gapVertical: number
  width: number
  height: number
  offsetLeft: number | undefined
  offsetTop: number | undefined
  gapContent: number
}

/**
 * 根据传入密度对渲染所需参数进行计算
 *
 * @returns 经密度二次计算的渲染参数
 */
export function calcDensity(props: WatermarkProps): DensityData {
  let { density, gapHorizontal, gapVertical, width, height, offsetLeft, offsetTop, gapContent } = props
  switch (density) {
    // low is default
    case 'mid':
      width /= 2
      height /= 2
      gapVertical /= 1.5
      gapHorizontal /= 1.5
      gapContent /= 1.5
      break
    case 'high':
      width /= 2
      height /= 2
      gapVertical /= 3
      gapHorizontal /= 2.5
      gapContent /= 2
      break
  }

  return {
    gapHorizontal: gapHorizontal,
    gapVertical: gapVertical,
    width: width,
    height: height,
    offsetLeft: offsetLeft,
    offsetTop: offsetTop,
    gapContent: gapContent,
  }
}
