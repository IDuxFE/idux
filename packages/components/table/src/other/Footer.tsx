import type { Slots, VNode } from 'vue'
import { useGlobalConfig } from '@idux/components/config'

export function renderFooter(slots: Slots): VNode | null {
  const { prefixCls } = useGlobalConfig('common')
  if (!slots.footer) {
    return null
  }
  return <div class={`${prefixCls}-table-footer`}>{slots.footer()}</div>
}
