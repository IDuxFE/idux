import type { FunctionDirective } from 'vue'

export type TypographyType = 'success' | 'warning' | 'secondary' | 'error'

export interface TypographyOptions {
  type?: TypographyType
  disabled?: boolean
}

export type TypographyProps = TypographyType | TypographyOptions

export type TypographyDirective = FunctionDirective<HTMLElement, TypographyProps>
