/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { IxButton } from '@idux/components/button'
import { IxCheckbox } from '@idux/components/checkbox'
import { IxIcon } from '@idux/components/icon'
import { IxPopover } from '@idux/components/popover'
import { IxSpace } from '@idux/components/space'

import LayoutToolContent from './contents/LayoutToolContent'
import { proTableToken } from './token'
import { ProTableColumn } from './types'

export default defineComponent({
  name: 'IxProTableLayoutTool',
  setup(_, { slots }) {
    const { locale, mergedPrefixCls, mergedColumns, resetColumns } = inject(proTableToken)!

    // 只需要判断第一层的即可
    const hiddenColumns = computed(() => mergedColumns.value.filter(column => column.visible === false))
    const handleCheckAll = (checked: boolean) => loopColumns(mergedColumns.value, column => (column.visible = checked))

    const renderHeader = () => {
      const settingLength = mergedColumns.value.length
      const hiddenLength = hiddenColumns.value.length
      const checked = hiddenLength === 0 && settingLength !== 0
      const indeterminate = hiddenLength > 0 && hiddenLength !== settingLength

      const { title, reset } = locale.table.layout
      return (
        <IxSpace block align="center" justify="space-between">
          <IxCheckbox checked={checked} indeterminate={indeterminate} label={title} onChange={handleCheckAll} />
          <IxButton size="sm" mode="link" onClick={resetColumns}>
            {reset}
          </IxButton>
        </IxSpace>
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-layout-tool`
      const popoverSlots = {
        header: () => renderHeader(),
        content: () => <LayoutToolContent />,
      }
      const triggerNode = slots.default ? (
        slots.default()
      ) : (
        <span class={`${prefixCls}-trigger`} title={locale.table.layout.title}>
          <IxIcon name="setting" />
        </span>
      )
      return (
        <IxPopover v-slots={popoverSlots} class={prefixCls} placement="bottomEnd" trigger="click">
          {triggerNode}
        </IxPopover>
      )
    }
  },
})

function loopColumns(columns: ProTableColumn[] | undefined, cb: (column: ProTableColumn) => void) {
  if (!columns || columns.length === 0) {
    return
  }
  columns.forEach(column => {
    cb(column)
    if ('children' in column) {
      loopColumns(column.children!, cb)
    }
  })
}
