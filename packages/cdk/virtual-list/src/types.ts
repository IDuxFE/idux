import type { Component, DefineComponent, VNodeTypes } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const virtualItemProps = {
  setRef: IxPropTypes.func<(element: HTMLElement) => void>().def(() => {}),
}

export type VirtualItemProps = IxExtractPropTypes<typeof virtualItemProps>

export const virtualFillerProps = {
  /** Virtual filler height. Should be `count * itemMinHeight` */
  scrollHeight: IxPropTypes.number,
  /** Set offset of visible items. Should be the top of start item position */
  offset: IxPropTypes.number,
  onResize: IxPropTypes.func<() => void>().isRequired,
}

export type VirtualFillerProps = IxExtractPropTypes<typeof virtualFillerProps>

export type VirtualFillerInstance = InstanceType<DefineComponent<VirtualFillerProps>>

export const virtualScrollBarProps = {
  count: IxPropTypes.number.isRequired,
  height: IxPropTypes.number.isRequired,
  scrollHeight: IxPropTypes.number.def(0),
  scrollTop: IxPropTypes.number.isRequired,
  onScroll: IxPropTypes.func<(scrollTop: number) => void>().isRequired,
  onScrollStateChange: IxPropTypes.func<(dragging: boolean) => void>().isRequired,
}

export type VirtualScrollBarProps = IxExtractPropTypes<typeof virtualScrollBarProps>

export interface VirtualScrollBarBindings {
  delayHidden: () => void
}

export type VirtualScrollBarInstance = InstanceType<DefineComponent<VirtualScrollBarProps, VirtualScrollBarBindings>>

export type VirtualItemRenderFn<T = unknown> = (option: { item: T; index: number }) => VNodeTypes

export const virtualListProps = {
  component: IxPropTypes.oneOfType([String, IxPropTypes.object<Component>()]).def('div'),
  data: IxPropTypes.array().def(() => []),
  fullHeight: IxPropTypes.bool.def(true),
  height: IxPropTypes.number.def(0),
  itemHeight: IxPropTypes.number.def(0),
  itemKey: IxPropTypes.oneOfType([String, IxPropTypes.func<(item: unknown) => string | number>()]).isRequired,
  itemRender: IxPropTypes.func<VirtualItemRenderFn>(),
  virtual: IxPropTypes.bool.def(true),
  onScroll: IxPropTypes.func<(evt: Event) => void>(),
}

export type VirtualListProps = IxExtractPropTypes<typeof virtualListProps>

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

export interface VirtualListBindings {
  scrollTo: ScrollToFn
}

export type VirtualListInstance = InstanceType<DefineComponent<VirtualListProps, VirtualListBindings>>
