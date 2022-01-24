/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { EmptyProps } from './types'
import type { FunctionalComponent } from 'vue'

import { isString } from 'lodash-es'

import { IxEmpty } from '@idux/components/empty'

const Empty: FunctionalComponent<EmptyProps> = (props, { slots }) => {
  if (slots.empty) {
    return slots.empty(props)
  }

  const { empty } = props
  const emptyProps = isString(empty) ? { description: empty } : empty

  return <IxEmpty {...emptyProps}></IxEmpty>
}

export default Empty
