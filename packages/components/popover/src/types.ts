import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'
import { ɵTooltipProps } from '@idux/components/tooltip'

export const popoverProps = {
  ...ɵTooltipProps,
  content: IxPropTypes.string,
}

export type PopoverProps = IxInnerPropTypes<typeof popoverProps>
export type PopoverPublicProps = IxPublicPropTypes<typeof popoverProps>
export type PopoverComponent = DefineComponent<HTMLAttributes & typeof popoverProps>
export type PopoverInstance = InstanceType<DefineComponent<PopoverProps>>
