/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { IxSelect } from '@idux/components/select'

import { paginationToken } from './token'

export default defineComponent({
  setup() {
    const { props, config, locale, activeSize, onPageSizeChange, mergedPrefixCls } = inject(paginationToken)!

    const size = computed(() => props.size ?? config.size)
    const pageSizes = computed(() => props.pageSizes ?? config.pageSizes)

    const sizeOptions = computed(() => {
      return pageSizes.value.map(size => {
        return {
          value: size,
          label: `${size} ${locale.value.itemsPerPage}`,
        }
      })
    })

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-sizes`
      return (
        <li class={prefixCls}>
          <IxSelect
            disabled={props.disabled}
            options={sizeOptions.value}
            size={size.value}
            value={activeSize.value}
            onChange={onPageSizeChange}
          />
        </li>
      )
    }
  },
})
