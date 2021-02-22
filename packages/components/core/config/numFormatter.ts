import { NumFormatted } from './types'

export function numFormatter(value: string | number, precision: number): NumFormatted {
  // 进行小数位精度补充，需要考虑value值为以下情况的场景：
  // 1. 合法的数字或数字字符串: 100 or 100.1
  // 2. 不合法的数字或数字字符串： 11.11.22
  // 3. 普通文本： hello or h.i

  const separator = '.'
  const numReg = /^(\d+)(\.(\d+))?$/
  const numMatchRet = String(value).match(numReg)

  // 不是合法的数字或数字字符串的无视精度配置项，直接返回文本作为value部分，int和decimal部分给空字符串
  if (!numMatchRet) {
    return {
      value: String(value),
      int: '',
      decimal: '',
    }
  } else {
    const int = String(numMatchRet[1])
    let decimal = String(numMatchRet[3] || '')
      .slice(0, precision)
      .padEnd(precision, '0')

    decimal = decimal.length > 0 ? `${separator}${decimal}` : ''

    return {
      value: `${int}${decimal}`,
      int,
      decimal,
    }
  }
}
