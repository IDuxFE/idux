/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProFormComponent } from './src/types'

import ProForm from './src/ProForm'

const IxProForm = ProForm as unknown as ProFormComponent

export { IxProForm }

export type {
  ProFormInstance,
  ProFormComponent,
  ProFormPublicProps as ProFormProps,
  ProFormFieldsSchema,
  ProFormJsonSchema,
  ProFormSchemaFormatter,
} from './src/types'
