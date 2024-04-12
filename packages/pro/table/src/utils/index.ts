/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Logger } from '@idux/cdk/utils'
import { type ProTableLocale } from '@idux/pro/locales'

import { type ProTableColumn } from '../types'

export function getColumnTitle(column: ProTableColumn, locale: ProTableLocale): string {
  const { title, type } = column
  if (title) {
    return title
  }
  if (type) {
    return locale.layout[type]
  }
  __DEV__ && Logger.warn('components/table', 'Each column in table should have a `title` or `type` prop.', column)
  return ''
}
