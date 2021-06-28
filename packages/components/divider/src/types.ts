import type { DefineComponent } from 'vue'
import type { DividerPosition, DividerType } from '@idux/components/config'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const dividerProps = {
  dashed: IxPropTypes.bool,
  plain: IxPropTypes.bool,
  position: IxPropTypes.oneOf<DividerPosition>(['left', 'center', 'right']),
  type: IxPropTypes.oneOf<DividerType>(['horizontal', 'vertical']),
}

export type DividerProps = IxExtractPropTypes<typeof dividerProps>

export type DividerInstance = InstanceType<DefineComponent<DividerProps>>
