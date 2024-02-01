/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

export type BaseColorKeys =
  | 'red'
  | 'orange'
  | 'brown'
  | 'yellow'
  | 'canary'
  | 'bud'
  | 'green'
  | 'turquoise'
  | 'cyan'
  | 'glacier'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'magenta'
  | 'graphite'
  | 'grey'
  | 'white'
  | 'black'

export type BaseColors = {
  [key in BaseColorKeys]: string
}

export function getBaseColors(): BaseColors {
  return {
    red: '#f52727',
    orange: '#fa721b',
    brown: '#fdaa1d',
    yellow: '#f8d81a',
    canary: '#fcd200',
    bud: '#8dd118',
    green: '#39c317',
    turquoise: '#12a679',
    cyan: '#19d2db',
    glacier: '#1ba0f2',
    blue: '#1c6eff',
    indigo: '#2229f6',
    purple: '#7824ff',
    magenta: '#d619be',
    graphite: '#a1a7b3',
    grey: '#a3a3a3',
    white: '#ffffff',
    black: '#000000',
  }
}
