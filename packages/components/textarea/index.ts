/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TextareaComponent } from './src/types'

import Textarea from './src/Textarea'

const IxTextarea = Textarea as unknown as TextareaComponent

export { IxTextarea }

export { getBoxSizingData as ɵGetBoxSizingData } from './src/utils/getBoxSizingData'
export { measureTextarea as ɵMeasureTextarea } from './src/utils/measureTextarea'
export { useLineHeight as ɵUseLineHeight } from './src/composables/useLineHeight'
export { useAutoRows as ɵUseAutoRows } from './src/composables/useAutoRows'

export type {
  TextareaInstance,
  TextareaComponent,
  TextareaPublicProps as TextareaProps,
  TextareaAutoRows,
  TextareaResize,
} from './src/types'
export type { BoxSizingData as ɵBoxSizingData } from './src/utils/getBoxSizingData'

export { getThemeTokens as getTextareaThemeTokens } from './theme'

export type { TextareaThemeTokens } from './theme'
