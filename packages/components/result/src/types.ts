import type { DefineComponent } from 'vue'
import type { ResultStatus } from '@idux/components/config'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const resultProps = {
  icon: IxPropTypes.string,
  status: IxPropTypes.oneOf<ResultStatus>(['success', 'error', 'info', 'warning']),
  subtitle: IxPropTypes.string,
  title: IxPropTypes.string,
}

export type ResultProps = IxExtractPropTypes<typeof resultProps>

export type ResultInstance = InstanceType<DefineComponent<ResultProps>>
