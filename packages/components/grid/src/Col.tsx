/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, ComputedRef, computed, defineComponent, inject, normalizeClass } from 'vue'

import { isNumber, isString, isUndefined } from 'lodash-es'

import { BREAKPOINTS_KEYS } from '@idux/cdk/breakpoint'
import { isNumeric } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import { rowToken } from './token'
import { type ColBreakpointConfig, type ColProps, colProps } from './types'

export default defineComponent({
  name: 'IxCol',
  props: colProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId } = useThemeToken()
    const mergedPrefixCls = computed(() => `${common.prefixCls}-col`)
    const { mergedGutters } = inject(rowToken)!

    const classes = computed(() => generateAllCls(props, mergedPrefixCls.value, globalHashId))
    const style = computed(() => {
      const style: CSSProperties = {}

      const [verticalGutter, horizontalGutter] = mergedGutters.value

      if (verticalGutter > 0) {
        style.paddingTop = `${verticalGutter / 2}px`
        style.paddingBottom = style.paddingTop
      }

      if (horizontalGutter > 0) {
        style.paddingLeft = `${horizontalGutter / 2}px`
        style.paddingRight = style.paddingLeft
      }

      if (props.flex) {
        style.flex = parseFlex(props.flex)
      }

      return style
    })

    return () => (
      <div class={classes.value} style={style.value}>
        {slots.default && slots.default()}
      </div>
    )
  },
})

const attrKeys = ['span', 'order', 'offset', 'push', 'pull'] as const

function generateAllCls(props: ColProps, prefixCLs: string, globalHashId: ComputedRef<string>) {
  const clsMap = new Map<string, boolean>([[prefixCLs, true]])

  const generateSizeCls = (sizeConfig: ColBreakpointConfig, size?: string) => {
    attrKeys.forEach(attrKey => {
      const attr = sizeConfig[attrKey]
      const cls = `${prefixCLs}${size ? `-${size}` : ''}-${attrKey}-${attr}`
      clsMap.set(cls, !isUndefined(attr))
    })
  }

  generateSizeCls(props)

  BREAKPOINTS_KEYS.forEach(size => {
    const sizeValue = props[size]
    if (!isUndefined(sizeValue)) {
      generateSizeCls(normalizeSizeProps(sizeValue), size)
    }
  })

  const allCls = { [globalHashId.value]: !!globalHashId.value } as Record<string, boolean>
  clsMap.forEach((value, key) => {
    allCls[key] = value
  })

  return normalizeClass(allCls)
}

function normalizeSizeProps(rawProps: number | string | ColBreakpointConfig) {
  return isNumber(rawProps) || isString(rawProps) ? { span: rawProps } : rawProps
}

function parseFlex(flex: number | string) {
  if (isNumeric(flex)) {
    return `${flex} ${flex} auto`
  }

  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex as string)) {
    return `0 0 ${flex}`
  }

  return flex
}
