/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, Ref, computed, ref, watchEffect } from 'vue'

import { isArray } from 'lodash-es'

import { WatermarkProps } from '../types'
import { DensityData } from '../utils'

/**
 * props->canvas->base64
 *
 * @param props
 * @param densityData results of density calculation
 */
export function useCalcBase64(props: WatermarkProps, densityData: ComputedRef<DensityData>): Ref<string> {
  // fix the problem of blurred drawing of canvas in high-definition screen
  const ratio = Math.max(window.devicePixelRatio || 1, 2)
  const rotate = computed(() => (Math.PI / 180) * props.rotate)

  const base64Ref = ref('')

  watchEffect(() => {
    if (!props.disabled) {
      const canvas = document.createElement('canvas')
      const { gapHorizontal, gapVertical, width, height, offsetLeft, offsetTop, gapContent } = densityData.value

      const canvasWidth = `${(gapHorizontal + width) * ratio}px`
      const canvasHeight = `${(gapVertical + height) * ratio}px`
      // default Center
      const canvasOffsetLeft = offsetLeft || gapHorizontal / 2
      const canvasOffsetTop = offsetTop || gapVertical / 2

      canvas.setAttribute('width', canvasWidth)
      canvas.setAttribute('height', canvasHeight)

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio)
        ctx.rotate(rotate.value)
        ctx.globalAlpha = props.opacity

        // mark content w&h
        const markWidth = width * ratio
        const markHeight = height * ratio

        const content = props.content

        if (props.type === 'image') {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.referrerPolicy = 'no-referrer'
          img.src = content as string
          img.onload = () => {
            ctx.drawImage(img, 0, 0, markWidth, markHeight)
            base64Ref.value = canvas.toDataURL()
          }
        } else if (content) {
          ctx.fillStyle = props.fontColor
          // ctx.textBaseline = 'top'
          const markSize = props.fontSize * ratio
          // pref: reduce too many param
          ctx.font = props.font.replace(/\d*\.?\d+px/, `${markSize}px/${markHeight}px`)
          if (isArray(content)) {
            // multiline text
            content.forEach((str, index) => {
              ctx.fillText(str, 0, index * markSize + gapContent * index)
            })
          } else {
            // single
            ctx.fillText(content, 0, 0)
          }
          base64Ref.value = canvas.toDataURL()
        }
      } else {
        console.error('The current browser does not support canvas.')
      }
    }
  })
  return base64Ref
}
