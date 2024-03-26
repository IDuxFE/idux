/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { creationDataKey } from '../composables/usePanelActiveState'
import { proTagSelectContext } from '../token'

export default defineComponent({
  setup() {
    const { locale, activeValue, mergedPrefixCls, inputValue, changeActiveValue, handleTagCreate } =
      inject(proTagSelectContext)!

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-option`

      return {
        [prefixCls]: true,
        [`${prefixCls}-active`]: creationDataKey === activeValue.value,
      }
    })

    const handleMouseEnter = () => {
      changeActiveValue(creationDataKey)
    }

    return () => {
      return (
        <div class={classes.value} onMouseenter={handleMouseEnter} onClick={handleTagCreate}>
          <span class={`${mergedPrefixCls.value}-creation-label`}>{locale.createTag}</span>
          <span class={`${mergedPrefixCls.value}-creation-input`}>{inputValue.value}</span>
        </div>
      )
    }
  },
})
