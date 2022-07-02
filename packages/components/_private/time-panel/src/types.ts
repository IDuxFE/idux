/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

import { MaybeArray } from '@idux/cdk/utils'

export const baseTimePanelProps = {
  disabledHours: {
    type: Function as PropType<(selectedAmPm: string | undefined) => number[]>,
    default: () => [],
  },
  disabledMinutes: {
    type: Function as PropType<(selectedHour: number | undefined, selectedAmPm: string | undefined) => number[]>,
    default: () => [],
  },
  disabledSeconds: {
    type: Function as PropType<
      (
        selectedHour: number | undefined,
        selectedMinute: number | undefined,
        selectedAmPm: string | undefined,
      ) => number[]
    >,
    default: () => [],
  },

  hideDisabledOptions: {
    type: Boolean,
    default: false,
  },
  hourStep: {
    type: Number,
    default: 1,
  },
  minuteStep: {
    type: Number,
    default: 1,
  },
  secondStep: {
    type: Number,
    default: 1,
  },
} as const

export const timePanelProps = {
  ...baseTimePanelProps,

  value: Date,
  activeValue: Date,
  visible: {
    type: Boolean,
    default: false,
  },
  hourEnabled: {
    type: Boolean,
    default: true,
  },
  minuteEnabled: {
    type: Boolean,
    default: true,
  },
  secondEnabled: {
    type: Boolean,
    default: true,
  },
  use12Hours: {
    type: Boolean,
    default: false,
  },

  // events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: Date) => void>>,
  'onUpdate:activeValue': [Function, Array] as PropType<MaybeArray<(value: Date) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(value: Date) => void>>,
} as const

export type TimePanelProps = ExtractInnerPropTypes<typeof timePanelProps>
export type TimePanelPublicProps = ExtractPublicPropTypes<typeof timePanelProps>
export type TimePanelComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TimePanelPublicProps> & TimePanelPublicProps
>
export type TimePanelInstance = InstanceType<DefineComponent<TimePanelProps>>

// private
export interface TimePanelCell {
  value: number | string
  disabled: boolean
}

export const timePanelColumnProps = {
  selectedValue: [String, Number] as PropType<string | number>,
  activeValue: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
  options: {
    type: Array as PropType<TimePanelCell[]>,
    require: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },

  // events
  onChange: [Function, Array] as PropType<MaybeArray<(value: number | string) => void>>,
} as const

export const timePanelCellProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },

  // events
  onChange: [Function, Array] as PropType<MaybeArray<(value: number | string) => void>>,
} as const

export type BaseTimePanelProps = ExtractInnerPropTypes<typeof baseTimePanelProps>
export type TimePanelColumnProps = ExtractInnerPropTypes<typeof timePanelColumnProps>
export type TimePanelCellProps = ExtractInnerPropTypes<typeof timePanelCellProps>

export type TimePanelColumnType = 'hour' | 'minute' | 'second' | 'AM/PM'
