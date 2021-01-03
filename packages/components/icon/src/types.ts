import type { DefineComponent } from 'vue'

interface IconOriginalProps {
  name?: string
  rotate?: boolean | number | string
  iconfont?: boolean
}

export type IconProps = Readonly<IconOriginalProps>

export type IconComponent = InstanceType<DefineComponent<IconProps>>

export interface IconDefinition {
  name: string
  svgString: string
}

export interface IconRendered {
  name: string
  svg: SVGElement
}
