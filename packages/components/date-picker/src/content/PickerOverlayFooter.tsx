/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { ɵFooter } from '@idux/components/_private/footer'

import { datePickerToken } from '../token'

export default defineComponent({
  name: 'IxDatePickerOverlayFooter',
  setup(_, { slots }) {
    const { mergedPrefixCls, props } = inject(datePickerToken)!

    return () => <ɵFooter v-slots={slots} class={`${mergedPrefixCls.value}-overlay-footer`} footer={props.footer} />
  },
})
