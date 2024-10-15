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
import { percentFormatter } from '../utils'

export default defineComponent({
  setup() {
    const { mergedPrefixCls, hsbValue, setHsb } = inject(colorPickerPanelToken)!

    const [hInput, setHInput] = useState<number>(0)
    const [sInput, setSInput] = useState<number>(0)
    const [bInput, setBInput] = useState<number>(0)

    watch(
      hsbValue,
      v => {
        setHInput(v.h)
        setSInput(v.s * 100)
        setBInput(v.b * 100)
      },
      {
        immediate: true,
      },
    )

    const handleHInputChange = (value: number | null) => {
      if (isNil(value)) {
        return
      }

      setHInput(value)
      setHsb({ h: value })
    }
    const handleSInputChange = (value: number | null) => {
      if (isNil(value)) {
        return
      }

      setSInput(value)
      setHsb({ s: value / 100 })
    }
    const handleBInputChange = (value: number | null) => {
      if (isNil(value)) {
        return
      }

      setBInput(value)
      setHsb({ b: value / 100 })
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-hsb-editor`

      return (
        <div class={prefixCls}>
          <IxInputNumber
            class={[`${prefixCls}-input`, `${prefixCls}-input-h`]}
            value={hInput.value}
            precision={0}
            max={360}
            min={0}
            onChange={handleHInputChange}
          />
          <IxInputNumber
            class={[`${prefixCls}-input`, `${prefixCls}-input-s`]}
            value={sInput.value}
            formatter={percentFormatter}
            precision={0}
            max={100}
            min={0}
            onChange={handleSInputChange}
          />
          <IxInputNumber
            class={[`${prefixCls}-input`, `${prefixCls}-input-b`]}
            value={bInput.value}
            formatter={percentFormatter}
            precision={0}
            max={100}
            min={0}
            onChange={handleBInputChange}
          />
        </div>
      )
    }
  },
})
