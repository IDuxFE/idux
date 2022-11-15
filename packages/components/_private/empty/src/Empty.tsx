/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type FunctionalComponent } from 'vue'

import { isString } from 'lodash-es'

import { IxEmpty } from '@idux/components/empty'

import { type EmptyProps } from './types'

const Empty: FunctionalComponent<EmptyProps> = (props, { slots }) => {
  if (slots.empty) {
    return slots.empty()
  }

  const { empty } = props
  const emptyProps = isString(empty) ? { simple: empty === 'simple' } : empty

  return <IxEmpty {...emptyProps}></IxEmpty>
}

Empty.displayName = 'ɵEmpty'

export default Empty
