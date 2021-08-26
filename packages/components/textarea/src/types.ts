import type { DefineComponent, TextareaHTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'
import { ɵCommonProps } from '@idux/components/input'

export const textareaProps = {
  ...ɵCommonProps,
  autoRows: IxPropTypes.oneOfType([Boolean, IxPropTypes.shape<TextareaAutoRows>({ minRows: Number, maxRows: Number })]),
  computeCount: IxPropTypes.func<(value: string) => string>(),
  maxCount: IxPropTypes.oneOfType([Number, String]),
  resize: IxPropTypes.oneOf<TextareaResize>(['none', 'both', 'horizontal', 'vertical']),
  showCount: IxPropTypes.bool,
}

export type TextareaProps = IxInnerPropTypes<typeof textareaProps>
export type TextareaPublicProps = IxPublicPropTypes<typeof textareaProps>
export interface TextareaBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}
export type TextareaComponent = DefineComponent<TextareaHTMLAttributes & typeof textareaProps, TextareaBindings>
export type TextareaInstance = InstanceType<DefineComponent<TextareaProps, TextareaBindings>>

export type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical'
export type TextareaAutoRows = { minRows: number; maxRows: number }
