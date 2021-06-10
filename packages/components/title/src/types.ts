import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const titleProps = {
  title: IxPropTypes.string,
  subTitle: IxPropTypes.string,
  extra: IxPropTypes.oneOfType([String, IxPropTypes.arrayOf(String)]),
  size: IxPropTypes.oneOf(['extraLarge', 'large', 'medium', 'small'] as const).def('large'),
  prefix: IxPropTypes.string,

  // events
  onExtraClick: IxPropTypes.emit<(evt: MouseEvent, name: string) => void>(),
  onPrefixClick: IxPropTypes.emit<(evt: MouseEvent) => void>(),
}

export type TitleProps = IxExtractPropTypes<typeof titleProps>

export type TitleInstance = InstanceType<DefineComponent<TitleProps>>
