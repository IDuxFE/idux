/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface proTreeLocale {
  expandAll: string
  collapseAll: string
}

export interface Locale {
  type: LocaleType
  proTree: proTreeLocale
}

export type LocaleType = 'zh-CN' | 'en-US'
