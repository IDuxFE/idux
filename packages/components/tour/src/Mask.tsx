/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { useThemeToken } from '@idux/components/theme'

import { tourToken } from './token'

export default defineComponent({
  setup() {
    const { globalHashId, hashId } = useThemeToken('tour')
    const { mergedPrefixCls, mergedProps, maskPath, maskAttrs, maskClass, maskStyle } = inject(tourToken)!

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-mask`
      const { animatable } = mergedProps.value

      return normalizeClass([
        prefixCls,
        globalHashId.value,
        hashId.value,
        maskClass.value,
        animatable ? `${prefixCls}-animatable` : undefined,
      ])
    })

    return () => {
      return (
        <svg class={classes.value} style={maskStyle.value} {...maskAttrs.value}>
          <path d={maskPath.value} />
        </svg>
      )
    }
  },
})
