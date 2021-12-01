/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { NotificationNodePropKey, NotificationProps, SlotProps } from './types'
import type { NotificationConfig } from '@idux/components/config'
import type { ComputedRef, Slots } from 'vue'

import { computed, defineComponent, onBeforeUnmount, onMounted, watchEffect } from 'vue'

import { isArray, isString } from 'lodash-es'

import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { IxButton } from '@idux/components/button'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { IxSpace } from '@idux/components/space'

import { notificationProps } from './types'

const defaultCloseIcon = 'close'

const defaultIcon = {
  success: 'check-circle',
  error: 'close-circle',
  info: 'info-circle',
  warning: 'exclamation-circle',
} as const

export default defineComponent({
  name: 'IxNotification',
  props: notificationProps,
  setup(props, { slots }) {
    const commonCfg = useGlobalConfig('common')
    const comPrefix = computed(() => `${commonCfg.prefixCls}-notification`)
    const config = useGlobalConfig('notification')
    const wrapCls = useClasses(props, comPrefix)
    const icon = useIcon(props, config)
    const closeIcon = useCloseIcon(props, config)
    const { visible, close, onMouseEnter, onMouseLeave } = useVisible(props, config)

    return () => {
      const iconNode = icon.value && getIconNode(icon.value)
      const closeIconNode = getIconNode(closeIcon.value)
      return (
        <div v-show={visible.value}>
          <div class={wrapCls.value} onMouseenter={onMouseEnter} onMouseleave={onMouseLeave}>
            <div v-show={icon.value} class={`${comPrefix.value}-icon`}>
              {iconNode}
            </div>
            <span class={`${comPrefix.value}-close-icon`} onClick={close}>
              {closeIconNode}
            </span>
            <div class={`${comPrefix.value}-main`}>
              <div class={`${comPrefix.value}-title`}>{getNode(props, slots, 'title')}</div>
              <div class={`${comPrefix.value}-content`}>{getNode(props, slots, 'content')}</div>
            </div>
            <div class={`${comPrefix.value}-footer`}>
              {getNode(props, slots, 'footer', {
                visible: visible.value,
                close,
              })}
            </div>
          </div>
        </div>
      )
    }
  },
})

function useClasses(props: NotificationProps, comPrefix: ComputedRef<string>) {
  return computed(() => [comPrefix.value, { [`${comPrefix.value}-${props.type}`]: props.type }])
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

function getIconNode(icon: NotificationProps['icon']) {
  return isString(icon) ? <IxIcon name={icon}></IxIcon> : icon
}

function getNode<T extends NotificationProps, K extends NotificationNodePropKey>(
  props: T,
  slots: Slots,
  nodeKey: K,
  slotProps?: SlotProps,
) {
  const slotMap = {
    title: 'title',
    content: 'default',
    footer: 'footer',
  } as const
  const getHandlePropsMap = {
    title: (propsValue: NotificationProps[K]) => propsValue,
    content: (propsValue: NotificationProps[K]) => propsValue,
    footer: (propsValue: NotificationProps[K]) => getFooterNode(propsValue),
  } as const
  return slots[slotMap[nodeKey]]?.(slotProps) ?? getHandlePropsMap[nodeKey]?.(props[nodeKey])
}

function getFooterNode(footer?: NotificationProps['footer']) {
  if (!footer) {
    return ''
  }
  if (!isArray(footer)) {
    return footer
  }
  const footerButtons = footer.map(item => {
    const { text, ...rest } = item
    return <IxButton {...rest}>{text}</IxButton>
  })
  return <IxSpace>{footerButtons}</IxSpace>
}
