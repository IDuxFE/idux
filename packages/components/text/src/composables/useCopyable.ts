/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TextCopyIconRenderer, TextProps } from '../types'
import type { TextConfig } from '@idux/components/config'

import { type ComputedRef, computed, h } from 'vue'

import { isArray, isFunction, isString, throttle } from 'lodash-es'

import { useClipboard } from '@idux/cdk/clipboard'
import { callEmit, useState } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

export interface CopyableContext {
  copied: ComputedRef<boolean>
  copy: (text: string) => void
  copyIconRenderer: TextCopyIconRenderer
}

export function useCopyable(props: TextProps, config: TextConfig): CopyableContext {
  const copyIcon = computed(() => props.copyIcon ?? config.copyIcon)

  const [copied, setCopied] = useState(false)

  const { copy: _copy } = useClipboard()
  const copy = throttle((text: string) => {
    if (!text || copied.value) {
      return
    }

    _copy(text).then(success => {
      if (success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      }
      callEmit(props.onCopy, success, text)
    })
  }, 300)

  const copyIconRenderer: TextCopyIconRenderer = ({ copied: _copied }) => {
    if (!copyIcon.value) {
      return
    }

    if (isString(copyIcon.value)) {
      return h(IxIcon, { name: copyIcon.value })
    }

    if (isFunction(copyIcon.value)) {
      return copyIcon.value({ copied: _copied })
    }

    if (isArray(copyIcon.value)) {
      return h(IxIcon, { name: _copied ? copyIcon.value[1] : copyIcon.value[0] })
    }
  }

  return {
    copied,
    copy,
    copyIconRenderer,
  }
}
