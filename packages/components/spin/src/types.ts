export interface SpinProps {
  // please add readonly for every prop
  readonly spinning?: boolean
  readonly icon?: string
  readonly tip?: string
  readonly tipAlign?: 'vertical' | 'horizontal'
  readonly size?: 'large' | 'medium' | 'small'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IxSpinComponent extends SpinProps {}
