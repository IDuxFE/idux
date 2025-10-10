/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColorFormat } from '../types'

import { computed, defineComponent, inject } from 'vue'

import { isNil } from 'lodash-es'

import { IxInputNumber } from '@idux/components/input-number'
import { IxSelect, type SelectData } from '@idux/components/select'

import { colorPickerPanelToken } from '../token'
import HexEditor from './HexEditor'
import HsbEditor from './HsbEditor'
import RgbEditor from './RgbEditor'
import { percentFormatter } from '../utils'

const formatSelectDataSource: SelectData<ColorFormat>[] = [
  {
    key: 'hex',
    label: 'HEX',
  },
  {
    key: 'hsb',
    label: 'HSB',
  },
  {
    key: 'rgb',
    label: 'RGB',
  },
]

export default defineComponent({
  name: 'IxColorPickerEditor',
  setup() {
    const { mergedPrefixCls, alpha, format, setAlpha, setFormat } = inject(colorPickerPanelToken)!

    const alphaInput = computed(() => alpha.value * 100)

    const handleAlphaInputChange = (v: number | null) => {
      if (isNil(v)) {
        return
      }

      setAlpha(v / 100)
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-editor`
      const formatValue = format.value

      const SubEditorComp = formatValue === 'hex' ? HexEditor : formatValue === 'hsb' ? HsbEditor : RgbEditor

      return (
        <div class={prefixCls}>
          <IxSelect
            class={`${prefixCls}-format-select`}
            value={format.value}
            dataSource={formatSelectDataSource as SelectData[]}
            getKey="key"
            onChange={setFormat}
          />
          <SubEditorComp class={`${prefixCls}-sub`} />
          <IxInputNumber
            class={`${prefixCls}-alpha-input`}
            value={alphaInput.value}
            formatter={percentFormatter}
            precision={0}
            max={100}
            min={0}
            onChange={handleAlphaInputChange}
          />
        </div>
      )
    }
  },
})
