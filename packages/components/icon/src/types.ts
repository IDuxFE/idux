import type { DefineComponent } from 'vue'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const iconProps = {
  iconfont: IxPropTypes.bool.def(false),
  name: IxPropTypes.string,
  rotate: IxPropTypes.oneOfType([Boolean, Number, String]),
}

export type IconProps = IxExtractPropTypes<typeof iconProps>

export type IconInstance = InstanceType<DefineComponent<IconProps>>

export interface IconDefinition {
  name: string
  svgString: string
}

export interface IconRendered {
  name: string
  svg: SVGElement
}
