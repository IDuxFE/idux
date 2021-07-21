import type { ComputedRef, InjectionKey, Slots } from 'vue'
import type { ModalConfig } from '@idux/components/config'
import type { TableColumnProps, TableProps } from './types'

export interface TableContext {
  props: TableProps
  slots: Slots
  config: ModalConfig
  columns: ComputedRef<TableColumnProps[]>
}

export const tableToken: InjectionKey<TableContext> = Symbol('tableToken')
