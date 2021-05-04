import { StringGradients, ProgressGradient } from './types'

export const fullPercent = 100

export function convertPercent(percent: number | string | undefined): number {
  if (!percent || percent < 0) {
    return 0
  }
  if (percent > fullPercent) {
    return fullPercent
  }
  return parseInt(percent as string, 10)
}

interface SortGradientResult {
  key: number
  value: string
}

/**
 * @example
 *   {
 *     "0%": "#afc163",
 *     "75%": "#009900",
 *     "50%": "green", // ====> [{key: 0, value: '#afc163'}, {key: 25， value: '#66FF00'} ...]
 *     "50%": "green",
 *     "25%": "#66FF00",
 *     "100%": "#ffffff"
 *   }
 */
export const sortGradient = (gradients: StringGradients): SortGradientResult[] => {
  const tempArr: SortGradientResult[] = []
  Object.keys(gradients).forEach(key => {
    const formattedKey = parseFloat(key.replace(/%/g, ''))
    if (!isNaN(formattedKey)) {
      tempArr.push({
        key: formattedKey,
        value: gradients[key],
      })
    }
  })
  return tempArr.sort((a, b) => a.key - b.key)
}

/**
 * @example
 *   {
 *     "0%": "#afc163",
 *     "25%": "#66FF00",
 *     "50%": "#00CC00", // ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
 *     "75%": "#009900", //        #00CC00 50%, #009900 75%, #ffffff 100%)
 *     "100%": "#ffffff"
 *   }
 */
export const handleGradient = (strokeColor: ProgressGradient): string => {
  const {
    from = '#3366ff', // @primary
    to = '#3366ff', // @primary
    direction = 'to right',
    ...rest
  } = strokeColor
  if (Object.keys(rest).length !== 0) {
    const sortedGradients = sortGradient(rest as StringGradients)
      .map(({ key, value }) => `${value} ${key}%`)
      .join(', ')
    return `linear-gradient(${direction}, ${sortedGradients})`
  }
  return `linear-gradient(${direction}, ${from}, ${to})`
}

export const handleCircleGradient = (strokeColor: StringGradients): { offset: string; color: string }[] => {
  return sortGradient(strokeColor).map(({ key, value }) => ({ offset: `${key}%`, color: value }))
}
