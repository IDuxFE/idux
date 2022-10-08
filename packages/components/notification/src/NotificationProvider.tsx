/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  NotificationOptions,
  NotificationPlacement,
  NotificationPlacementMap,
  NotificationProviderProps,
  NotificationRef,
} from './types'
import type { CommonConfig, NotificationConfig } from '@idux/components/config'

import { ComputedRef, Ref, TransitionGroup, cloneVNode, computed, defineComponent, isVNode, provide, ref } from 'vue'

import { isArray, isUndefined, pickBy } from 'lodash-es'

import { CdkPortal } from '@idux/cdk/portal'
import { Logger, VKey, callEmit, convertArray, convertCssPixel, uniqueId } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { usePortalTarget } from '@idux/components/utils'

import Notification from './Notification'
import { notificationProviderToken } from './token'
import { notificationPlacement, notificationProviderProps, notificationType } from './types'

const groupPositions = {
  topStart: ['top', 'left'],
  topEnd: ['top', 'right'],
  bottomStart: ['bottom', 'left'],
  bottomEnd: ['bottom', 'right'],
} as const

export default defineComponent({
  name: 'IxNotificationProvider',
  inheritAttrs: false,
  props: notificationProviderProps,
  setup(props, { slots, expose }) {
    const commonCfg = useGlobalConfig('common')
    const config = useGlobalConfig('notification')
    const mergedPrefixCls = computed(() => `${commonCfg.prefixCls}-notification`)
    const mergedPortalTarget = usePortalTarget(props, config, commonCfg, mergedPrefixCls)

    const maxCount = computed(() => props.maxCount ?? config.maxCount)
    const { notifications, loadContainer, open, info, success, warning, error, update, destroy, destroyAll } =
      useNotification(maxCount)
    const apis = { open, info, success, warning, error, update, destroy, destroyAll }
    const placementNotifications = usePlacementNotifications(props, config, notifications)

    provide(notificationProviderToken, apis)
    expose(apis)

    if (__DEV__) {
      if (props.target) {
        Logger.warn('components/notification', 'the `target` was deprecated, please use `container` instead.')
      }
    }

    return () => {
      const getChild = (notifications: NotificationOptions[]) => {
        return notifications.map(item => {
          const { key, visible = true, content, contentProps, ...restProps } = item
          const onClose = () => destroy(key!)
          const mergedProps = { key, visible, onClose }
          const contentNode = isVNode(content) ? cloneVNode(content, contentProps, true) : content
          return (
            <Notification {...mergedProps} {...restProps}>
              {contentNode}
            </Notification>
          )
        })
      }

      const placementGroup = Object.entries(placementNotifications.value).map(([key, notificationsRecord]) => {
        const placement = key as NotificationPlacement
        const child = getChild(notificationsRecord)
        const moveName = getMoveName(placement, commonCfg)
        const position = getGroupPosition(props, config, placement)
        return (
          <TransitionGroup
            key={placement}
            tag="div"
            appear
            name={moveName}
            class={[`${mergedPrefixCls.value}-wrapper`, `${mergedPrefixCls.value}-wrapper-${placement}`]}
            style={position}
          >
            {child}
          </TransitionGroup>
        )
      })

      return (
        <>
          {slots.default?.()}
          <CdkPortal target={mergedPortalTarget.value} load={loadContainer.value}>
            {placementGroup}
          </CdkPortal>
        </>
      )
    }
  },
})

function usePlacementNotifications(
  props: NotificationProviderProps,
  config: NotificationConfig,
  notifications: Ref<NotificationOptions[]>,
) {
  return computed(() => {
    const initValue = getPlacementInitValue<NotificationOptions[]>(() => []) as NotificationPlacementMap
    const { destroyOnHover, duration, closeIcon, placement } = config
    if (notifications.value.length === 0) {
      return initValue
    }
    return notifications.value.reduce((acc, item) => {
      const notificationProps = getRealObj({
        destroyOnHover,
        duration,
        closeIcon,
        placement,
        ...item,
      }) as unknown as NotificationOptions
      const curPlacement = notificationProps.placement!
      acc[curPlacement].push(notificationProps)
      return acc
    }, initValue)
  })
}

function useNotification(maxCount: ComputedRef<number>) {
  const notifications = ref<NotificationOptions[]>([])

  const getCurrIndex = (key: VKey) => {
    return notifications.value.findIndex(notification => notification.key === key)
  }

  const add = (item: NotificationOptions) => {
    const currIndex = item.key ? getCurrIndex(item.key) : -1
    if (currIndex !== -1) {
      notifications.value.splice(currIndex, 1, item)
      return item.key!
    }

    if (notifications.value.length >= maxCount.value) {
      notifications.value = notifications.value.slice(-maxCount.value + 1)
    }

    const key = item.key ?? uniqueId('ix-notification')
    notifications.value.push({ ...item, key })
    return key
  }

  const update = (key: VKey, item: Partial<NotificationOptions>) => {
    const currIndex = getCurrIndex(key)
    if (currIndex !== -1) {
      const newItem = { ...notifications.value[currIndex], ...item }
      notifications.value.splice(currIndex, 1, newItem)
    }
  }

  const destroy = (key: VKey | VKey[]) => {
    const keys = convertArray(key)
    keys.forEach(key => {
      const currIndex = getCurrIndex(key)
      if (currIndex !== -1) {
        const item = notifications.value.splice(currIndex, 1)
        callEmit(item[0].onDestroy, key)
      }
    })
  }

  const destroyAll = () => {
    notifications.value = []
  }

  const loadContainer = ref(false)

  const open = (options: NotificationOptions): NotificationRef => {
    const key = add(options)
    const ref = {
      key,
      update: (options: Partial<NotificationOptions>) => update(key, options),
      destroy: () => destroy(key),
    }
    if (!loadContainer.value) {
      loadContainer.value = true
    }
    return ref
  }

  const [info, success, warning, error] = notificationType.map(
    type => (options: Omit<NotificationOptions, 'type'>) => open({ ...options, type }),
  )

  return { notifications, loadContainer, open, info, success, warning, error, update, destroy, destroyAll }
}

function getGroupPosition(
  props: NotificationProviderProps,
  config: NotificationConfig,
  placement: NotificationPlacement,
) {
  const realPlacement = placement ?? config.placement
  const realOffset = props.offset ?? config.offset
  return getPosition(realOffset, realPlacement)
}

function getPosition(offset: NotificationProviderProps['offset'], placement: NotificationPlacement) {
  const offsets = isArray(offset) ? offset : [offset, offset]
  const [verticalOffset, horizontalOffset] = offsets.map(convertCssPixel)
  const [verticalPosition, horizontalPosition] = groupPositions[placement]
  return {
    [verticalPosition]: verticalOffset,
    [horizontalPosition]: horizontalOffset,
  }
}

function getMoveName(placement: NotificationPlacement, commonCfg: CommonConfig) {
  const prefixCls = commonCfg.prefixCls
  const moveNameMap = {
    topEnd: `${prefixCls}-move-end`,
    bottomEnd: `${prefixCls}-move-end`,
    topStart: `${prefixCls}-move-start`,
    bottomStart: `${prefixCls}-move-start`,
  } as const
  return moveNameMap[placement]
}

function getRealObj<T>(obj: Record<string, T>) {
  return pickBy<T>(obj, (val: T) => !isUndefined(val))
}

function getPlacementInitValue<T>(initValueFn: () => T) {
  return notificationPlacement.reduce((acc, item) => {
    const cloneValue = initValueFn()
    return {
      ...acc,
      [item]: cloneValue,
    }
  }, {} as Record<NotificationPlacement, T>)
}
