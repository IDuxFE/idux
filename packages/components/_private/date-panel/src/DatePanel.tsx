/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide } from 'vue'

import { useDateConfig, useGlobalConfig } from '@idux/components/config'
import { getLocale } from '@idux/components/i18n'

import { useActiveDate } from './composables/useActiveDate'
import { useActiveType } from './composables/useActiveType'
import { useMaxIndex } from './composables/useMaxIndex'
import PanelBody from './panel-body/PanelBody'
import PanelHeader from './panel-header/PanelHeader'
import { datePanelToken } from './token'
import { datePanelProps } from './types'

export default defineComponent({
  props: datePanelProps,
  setup(props, { slots }) {
    const locale = getLocale('datePicker')
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-date-panel`)
    const dateConfig = useDateConfig()
    const { activeType, setActiveType } = useActiveType(props)
    const { activeDate, setActiveDate, startActiveDate } = useActiveDate(props, dateConfig, activeType)
    const { maxRowIndex, maxCellIndex } = useMaxIndex(activeType, dateConfig, activeDate)

    provide(datePanelToken, {
      props,
      slots,
      locale,
      mergedPrefixCls,
      dateConfig,
      activeType,
      setActiveType,
      activeDate,
      setActiveDate,
      startActiveDate,
      maxRowIndex,
      maxCellIndex,
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <div class={`${prefixCls} ${prefixCls}-${activeType.value}`}>
          <PanelHeader />
          <PanelBody />
          {slots.footer && <div class={`${prefixCls}-footer`}>{slots.footer()}</div>}
        </div>
      )
    }
  },
})
