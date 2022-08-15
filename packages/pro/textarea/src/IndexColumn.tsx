/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass, normalizeStyle } from 'vue'

import { proTextareaContext } from './token'

export default defineComponent({
  setup() {
    const { props, mergedPrefixCls, rowCounts, lineHeight, boxSizingData, setvisibleErrIndex } =
      inject(proTextareaContext)!

    const mergedRowCnts = computed(() => (rowCounts.value.length > 0 ? rowCounts.value : [0]))
    const columnStyle = computed(() =>
      normalizeStyle({
        paddingTop: `${boxSizingData.value?.paddingTop ?? 0}px`,
        paddingBottom: `${boxSizingData.value?.paddingBottom ?? 0}px`,
      }),
    )

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-index-column`

      return (
        <div class={prefixCls} style={columnStyle.value}>
          {mergedRowCnts.value.map((cnt, index) => {
            const cellStyle = normalizeStyle({
              height: `${cnt * lineHeight.value}px`,
            })

            const errorIdx = props.errors?.find(error => error.index === index)?.index ?? -1
            const cellClass = normalizeClass({
              [`${prefixCls}-cell`]: true,
              [`${prefixCls}-cell-error`]: errorIdx > -1,
            })

            const handleCellMouseEnter = () => {
              setvisibleErrIndex(errorIdx)
            }
            const handleCellMouseLeave = () => {
              setvisibleErrIndex(-1)
            }

            return (
              <div
                class={cellClass}
                style={cellStyle}
                onMouseenter={handleCellMouseEnter}
                onMouseleave={handleCellMouseLeave}
              >
                {index + 1}
              </div>
            )
          })}
        </div>
      )
    }
  },
})
