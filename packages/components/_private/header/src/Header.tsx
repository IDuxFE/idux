/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { HeaderProps } from './types'
import type { FunctionalComponent } from 'vue'

import { isString } from 'lodash-es'

import { convertArray } from '@idux/cdk/utils'
import { IxHeader } from '@idux/components/header'

const Header: FunctionalComponent<HeaderProps> = (props, { slots }) => {
  if (slots.header) {
    return slots.header(props)
  }

  const { closable, closeIcon, header, onClose } = props

  if (!header && !closable) {
    return undefined
  }

  const headerProps = isString(header) ? { title: header } : { ...header }
  if (closable) {
    headerProps.suffix = headerProps.suffix ?? closeIcon

    const onSuffixClick = convertArray(headerProps.onSuffixClick)
    onSuffixClick.push(onClose)
    headerProps.onSuffixClick = onSuffixClick
  }

  const headerSlots = { suffix: slots.closeIcon }

  return <IxHeader {...headerProps} v-slots={headerSlots}></IxHeader>
}

export default Header
