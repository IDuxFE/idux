/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MessageProps } from './types'
import type { MessageConfig } from '@idux/components/config'

import { computed, defineComponent, onBeforeUnmount, onMounted, watchEffect } from 'vue'

import { isString } from 'lodash-es'

import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { messageProps } from './types'

// staticIcons.ts
const defaultIconTypes = {
  success: 'check-circle',
  error: 'close-circle',
  info: 'info-circle',
  warning: 'exclamation-circle',
  loading: 'loading',
} as const

export default defineComponent({
  name: 'IxMessage',
  props: messageProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('message')

    const classes = computed(() => {
      const clsPrefix = 'ix-message'
      return [clsPrefix, `${clsPrefix}-${props.type}`]
    })

    const icon = computed(() => {
      const { icon, type } = props
      return icon ?? config.icon?.[type] ?? defaultIconTypes[type]
    })

    const { visible, onMouseEnter, onMouseLeave } = useEvents(props, config)

    return () => {
      const iconNode = isString(icon.value) ? <IxIcon name={icon.value}></IxIcon> : icon.value
      return (
        <div v-show={visible.value} class={classes.value} onMouseenter={onMouseEnter} onMouseleave={onMouseLeave}>
          <div class="ix-message-content">
            {iconNode}
            <span class="ix-message-content-text">{slots.default?.()}</span>
          </div>
        </div>
      )
    }
  },
})

const useEvents = (props: MessageProps, config: MessageConfig) => {
  const duration = computed(() => props.duration ?? config.duration)
  const destroyOnHover = computed(() => props.destroyOnHover ?? config.destroyOnHover)
  const autoClose = computed(() => duration.value > 0)

  const [visible, setVisible] = useControlledProp(props, 'visible', false)

  let timer: number | null = null

  const startTimer = () => {
    timer = setTimeout(() => close(), duration.value)
  }

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  const close = () => {
    clearTimer()
    setVisible(false)
    callEmit(props.onClose)
  }

  const onMouseEnter = () => {
    if (autoClose.value && !destroyOnHover.value) {
      clearTimer()
    }
  }
  const onMouseLeave = () => {
    if (autoClose.value && !destroyOnHover.value) {
      startTimer()
    }
  }

  onMounted(() => {
    watchEffect(() => {
      clearTimer()
      if (visible.value && autoClose.value) {
        startTimer()
      }
    })
  })

  onBeforeUnmount(() => clearTimer())

  return { visible, onMouseEnter, onMouseLeave }
}
