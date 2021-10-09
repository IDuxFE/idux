/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, toRef } from 'vue'

import { isString } from 'lodash-es'

import { convertArray } from '@idux/cdk/utils'
import { IxHeader } from '@idux/components/header'

import { MODAL_TOKEN, modalToken } from './token'

export default defineComponent({
  setup() {
    const { props, slots, config } = inject(modalToken)!
    const { close } = inject(MODAL_TOKEN)!
    const closable = computed(() => props.closable ?? config.closable)
    const closeIcon = computed(() => props.closeIcon ?? config.closeIcon)

    const onClose = async (evt: Event) => {
      if (closable.value) {
        close(evt)
      }
    }

    return {
      closable,
      closeIcon,
      onClose,
      closeIconSlot: toRef(slots, 'closeIcon'),
      header: toRef(props, 'header'),
      headerSlot: toRef(slots, 'header'),
    }
  },

  render() {
    const { headerSlot, closable, closeIcon, onClose, closeIconSlot, header } = this

    if (headerSlot) {
      return headerSlot({ closable, closeIcon, onClose })
    }

    if (!header && !closable && !closeIconSlot) {
      return null
    }

    const headerProps = isString(header) ? { title: header } : { ...header }

    if (closeIconSlot) {
      const slots = { suffix: () => closeIconSlot({ onClose }) }
      return <IxHeader {...headerProps} v-slots={slots}></IxHeader>
    }

    if (closable) {
      headerProps.suffix = headerProps.suffix ?? closeIcon

      const onSuffixClick = convertArray(headerProps.onSuffixClick)
      onSuffixClick.push(onClose)
      headerProps.onSuffixClick = onSuffixClick
    }

    return <IxHeader {...headerProps}></IxHeader>
  },
})
