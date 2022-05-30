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
      title: 'Layout settings',
      sm: 'Compact',
      md: 'Medium',
      lg: 'Relaxed',
      all: 'All field',
      reset: 'Reset',
      indexable: 'Index column',
      expandable: 'Expand column',
      selectable: 'Select column',
      startPin: 'Pin to start',
      endPin: 'Pin to end',
      noPin: 'Unpinned',
      startPinTitle: 'Fixed the start',
      endPinTitle: 'Fixed the end',
      noPinTitle: 'Not Fixed',
    },
  },
  tree: {
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
  },
}

export default enUS
