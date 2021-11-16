/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, Ref, Transition, VNode, computed, defineComponent, normalizeClass, ref } from 'vue'

import { callEmit, flattenNode, useState } from '@idux/cdk/utils'
import { AlertConfig, useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { AlertProps, alertIconMap, alertProps } from './types'

export default defineComponent({
  name: 'IxAlert',
  props: alertProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-alert`)
    const isVisible = ref(true)
    const alertConfig = useGlobalConfig('alert')
    const iconName = computed(() => props.icon ?? (alertConfig.icon || alertIconMap[props.type]))
    const isShowIcon = computed(() => iconName.value !== '')
    const children = computed(() => flattenNode(slots.default?.() ?? []))

    const { pageIndex, pageText, isShowPagination, isLeftDisabled, isRightDisabled, offsetPageIndex } = usePagination(
      props,
      children,
    )

    const { mergedClosable, handleCloseClick } = useClose(props, alertConfig, isVisible)

    return () => {
      const titleContent = Array.isArray(props.title)
        ? props.title.map(item => <div>{item}</div>)
        : props.title || children.value
      const title = isShowPagination.value
        ? props.title?.[pageIndex.value] || children.value[pageIndex.value]
        : titleContent

      const description = slots.description?.() ?? props.description

      const closeIcon = slots.closeIcon?.() ?? <IxIcon name={props.closeIcon} />
      const icon = (
        <span class={`${mergedPrefixCls.value}-icon`}>{slots.icon?.() ?? <IxIcon name={iconName.value} />}</span>
      )

      const disabledIconCls = `${mergedPrefixCls.value}-disabled-icon`
      const leftIconClass = { [disabledIconCls]: isLeftDisabled.value }
      const rightIconClass = { [disabledIconCls]: isRightDisabled.value }

      const alertClass = normalizeClass({
        [mergedPrefixCls.value]: true,
        [`${mergedPrefixCls.value}-${props.type}`]: true,
        [`${mergedPrefixCls.value}-with-description`]: !!description,
      })

      return (
        <Transition appear name={mergedPrefixCls.value}>
          {isVisible.value && (
            <div class={alertClass}>
              {isShowIcon.value && icon}
              <div class={`${mergedPrefixCls.value}-content`}>
                {title}
                {description && <div>{description}</div>}
              </div>
              {isShowPagination.value && (
                <div class={`${mergedPrefixCls.value}-pagination`}>
                  <IxIcon name="left" class={leftIconClass} onClick={() => offsetPageIndex(-1)}></IxIcon>
                  <span class={`${mergedPrefixCls.value}-page-text`}>{pageText.value}</span>
                  <IxIcon name="right" class={rightIconClass} onClick={() => offsetPageIndex(1)}></IxIcon>
                </div>
              )}
              {mergedClosable.value && (
                <span class={`${mergedPrefixCls.value}-close-icon`} onClick={handleCloseClick}>
                  {closeIcon}
                </span>
              )}
            </div>
          )}
        </Transition>
      )
    }
  },
})

const useClose = (props: AlertProps, alertConfig: Readonly<AlertConfig>, isVisible: Ref<boolean>) => {
  const mergedClosable = computed(() => props.closable || alertConfig.closable)

  const handleCloseClick = async () => {
    const result = await callEmit(props.onBeforeClose)
    if (result === false) {
      return
    }
    isVisible.value = false
    callEmit(props.onClose)
  }

  return {
    mergedClosable,
    handleCloseClick,
  }
}

const usePagination = (props: AlertProps, children: ComputedRef<VNode[]>) => {
  const [pageIndex, setPageIndex] = useState(0)
  const pageTotal = computed(() => children.value.length)
  const isShowPagination = computed(() => props.showPagination && pageTotal.value > 1)
  const pageText = computed(() => `${pageIndex.value + 1}/${pageTotal.value}`)
  const isLeftDisabled = computed(() => pageIndex.value <= 0)
  const isRightDisabled = computed(() => pageIndex.value + 1 >= pageTotal.value)

  const offsetPageIndex = (offset: -1 | 1) => {
    if (offset === -1 && isLeftDisabled.value) {
      return
    }
    if (offset === 1 && isRightDisabled.value) {
      return
    }
    setPageIndex(pageIndex.value + offset)
  }

  return {
    pageIndex,
    pageText,
    isShowPagination,
    isLeftDisabled,
    isRightDisabled,
    offsetPageIndex,
  }
}
