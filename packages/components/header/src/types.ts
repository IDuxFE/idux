import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const headerProps = {
  extra: IxPropTypes.oneOfType([String, IxPropTypes.arrayOf(String)]),
  description: IxPropTypes.string,
  prefix: IxPropTypes.string,
  size: IxPropTypes.oneOf(['extraLarge', 'large', 'medium', 'small'] as const).def('large'),
  showBar: IxPropTypes.bool.def(false),
  subTitle: IxPropTypes.string,
  title: IxPropTypes.string,

  // events
  onExtraClick: IxPropTypes.emit<(evt: MouseEvent, name: string) => void>(),
  onPrefixClick: IxPropTypes.emit<(evt: MouseEvent) => void>(),
}

export type HeaderProps = IxExtractPropTypes<typeof headerProps>

export type HeaderInstance = InstanceType<DefineComponent<HeaderProps>>
