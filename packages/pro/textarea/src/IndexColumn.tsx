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
    const {
      mergedPrefixCls,
      errSet,
      rowCounts,
      renderedLinesIndex,
      renderedTopOffset,
      lineHeight,
      boxSizingData,
      setvisibleErrIndex,
    } = inject(proTextareaContext)!

    const mergedRowCnts = computed(() => {
      if (rowCounts.value.length > 0) {
        const { start, end } = renderedLinesIndex.value
        return rowCounts.value.slice(start, end + 1)
      }

      return [0]
    })
    const columnStyle = computed(() =>
      normalizeStyle({
        paddingTop: `${(boxSizingData.value?.paddingTop ?? 0) + renderedTopOffset.value}px`,
        paddingBottom: `${boxSizingData.value?.paddingBottom ?? 0}px`,
      }),
    )

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-index-column`

      const _errSet = errSet.value
      const _lineHeight = lineHeight.value
      const start = renderedLinesIndex.value.start

      return (
        <div class={prefixCls} style={columnStyle.value}>
          {mergedRowCnts.value.map((cnt, index) => {
            const cellStyle = normalizeStyle({
              height: `${cnt * _lineHeight}px`,
            })

            const lineIndex = index + start
            const errorIdx = _errSet.has(lineIndex) ? lineIndex : -1
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
                key={lineIndex}
                class={cellClass}
                style={cellStyle}
                onMouseenter={handleCellMouseEnter}
                onMouseleave={handleCellMouseLeave}
              >
                {lineIndex + 1}
              </div>
            )
          })}
        </div>
      )
    }
  },
})
