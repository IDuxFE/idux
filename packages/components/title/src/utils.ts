import type { ComputedRef } from 'vue'
import type { TitleOriginalProps } from './types'

import { computed } from 'vue'
import { isString } from '@idux/cdk/utils'

export function useTitleProps(
  props: { title: string | TitleOriginalProps | undefined },
  defaultProps: TitleOriginalProps = {},
): ComputedRef<TitleOriginalProps> {
  return computed(() => {
    const title = props.title
    if (isString(title)) {
      return { ...defaultProps, title }
    } else {
      return { ...defaultProps, ...title }
    }
  })
}
