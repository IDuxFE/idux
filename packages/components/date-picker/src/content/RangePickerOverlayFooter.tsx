/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { ɵFooter } from '@idux/components/_private/footer'

import { dateRangePickerToken } from '../token'

export default defineComponent({
  name: 'IxDateRangePickerFooter',
  setup(_, { slots }) {
    const {
      locale,
      mergedPrefixCls,
      props,
      rangeControlContext: { buffer, bufferUpdated },
      handleChange,
      setOverlayOpened,
    } = inject(dateRangePickerToken)!

    const handleConfirm = () => {
      if (bufferUpdated.value) {
        handleChange(buffer.value)
      }

      setOverlayOpened(false)
    }

    return () => (
      <ɵFooter
        v-slots={slots}
        class={`${mergedPrefixCls.value}-overlay-footer`}
        footer={props.footer}
        okText={locale.dateRangePicker.okText}
        okButton={{ size: 'xs', mode: 'primary' }}
        cancelVisible={false}
        ok={handleConfirm}
      />
    )
  },
})
