/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { RowGutter, RowProps } from './types'
import type { Screens } from '@idux/cdk/breakpoint'
import type { RowConfig } from '@idux/components/config'
import type { CSSProperties, ComputedRef } from 'vue'

import { computed, defineComponent, provide } from 'vue'

import { isArray, isObject, isUndefined } from 'lodash-es'

import { BREAKPOINTS_KEYS, useScreens } from '@idux/cdk/breakpoint'
import { convertNumber } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'

import { rowToken } from './token'
import { rowProps } from './types'

export default defineComponent({
  name: 'IxRow',
  props: rowProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('row')
    const classes = useClasses(props, config)

    const gutter = useGutter(props)
    const style = useStyle(gutter)

    provide(rowToken, { gutter })

    return () => (
      <div class={classes.value} style={style.value}>
        {slots.default?.()}
      </div>
    )
  },
})

function useClasses(props: RowProps, config: RowConfig) {
  return computed(() => {
    const row = 'ix-row'
    return {
      [row]: true,
      [`${row}-no-wrap`]: !(props.wrap ?? config.wrap),
      [`${row}-${props.justify}`]: props.justify,
      [`${row}-${props.align}`]: props.align,
    }
  })
}

function useGutter(props: RowProps) {
  const screens = useScreens()
  return computed(() => normalizeGutter(props.gutter, screens))
}

function useStyle(gutter: ComputedRef<[number, number]>) {
  return computed(() => {
    const style: CSSProperties = {}
    const [horizontalGutter, verticalGutter] = gutter.value
    if (horizontalGutter > 0) {
      style.marginLeft = `${horizontalGutter / -2}px`
      style.marginRight = style.marginLeft
    }
    if (verticalGutter > 0) {
      style.marginTop = `${verticalGutter / -2}px`
      style.marginBottom = style.marginTop
    }

    return style
  })
}

// gutter: RowGutter => [0, 0]
function normalizeGutter(propGutter: RowGutter, screens: Screens) {
  const results: [number, number] = [0, 0]

  const normalizedGutters = isArray(propGutter) ? propGutter : [propGutter, 0]
  normalizedGutters.forEach((gutter, index) => {
    if (isObject(gutter)) {
      BREAKPOINTS_KEYS.some(key => {
        if (!isUndefined(gutter[key]) && screens[key]) {
          results[index] = gutter[key]
          return true
        }
        return false
      })
    } else {
      results[index] = convertNumber(gutter)
    }
  })
  return results
}
