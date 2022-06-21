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

  if (!props.header && !props.closable) {
    return undefined
  }

  const headerProps = convertProps(props)
  const headerSlots = { suffix: slots.closeIcon }

  return <IxHeader {...headerProps} v-slots={headerSlots}></IxHeader>
}

function convertProps(props: HeaderProps) {
  const { closable, closeIcon, header, size, onClose } = props
  const headerProps = isString(header) ? { title: header, size } : { size, ...header }
  if (closable) {
    headerProps.suffix = headerProps.suffix ?? closeIcon
    if (onClose) {
      const onSuffixClick = convertArray(headerProps.onSuffixClick)
      onSuffixClick.push(onClose)
      headerProps.onSuffixClick = onSuffixClick
    }
  }
  return headerProps as HeaderProps
}

Header.displayName = 'ɵHeader'

export default Header
