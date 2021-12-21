/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const breadcrumbProps = {
  separator: IxPropTypes.string.def('/'),
}

export type BreadcrumbProps = IxInnerPropTypes<typeof breadcrumbProps>
export type BreadcrumbPublicProps = IxPublicPropTypes<typeof breadcrumbProps>
export type BreadcrumbComponent = DefineComponent<
  Omit<HTMLAttributes, keyof BreadcrumbPublicProps> & BreadcrumbPublicProps
>
export type BreadcrumbInstance = InstanceType<DefineComponent<BreadcrumbProps>>

export const breadcrumbItemProps = {
  separator: IxPropTypes.string,
}

export type BreadcrumbItemProps = IxInnerPropTypes<typeof breadcrumbItemProps>
export type BreadcrumbItemPublicProps = IxPublicPropTypes<typeof breadcrumbItemProps>
export type BreadcrumbItemComponent = DefineComponent<
  Omit<HTMLAttributes, keyof BreadcrumbItemPublicProps> & BreadcrumbItemPublicProps
>
export type BreadcrumbItemInstance = InstanceType<DefineComponent<BreadcrumbItemProps>>
