/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AbstractControl, ValidateStatus } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { HeaderProps } from '@idux/components/header'
import type { OverlayContainerType } from '@idux/components/utils'
import type { DefineComponent, HTMLAttributes, PropType, Slot, VNode, VNodeChild } from 'vue'

export interface TagSelectColor {
  key: VKey
  name: string
  labelColor: string
  backgroundColor: string
  borderColor?: string
}

export interface TagSelectData {
  key: VKey
  label: string
  color: VKey | TagSelectColor
  disabled?: boolean

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const proTagSelectProps = {
  control: {
    type: [String, Number, Object, Array] as PropType<string | number | (string | number)[] | AbstractControl>,
    default: undefined,
  },
  value: { type: Array as PropType<VKey[]>, default: undefined },
  open: { type: Boolean, default: undefined },
  colors: Array as PropType<TagSelectColor[]>,
  clearable: { type: Boolean, default: false },
  clearIcon: { type: String, default: undefined },
  dataSource: Array as PropType<TagSelectData[]>,
  dataEditable: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  confirmBeforeSelect: { type: [Boolean, String] as PropType<boolean | 'force'>, default: false },
  maxTags: { type: [Number, String] as PropType<number | 'responsive'>, default: Number.MAX_SAFE_INTEGER },
  tagsLimit: { type: Number, default: Number.MAX_SAFE_INTEGER },
  tagDataLimit: { type: Number, default: Number.MAX_SAFE_INTEGER },
  overlayClassName: { type: String, default: undefined },
  overlayContainer: {
    type: [String, HTMLElement, Function] as PropType<OverlayContainerType>,
    default: undefined,
  },
  overlayMatchWidth: { type: [Boolean, String] as PropType<boolean | 'minWidth'>, default: 'minWidth' },
  placeholder: { type: String, default: undefined },
  readonly: { type: Boolean, default: false },
  createdTagDataModifier: Function as PropType<(data: TagSelectData) => TagSelectData>,
  removeConfirmHeader: [String, Object] as PropType<string | HeaderProps>,
  removeConfirmTitle: [String, Object, Function] as PropType<string | VNode | (() => VNodeChild)>,
  selectConfirmHeader: [String, Object] as PropType<string | HeaderProps>,
  beforeSelectConfirm: Function as PropType<(data: TagSelectData) => boolean | Promise<boolean>>,
  beforeRemoveConfirm: Function as PropType<(data: TagSelectData) => boolean | Promise<boolean>>,
  size: { type: String as PropType<FormSize>, default: undefined },
  status: String as PropType<ValidateStatus>,
  suffix: { type: String, default: undefined },

  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: VKey[] | undefined) => void>>,
  'onUpdate:open': [Function, Array] as PropType<MaybeArray<(open: boolean) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  onChange: [Function, Array] as PropType<
    MaybeArray<(value: VKey[] | undefined, oldValue: VKey[] | undefined) => void>
  >,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onTagDataChange: [Function, Array] as PropType<MaybeArray<(data: TagSelectData) => void>>,
  onTagDataRemove: [Function, Array] as PropType<MaybeArray<(data: TagSelectData) => void>>,
  onTagDataAdd: [Function, Array] as PropType<MaybeArray<(data: TagSelectData) => void>>,
  onTagSelect: [Function, Array] as PropType<MaybeArray<(data: TagSelectData) => void>>,
  onTagSelectConfirm: [Function, Array] as PropType<MaybeArray<(data: TagSelectData) => void>>,
  onTagSelectCancel: [Function, Array] as PropType<MaybeArray<(data: TagSelectData) => void>>,
  onTagRemove: [Function, Array] as PropType<MaybeArray<(data: TagSelectData) => void>>,
} as const

export interface ProTagSelectSlots {
  clearIcon: Slot
  suffix: Slot
  selectedLabel: Slot<TagSelectData>
  overflowedLabel: Slot<TagSelectData[]>
  tagLabel: Slot<TagSelectData>
  optionLabel: Slot<TagSelectData>
  maxExceededAlert: Slot
  placeholder: Slot

  selectConfirmContent: Slot<TagSelectData>
  removeConfirmTitle: Slot<TagSelectData>
  removeConfirmContent: Slot<TagSelectData>
}

export interface ProTagSelectBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}

export type ProTagSelectProps = ExtractInnerPropTypes<typeof proTagSelectProps>
export type ProTagSelectPublicProps = ExtractPublicPropTypes<typeof proTagSelectProps>
export type ProTagSelectComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProTagSelectPublicProps> & ProTagSelectPublicProps
>
export type ProTagSelectInstance = InstanceType<DefineComponent<ProTagSelectProps>>
