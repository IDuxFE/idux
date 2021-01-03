import type { DefineComponent } from 'vue'

export interface IconProps {
  readonly name?: string
  readonly rotate?: boolean | number | string
  readonly iconfont?: boolean
}

export type IxIconComponent = InstanceType<DefineComponent<IconProps>>

export interface IconDefinition {
  name: string
  svgString: string
}

export interface IconRendered {
  name: string
  svg: SVGElement
}
