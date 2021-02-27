import type { ColProps, FlexValue, ColBreakpointConfig } from './types'

import { isNumber, isString, isUndefined } from '@idux/cdk/utils'
import { BreakpointKeys } from '@idux/cdk/breakpoint'

const attrKeys = ['span', 'order', 'offset', 'push', 'pull'] as const

export const parseFlex = (flex: FlexValue): string => {
  if (isNumber(flex)) {
    return `${flex} ${flex} auto`
  }

  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`
  }

  return flex
}

const normalizeSizeProps = (rawProps: number | string | ColBreakpointConfig): ColBreakpointConfig =>
  isNumber(rawProps) || isString(rawProps) ? { span: rawProps } : rawProps || {}

export const getSingleSizeCls = (
  colCls: string,
  size: string,
  sizeProps: ColBreakpointConfig,
): Record<string, boolean> => {
  const cls: Record<string, boolean> = {}

  attrKeys.forEach(attrKey => {
    const attr = sizeProps[attrKey]
    cls[`${colCls}${size ? `-${size}` : ''}-${attrKey}-${attr}`] = !isUndefined(attr)
  })
  return cls
}

export const getAllBreakpointCls = (colCls: string, props: ColProps): Record<string, boolean> => {
  let allBreakpointCls = {}

  BreakpointKeys.forEach(size => {
    const sizeValue = props[size]
    if (!isUndefined(sizeValue)) {
      allBreakpointCls = {
        ...allBreakpointCls,
        ...getSingleSizeCls(colCls, size, normalizeSizeProps(sizeValue)),
      }
    }
  })
  return allBreakpointCls
}
