/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopconfirmComponent } from './src/types'

import Popconfirm from './src/Popconfirm'

const IxPopconfirm = Popconfirm as unknown as PopconfirmComponent

export { IxPopconfirm }

export type { PopconfirmInstance, PopconfirmPublicProps as PopconfirmProps, PopconfirmButtonProps } from './src/types'
