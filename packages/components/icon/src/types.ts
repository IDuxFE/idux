import type { DefineComponent } from 'vue'

export interface IconProps {
  iconfont: boolean
  name?: string
  rotate?: boolean | number | string
}

export type IconInstance = InstanceType<DefineComponent<IconProps>>

export interface IconDefinition {
  name: string
  svgString: string
}

export interface IconRendered {
  name: string
  svg: SVGElement
}
