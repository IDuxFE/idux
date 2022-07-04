/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

export const breadcrumbProps = {
  separator: {
    type: String,
    default: '/',
  },
} as const

export type BreadcrumbProps = ExtractInnerPropTypes<typeof breadcrumbProps>
export type BreadcrumbPublicProps = ExtractPublicPropTypes<typeof breadcrumbProps>
export type BreadcrumbComponent = DefineComponent<
  Omit<HTMLAttributes, keyof BreadcrumbPublicProps> & BreadcrumbPublicProps
>
export type BreadcrumbInstance = InstanceType<DefineComponent<BreadcrumbProps>>

export const breadcrumbItemProps = {
  separator: String,
} as const

export type BreadcrumbItemProps = ExtractInnerPropTypes<typeof breadcrumbItemProps>
export type BreadcrumbItemPublicProps = ExtractPublicPropTypes<typeof breadcrumbItemProps>
export type BreadcrumbItemComponent = DefineComponent<
  Omit<HTMLAttributes, keyof BreadcrumbItemPublicProps> & BreadcrumbItemPublicProps
>
export type BreadcrumbItemInstance = InstanceType<DefineComponent<BreadcrumbItemProps>>
