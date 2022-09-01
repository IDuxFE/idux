/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { IxSelect, type SelectData } from '@idux/components/select'

import { paginationToken } from '../token'

export default defineComponent({
  setup() {
    const { props, config, locale, mergedPrefixCls, activeSize, changePageSize } = inject(paginationToken)!

    const sizeData = computed(() => {
      const { pageSizes = config.pageSizes } = props
      return pageSizes.map(size => {
        return { key: size, label: size } as unknown as SelectData
      })
    })

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-sizes`
      const { itemsPerPage, totalSuffix } = locale.pagination

      return (
        <li class={prefixCls}>
          {itemsPerPage}
          <div class={`${prefixCls}-select-wrapper`}>
            <IxSelect
              disabled={props.disabled}
              dataSource={sizeData.value}
              size="sm"
              value={activeSize.value}
              onChange={changePageSize}
            />
          </div>
          {totalSuffix}
        </li>
      )
    }
  },
})
