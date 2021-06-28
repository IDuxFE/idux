import type { DefineComponent } from 'vue'

import { PropTypes } from '@idux/cdk/utils'

export interface MaskProps {
  mask: boolean
  maskClass: string
}

export const MaskPropTypes = {
  mask: PropTypes.bool,
  maskClass: PropTypes.string,
}

export type MaskComponent = InstanceType<DefineComponent<MaskProps>>
