export type TypographyType = 'success' | 'warning' | 'secondary' | 'error'

export interface TypographyOptions {
  type?: TypographyType
  disabled?: boolean
}

export type TypographyConfig = TypographyType | TypographyOptions
