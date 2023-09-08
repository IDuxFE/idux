/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TextProps } from '../types'
import type { TooltipProps } from '@idux/components/tooltip'

import { type ComputedRef, computed } from 'vue'

import { isArray, isObject, isString } from 'lodash-es'

import { useGlobalConfig } from '@idux/components/config'

export function useCopyTooltip(props: TextProps): ComputedRef<[TooltipProps, TooltipProps] | undefined> {
  const { text } = useGlobalConfig('locale')

  const copyTooltip = computed<[TooltipProps, TooltipProps] | undefined>(() => {
    const { copyTooltip } = props
    if (!copyTooltip) {
      return
    }

    if (isArray(copyTooltip)) {
      return text.copyText.map((title, idx) => {
        const tooltip = copyTooltip[idx]

        return isString(tooltip) ? { title: tooltip } : { title, ...tooltip }
      }) as [TooltipProps, TooltipProps]
    }

    if (isObject(copyTooltip)) {
      return text.copyText.map(title => ({ title, ...copyTooltip })) as [TooltipProps, TooltipProps]
    }

    return text.copyText.map(title => ({ title })) as [TooltipProps, TooltipProps]
  })

  return copyTooltip
}
