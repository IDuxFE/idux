import type { ComputedRef, CSSProperties } from 'vue'
import type { ColProps, ColBreakpointConfig } from './types'

import { inject, defineComponent, computed } from 'vue'
import { isNumber, isNumeric, isString, isUndefined } from '@idux/cdk/utils'
import { BREAKPOINTS_KEYS } from '@idux/cdk/breakpoint'
import { rowToken } from './token'
import { colProps } from './types'

export default defineComponent({
  name: 'IxCol',
  props: colProps,
  setup(props, { slots }) {
    const { gutter } = inject(rowToken)!

    const classes = useClasses(props)
    const style = useStyle(props, gutter)

    return () => (
      <div class={classes.value} style={style.value}>
        {slots.default?.()}
      </div>
    )
  },
})

function useClasses(props: ColProps) {
  return computed(() => generateAllCls(props))
}

function useStyle(props: ColProps, gutter: ComputedRef<[number, number]>) {
  return computed(() => {
    const style: CSSProperties = {}

    const [horizontalGutter, verticalGutter] = gutter.value
    if (horizontalGutter > 0) {
      style.paddingLeft = `${horizontalGutter / 2}px`
      style.paddingRight = style.paddingLeft
    }
    if (verticalGutter > 0) {
      style.paddingTop = `${verticalGutter / 2}px`
      style.paddingBottom = style.paddingTop
    }

    if (props.flex) {
      style.flex = parseFlex(props.flex)
    }

    return style
  })
}

const attrKeys = ['span', 'order', 'offset', 'push', 'pull'] as const

function generateAllCls(props: ColProps) {
  const clsPrefix = 'ix-col'
  const clsMap = new Map<string, boolean>([[clsPrefix, true]])

  const generateSizeCls = (sizeConfig: ColBreakpointConfig, size?: string) => {
    attrKeys.forEach(attrKey => {
      const attr = sizeConfig[attrKey]
      const cls = `${clsPrefix}${size ? `-${size}` : ''}-${attrKey}-${attr}`
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

  const allCls = {} as Record<string, boolean>
  clsMap.forEach((value, key) => {
    allCls[key] = value
  })

  return allCls
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
