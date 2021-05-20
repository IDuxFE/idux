import type { Component, DefineComponent, VNodeTypes } from 'vue'
import type { VueTypeDef } from 'vue-types'

import { PropTypes } from '@idux/cdk/utils'

export interface VirtualItemProps {
  setRef: (element: HTMLElement) => void
}

export const virtualItemPropsDef = {
  setRef: PropTypes.func.def(() => {}),
}

export interface VirtualFillerProps {
  /** Virtual filler height. Should be `count * itemMinHeight` */
  scrollHeight?: number
  /** Set offset of visible items. Should be the top of start item position */
  offset?: number
}

export const virtualFillerPropsDef = {
  scrollHeight: PropTypes.number,
  offset: PropTypes.number,
}

export type VirtualFillerInstance = InstanceType<DefineComponent<VirtualFillerProps>>

export interface VirtualScrollBarProps {
  count: number
  height: number
  scrollHeight: number
  scrollTop: number
}

export const virtualScrollBarPropsDef = {
  count: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scrollHeight: PropTypes.number.isRequired,
  scrollTop: PropTypes.number.isRequired,
}

export interface VirtualScrollBarBindings {
  delayHidden: () => void
}

export type VirtualScrollBarInstance = InstanceType<DefineComponent<VirtualScrollBarProps, VirtualScrollBarBindings>>

export type ItemRender<T = Record<string, unknown>> = (option: { item: T; index: number }) => VNodeTypes

export interface VirtualListProps<T = Record<string, unknown>> {
  component: string | Component
  data: T[]
  /** If not match virtual scroll condition, Set List use height of container. */
  fullHeight: boolean
  height: number
  itemHeight: number
  itemKey: string | ((item: T) => string | number)
  itemRender?: ItemRender
  /** Set `false` will always use real scroll instead of virtual one */
  virtual: boolean
}

export const virtualListPropsDef = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).def('div') as VueTypeDef<string | Component> & {
    required: true
  },
  data: PropTypes.array.def(() => []) as VueTypeDef<Record<string, unknown>[]> & { required: true },
  fullHeight: PropTypes.bool.def(true),
  height: PropTypes.number.def(0),
  itemHeight: PropTypes.number.def(0),
  itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired as VueTypeDef<
    string | ((item: Record<string, unknown>) => string | number)
  > & { required: true },
  itemRender: PropTypes.func,
  virtual: PropTypes.bool.def(true),
}

export interface VirtualListBindings {
  scrollTo: ScrollToFn
}

export type VirtualListInstance = InstanceType<DefineComponent<VirtualListProps, VirtualListBindings>>

export type ScrollToAlign = 'top' | 'bottom' | 'auto'

export type ScrollToOptions =
  | {
      key: string | number
      align?: ScrollToAlign
      offset?: number
    }
  | {
      index: number
      align?: ScrollToAlign
      offset?: number
    }

export type ScrollToFn = (option?: number | ScrollToOptions) => void
