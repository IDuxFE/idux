/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, watch } from 'vue'

import { useState } from '@idux/cdk/utils'
import { IxInput } from '@idux/components/input'

import { colorPickerPanelToken } from '../token'

export default defineComponent({
  setup() {
    const { mergedPrefixCls, hexValue, setHex } = inject(colorPickerPanelToken)!

    const [hexInput, setHexInput] = useState<string>('')

    watch(hexValue, setHexInput, { immediate: true })

    const handleInputChange = (value: string) => {
      setHexInput(value)
      setHex(value)
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-hex-editor`

      return <IxInput class={prefixCls} size="md" value={hexInput.value} onChange={handleInputChange} />
    }
  },
})
