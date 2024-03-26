/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ProLocale } from '../types'

/* eslint-disable camelcase */
const enUS: ProLocale = {
  type: 'en-US',

  table: {
    layout: {
      title: 'Set columns',
      sm: 'Compact',
      md: 'Medium',
      lg: 'Expanded',
      placeholder: 'Search keywords',
      all: 'Select All',
      reset: 'Restore',
      indexable: 'No.',
      expandable: 'Expand',
      selectable: 'Select',
      startPin: 'Pin left',
      endPin: 'Pin right',
      noPin: 'Unpin',
      startPinTitle: 'Left Pinned',
      endPinTitle: 'Right Pinned',
      noPinTitle: 'Unpinned',
    },
  },
  tagSelect: {
    colors: {
      grey: 'grey',
      green: 'green',
      blue: 'blue',
      yellow: 'yellow',
      red: 'red',
      orange: 'orange',
    },
    remove: 'delete',
    createTag: 'Create tag',
    removeTag: 'Remove tag',
    maxExceededAlert: 'Tags count reached limit of ${0}',
    empty: 'No Data',
    ok: 'OK',
    cancel: 'Cancel',
  },
  tree: {
    expandAll: 'Expand',
    collapseAll: 'Collapse',
  },
  search: {
    keyword: 'Search',
    keywordFallbackLabel: 'Search with "${0}: ${1}"',
    ok: 'OK',
    cancel: 'Cancel',
    selectAll: 'Select All',
    allSelected: 'All',
    placeholder: 'Select filters and press Enter',
    switchToDatePanel: 'Select Date',
    switchToTimePanel: 'Select Time',
  },
}

export default enUS
