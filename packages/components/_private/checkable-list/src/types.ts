/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes, type VKey } from '@idux/cdk/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CheckableListData extends Record<VKey, any> {
  key?: VKey
  label?: string
  disabled?: boolean
  additional?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    class?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    style?: any
    [key: string]: unknown
  }
}

export interface CheckableListScroll {
  height?: string | number
  fullHeight?: boolean
}

export const checkableListProps = {
  dataSource: IxPropTypes.array<CheckableListData>(),
  checkable: IxPropTypes.bool.def(true),
  removable: IxPropTypes.bool.def(false),
  checked: IxPropTypes.func<(item: CheckableListData) => boolean>(),
  disabled: IxPropTypes.func<(item: CheckableListData) => boolean>(),
  getRowKey: IxPropTypes.func<(item: CheckableListData) => VKey>(),
  virtual: IxPropTypes.bool,
  scroll: IxPropTypes.object<CheckableListScroll>(),
  onCheckChange: IxPropTypes.emit<(item: CheckableListData, checked: boolean) => void>(),
  onRemove: IxPropTypes.emit<(item: CheckableListData) => void>(),
  onScroll: IxPropTypes.emit<(evt: Event) => void>(),
  onScrolledChange: IxPropTypes.emit<(startIndex: number, endIndex: number, visibleData: unknown[]) => void>(),
  onScrolledBottom: IxPropTypes.emit<() => void>(),
}

export const checkableListItemProps = {
  checked: IxPropTypes.bool.def(false),
  checkable: IxPropTypes.bool.def(true),
  removable: IxPropTypes.bool.def(false),
  disabled: IxPropTypes.bool.def(false),
  label: IxPropTypes.string,
  value: IxPropTypes.oneOfType([String, Number, Symbol]).isRequired,
  onCheckChange: IxPropTypes.emit<(checked: boolean) => void>(),
  onRemove: IxPropTypes.emit<() => void>(),
}

export interface CheckableListApi {
  scrollTo: VirtualScrollToFn
}

export type CheckableListProps = ExtractInnerPropTypes<typeof checkableListProps>
export type CheckableListItemProps = ExtractInnerPropTypes<typeof checkableListItemProps>
export type CheckableListPublicProps = ExtractPublicPropTypes<typeof checkableListProps>
export type CheckableListComponent = DefineComponent<
  Omit<HTMLAttributes, keyof CheckableListPublicProps> & CheckableListPublicProps,
  CheckableListApi
>
export type CheckableListInstance = InstanceType<DefineComponent<CheckableListProps, CheckableListApi>>
