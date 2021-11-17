/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Transition, computed, defineComponent, normalizeClass } from 'vue'

import { isObject } from 'lodash-es'

import { convertArray, flattenNode } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import { useCloseable } from './composables/useCloseable'
import { usePagination } from './composables/usePagination'
import { alertProps } from './types'

export default defineComponent({
  name: 'IxAlert',
  props: alertProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-alert`)

    const config = useGlobalConfig('alert')
    const icon = computed(() => {
      if (props.icon !== undefined) {
        return props.icon
      }
      const iconConfig = config.icon
      return isObject(iconConfig) ? iconConfig[props.type] : iconConfig
    })
    const titleChildren = computed(() => {
      if (slots.default) {
        return flattenNode(slots.default())
      }
      return convertArray(props.title)
    })
    const { pageIndex, pageText, isPagination, leftDisabled, rightDisabled, offsetPageIndex } = usePagination(
      props,
      titleChildren,
    )
    const { closeable, visible, handleClose } = useCloseable(props, config)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${props.type}`]: true,
        [`${prefixCls}-with-description`]: slots.description || props.description,
      })
    })

    return () => {
      // TODO: TransitionGroup with pagination
      const pagination = isPagination.value
      const titleNodes = pagination ? titleChildren.value[pageIndex.value - 1] : titleChildren.value

      const iconNode = slots.icon?.() ?? (icon.value && <IxIcon name={icon.value} />)
      const descriptionNode = slots.description?.() ?? props.description

      const prefixCls = mergedPrefixCls.value
      const paginationDisabledCls = `${prefixCls}-pagination-disabled`
      return (
        <Transition name={prefixCls}>
          {visible.value && (
            <div class={classes.value}>
              {iconNode && <span class={`${prefixCls}-icon`}>{iconNode}</span>}
              <div class={`${prefixCls}-content`}>
                <div class={`${prefixCls}-title`}>{titleNodes}</div>
                {descriptionNode && <div class={`${prefixCls}-description`}>{descriptionNode}</div>}
              </div>
              {pagination && (
                <div class={`${prefixCls}-pagination`}>
                  <IxIcon
                    class={leftDisabled.value ? paginationDisabledCls : undefined}
                    name="left"
                    onClick={() => offsetPageIndex(-1)}
                  />
                  <span class={`${prefixCls}-pagination-text`}>{pageText.value}</span>
                  <IxIcon
                    class={rightDisabled.value ? paginationDisabledCls : undefined}
                    name="right"
                    onClick={() => offsetPageIndex(1)}
                  />
                </div>
              )}
              {closeable.value && (
                <span class={`${prefixCls}-close-icon`} onClick={handleClose}>
                  {slots.closeIcon?.() ?? <IxIcon name={props.closeIcon} />}
                </span>
              )}
            </div>
          )}
        </Transition>
      )
    }
  },
})
