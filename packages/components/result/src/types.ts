import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type ResultStatus = 'success' | 'error' | 'info' | 'warning'

export const resultProps = {
  icon: IxPropTypes.string,
  status: IxPropTypes.oneOf<ResultStatus>(['success', 'error', 'info', 'warning']),
  subtitle: IxPropTypes.string,
  title: IxPropTypes.string,
}

export type ResultProps = IxInnerPropTypes<typeof resultProps>
export type ResultPublicProps = IxPublicPropTypes<typeof resultProps>
export type ResultComponent = DefineComponent<Omit<HTMLAttributes, keyof ResultPublicProps> & ResultPublicProps>
export type ResultInstance = InstanceType<DefineComponent<ResultProps>>
