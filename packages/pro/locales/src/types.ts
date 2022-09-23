/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export interface ProTableLocale {
  layout: {
    title: string
    sm: string
    md: string
    lg: string
    placeholder: string
    all: string
    reset: string
    indexable: string
    expandable: string
    selectable: string
    startPin: string
    endPin: string
    noPin: string
    startPinTitle: string
    endPinTitle: string
    noPinTitle: string
  }
}

export interface ProTreeLocale {
  expandAll: string
  collapseAll: string
}

export interface ProSearchLocale {
  keyword: string
  ok: string
  cancel: string
  selectAll: string
  placeholder: string
  switchToTimePanel: string
  switchToDatePanel: string
}

export interface ProLocale {
  type: ProLocaleType

  table: ProTableLocale
  tree: ProTreeLocale
  search: ProSearchLocale
}

export type ProLocaleType = 'zh-CN' | 'en-US'
