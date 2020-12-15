export interface IconProps {
  readonly name?: string
  readonly rotate?: boolean | number | string
  readonly iconfont?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IconComponent extends IconProps {}

export interface IconDefinition {
  name: string
  svgString: string
}

export interface IconRendered {
  name: string
  svg: SVGElement
}
