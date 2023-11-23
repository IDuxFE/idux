/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { BreadcrumbComponent, BreadcrumbItemComponent } from './src/types'

import Breadcrumb from './src/Breadcrumb'
import BreadcrumbItem from './src/BreadcrumbItem'

const IxBreadcrumb = Breadcrumb as unknown as BreadcrumbComponent
const IxBreadcrumbItem = BreadcrumbItem as unknown as BreadcrumbItemComponent

export { IxBreadcrumb, IxBreadcrumbItem }

export type {
  BreadcrumbInstance,
  BreadcrumbComponent,
  BreadcrumbPublicProps as BreadcrumbProps,
  BreadcrumbItemInstance,
  BreadcrumbItemComponent,
  BreadcrumbItemPublicProps as BreadcrumbItemProps,
} from './src/types'

export { getThemeTokens as getBreadcrumbThemeTokens } from './theme'
export type { BreadcrumbThemeTokens } from './theme'
