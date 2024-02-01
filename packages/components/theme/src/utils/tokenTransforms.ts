/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { isString } from 'lodash-es'

export function numUnitTransform(
  value: string | number,
  unit?: 's' | 'deg' | 'px' | 'rem' | 'em' | 'vh' | 'vw',
): string {
  if (isString(value)) {
    return value
  }

  if (value === 0) {
    return value.toString()
  }

  return `${value}${unit ? unit : ''}`
}

const checkKeyWithSearch = (key: string, searchStrs: string[]) => {
  return searchStrs.some(search => key.includes(search))
}

export function defaultTokenTransform(key: string, value: string | number): string {
  if (isString(value)) {
    return value
  }

  const lowerCasedKey = key.toLowerCase()
  const unit = checkKeyWithSearch(lowerCasedKey, [
    'width',
    'height',
    'size',
    'gap',
    'indent',
    'fontsize',
    'spacing',
    'padding',
    'margin',
    'borderradius',
    'linewidth',
    'iconsize',
    'arrowsize',
    'lineheightgutter',
    'screen',
  ])
    ? 'px'
    : checkKeyWithSearch(lowerCasedKey, ['duration'])
      ? 's'
      : undefined

  return numUnitTransform(value, unit)
}
