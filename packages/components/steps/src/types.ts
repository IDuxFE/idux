export interface StepProps {
  index: number
  title?: string
  subTitle?: string
  description?: string
  disabled?: boolean
  icon?: string
  status?: string
}

export interface StepsProps {
  active?: number
  direction?: string
  placement?: string
  percent?: number
  progressDot?: boolean
  size?: string
  status?: string
}
