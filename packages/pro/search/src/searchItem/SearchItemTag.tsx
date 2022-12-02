/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { IxTooltip } from '@idux/components/tooltip'

import { proSearchContext } from '../token'
import { searchItemTagProps } from '../types'
import { renderIcon } from '../utils/RenderIcon'
export default defineComponent({
  props: searchItemTagProps,
  setup(props) {
    const context = inject(proSearchContext)!
    const { props: proSearchProps, mergedPrefixCls, changeActive, setActiveSegment, removeSearchState } = context

    const prefixCls = computed(() => `${mergedPrefixCls.value}-search-item-tag`)
    const classes = computed(() => {
      return normalizeClass({
        [prefixCls.value]: true,
        [`${prefixCls.value}-invalid`]: !!props?.error,
      })
    })

    const setSegmentActive = (name: string) => {
      setActiveSegment({
        itemKey: props.itemKey!,
        name,
        overlayOpened: true,
      })
    }
    const handleCloseIconClick = (evt: Event) => {
      evt.stopPropagation()
      removeSearchState(props.itemKey!)
    }

    const handleTagSegmentMouseDown = (name: string) => {
      if (proSearchProps.disabled) {
        return
      }

      setSegmentActive(name)

      if (name === 'name') {
        changeActive(1)
      }
    }

    const renderTag = () => {
      const content = props.segments!.map(data => data.input).join(' ')

      return [
        <span class={`${prefixCls.value}-segments`} title={content}>
          {props.segments!.map(segmeng => (
            <span class={`${prefixCls.value}-segment`} onMousedown={() => handleTagSegmentMouseDown(segmeng.name)}>
              {segmeng.input}
            </span>
          ))}
        </span>,
        <span class={`${prefixCls.value}-content`} title={content}>
          {content}
        </span>,
      ]
    }

    return () => (
      <IxTooltip
        class={`${prefixCls.value}-invalid-tooltip`}
        title={props.error?.message}
        placement="topStart"
        offset={[0, 15]}
      >
        <span class={classes.value} onMousedown={evt => evt.preventDefault()}>
          {renderTag()}
          {!proSearchProps.disabled && (
            <span class={`${prefixCls.value}-close-icon`} onClick={handleCloseIconClick}>
              {renderIcon('close')}
            </span>
          )}
        </span>
      </IxTooltip>
    )
  },
})
