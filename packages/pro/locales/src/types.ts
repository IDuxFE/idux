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
  keywordFallbackLabel: string
  ok: string
  cancel: string
  selectAll: string
  allSelected: string
  placeholder: string
  switchToTimePanel: string
  switchToDatePanel: string
}

export interface ProTagSelectLocale {
  colors: {
    grey: string
    green: string
    blue: string
    yellow: string
    red: string
    orange: string
  }
  remove: string
  createTag: string
  removeTag: string
  maxExceededAlert: string
  empty: string
  ok: string
  cancel: string
}

export interface ProLocale {
  type: ProLocaleType

  table: ProTableLocale
  tagSelect: ProTagSelectLocale
  tree: ProTreeLocale
  search: ProSearchLocale
}

export type ProLocaleType = 'zh-CN' | 'en-US'
