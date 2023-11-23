/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { NotificationProps, SlotProps } from './types'
import type { NotificationConfig } from '@idux/components/config'
import type { ComputedRef, Slots } from 'vue'

import { computed, defineComponent, onBeforeUnmount, onMounted, watchEffect } from 'vue'

import { isArray, isFunction } from 'lodash-es'

import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { IxButton } from '@idux/components/button'
import { useGlobalConfig } from '@idux/components/config'
import { IxSpace } from '@idux/components/space'
import { useThemeToken } from '@idux/components/theme'
import { convertIconVNode, convertStringVNode } from '@idux/components/utils'

import { notificationProps } from './types'
import { getThemeTokens, transforms } from '../theme'

const defaultCloseIcon = 'close'

const defaultIcon = {
  success: 'check-circle-filled',
  error: 'close-circle-filled',
  info: 'info-circle-filled',
  warning: 'exclamation-circle-filled',
} as const

export default defineComponent({
  name: 'IxNotification',
  props: notificationProps,
  setup(props, { slots }) {
    const commonCfg = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('notification')
    registerToken(getThemeTokens, transforms)

    const comPrefix = computed(() => `${commonCfg.prefixCls}-notification`)
    const config = useGlobalConfig('notification')
    const wrapCls = useClasses(props, comPrefix, globalHashId, hashId)
    const icon = useIcon(props, config)
    const closeIcon = useCloseIcon(props, config)
    const { visible, close, onMouseEnter, onMouseLeave } = useVisible(props, config)

    return () => {
      const iconNode = convertIconVNode(undefined, icon.value)
      const closeIconNode = convertIconVNode(undefined, closeIcon.value)

      const titleNode = convertStringVNode(slots, props, 'title')
      const contentNode = convertStringVNode(slots.default, props.content)
      const footerNode = getFooterNode(slots, props.footer, {
        visible: visible.value,
        close,
      })

      let mainCls = `${comPrefix.value}-main`
      if (contentNode) {
        mainCls += ` ${comPrefix.value}-main-with-content`
      }

      return (
        <div v-show={visible.value}>
          <div class={wrapCls.value} onMouseenter={onMouseEnter} onMouseleave={onMouseLeave}>
            <div v-show={icon.value} class={`${comPrefix.value}-icon`}>
              {iconNode}
            </div>
            <span class={`${comPrefix.value}-close-icon`} onClick={close}>
              {closeIconNode}
            </span>
            <div class={mainCls}>
              <div class={`${comPrefix.value}-title`}>{titleNode}</div>
              {contentNode && <div class={`${comPrefix.value}-content`}>{contentNode}</div>}
            </div>
            <div class={`${comPrefix.value}-footer`}>
              {footerNode && <div class={`${comPrefix.value}-footer`}>{footerNode}</div>}
            </div>
          </div>
        </div>
      )
    }
  },
})

function useClasses(
  props: NotificationProps,
  comPrefix: ComputedRef<string>,
  globalHashId: ComputedRef<string>,
  hashId: ComputedRef<string>,
) {
  return computed(() => [
    comPrefix.value,
    globalHashId.value,
    hashId.value,
    { [`${comPrefix.value}-${props.type}`]: props.type },
  ])
}

function useIcon(props: NotificationProps, config: NotificationConfig) {
  return computed(() => {
    const iconMap = { ...defaultIcon, ...config.icon }
    return props.icon ?? (props.type && iconMap[props.type])
  })
}

function useCloseIcon(props: NotificationProps, config: NotificationConfig) {
  return computed(() => props.closeIcon ?? config.closeIcon ?? defaultCloseIcon)
}

function useVisible(props: NotificationProps, config: NotificationConfig) {
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

  return { visible, close, onMouseEnter, onMouseLeave }
}

function getFooterNode(slots: Slots, footer: NotificationProps['footer'] | undefined, params: SlotProps) {
  if (slots.footer) {
    return slots.footer(params)
  }

  if (!footer) {
    return ''
  }

  if (isFunction(footer)) {
    return footer(params)
  }

  if (isArray(footer)) {
    const footerButtons = footer.map(item => {
      const { text, ...rest } = item
      return <IxButton {...rest}>{text}</IxButton>
    })
    return <IxSpace>{footerButtons}</IxSpace>
  }

  return footer
}
