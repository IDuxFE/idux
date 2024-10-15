/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, watch } from 'vue'

import { isNil } from 'lodash-es'

import { useState } from '@idux/cdk/utils'
import { IxInputNumber } from '@idux/components/input-number'

import { colorPickerPanelToken } from '../token'

export default defineComponent({
  setup() {
    const { mergedPrefixCls, rgbValue, setRgb } = inject(colorPickerPanelToken)!

    const [rInput, setRInput] = useState<number>(0)
    const [gInput, setGInput] = useState<number>(0)
    const [bInput, setBInput] = useState<number>(0)

    watch(
      rgbValue,
      v => {
        setRInput(v.r)
        setGInput(v.g)
        setBInput(v.b)
      },
      {
        immediate: true,
      },
    )

    const handleRInputChange = (value: number | null) => {
      if (isNil(value)) {
        return
      }

      setRInput(value)
      setRgb({ r: value })
    }
    const handleGInputChange = (value: number | null) => {
      if (isNil(value)) {
        return
      }

      setGInput(value)
      setRgb({ g: value })
    }
    const handleBInputChange = (value: number | null) => {
      if (isNil(value)) {
        return
      }

      setBInput(value)
      setRgb({ b: value })
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-rgb-editor`

      return (
        <div class={prefixCls}>
          <IxInputNumber
            class={[`${prefixCls}-input`, `${prefixCls}-input-r`]}
            value={rInput.value}
            precision={0}
            max={255}
            min={0}
            onChange={handleRInputChange}
          />
          <IxInputNumber
            class={[`${prefixCls}-input`, `${prefixCls}-input-g`]}
            value={gInput.value}
            precision={0}
            max={255}
            min={0}
            onChange={handleGInputChange}
          />
          <IxInputNumber
            class={[`${prefixCls}-input`, `${prefixCls}-input-b`]}
            value={bInput.value}
            precision={0}
            max={255}
            min={0}
            onChange={handleBInputChange}
          />
        </div>
      )
    }
  },
})
