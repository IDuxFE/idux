/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColorFormat, HsbColor, HsbaColor, RgbaColor } from '../types'

import { type ComputedRef, type Ref, computed, watch } from 'vue'

import { isNil } from 'lodash-es'

import { useState } from '@idux/cdk/utils'

import { Color, getTargetFormatColorStr } from '../utils'

export interface SelectedColorContext {
  selectedColor: ComputedRef<Color>
  hsbValue: ComputedRef<HsbaColor>
  hexValue: ComputedRef<string>
  rgbValue: ComputedRef<RgbaColor>
  hue: ComputedRef<number>
  saturation: ComputedRef<number>
  brightness: ComputedRef<number>
  alpha: ComputedRef<number>

  setHsb: (v: Partial<HsbColor>) => void
  setHex: (v: string, alpha?: number) => void
  setRgb: (v: Partial<RgbaColor>) => void
  setAlpha: (v: number) => void

  updateColor: (color: Color) => void
}

export function useSelectedColor(
  valueRef: Ref<string | undefined>,
  format: ComputedRef<ColorFormat>,
  handleChange: (value: string) => void,
): SelectedColorContext {
  const [selectedColor, setSelectedColor] = useState<Color>(new Color(valueRef.value))

  let tempSelectedColor: Color | undefined

  const hsbValue = computed(() => selectedColor.value.toHsb())
  const hexValue = computed(() => selectedColor.value.toHex())
  const rgbValue = computed(() => selectedColor.value.toRgb())
  const hue = computed(() => hsbValue.value.h)
  const saturation = computed(() => hsbValue.value.s)
  const brightness = computed(() => hsbValue.value.b)
  const alpha = computed(() => selectedColor.value.getAlpha())

  const updateColor = (color: Color) => {
    if (!color.isValid()) {
      return
    }

    tempSelectedColor = color

    if (tempSelectedColor.equals(hsbValue.value)) {
      setSelectedColor(tempSelectedColor)
    }

    const colorStr = getTargetFormatColorStr(color, format.value)

    handleChange(colorStr)
  }

  watch(
    valueRef,
    value => {
      let color = new Color(value || { h: 0, s: 0, b: 0, a: 0 })

      if (tempSelectedColor && color.equals(tempSelectedColor.toRgb())) {
        color = tempSelectedColor
      }

      setSelectedColor(color)
    },
    { immediate: true },
  )
  watch(format, () => {
    updateColor(selectedColor.value)
  })

  const setHsb = (v: Partial<HsbColor>) => {
    updateColor(new Color(Object.assign({ ...hsbValue.value }, v)))
  }

  const setHex = (v: string, alpha?: number) => {
    const color = new Color(v)

    if (!isNil(alpha)) {
      color.setAlpha(alpha)
    }

    updateColor(color)
  }

  const setRgb = (v: Partial<RgbaColor>) => {
    updateColor(new Color(Object.assign({ ...rgbValue.value }, v)))
  }

  const setAlpha = (v: number) => {
    const color = new Color(hsbValue.value)

    color.setAlpha(v)

    updateColor(color)
  }

  return {
    selectedColor,
    hsbValue,
    hexValue,
    rgbValue,
    hue,
    saturation,
    brightness,
    alpha,

    setHsb,
    setHex,
    setRgb,
    setAlpha,

    updateColor,
  }
}
