/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type DeepPartialGlobalConfig } from './globalConfig'

export const seerConfig: DeepPartialGlobalConfig = {
  common: {
    theme: 'seer',
  },
  form: {
    colonless: true,
    labelAlign: 'start',
  },
  modal: {
    maskClosable: false,
    centered: true,
  },
  progress: {
    strokeLinecap: 'square',
  },
}
