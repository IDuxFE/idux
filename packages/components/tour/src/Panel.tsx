/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResolvedTourStep } from './types'

import { defineComponent, inject, onMounted } from 'vue'

import { callEmit, isEmptyNode, useState } from '@idux/cdk/utils'
import { ɵHeader } from '@idux/components/_private/header'
import { IxButton } from '@idux/components/button'

import { tourToken } from './token'

export default defineComponent({
  setup(_, { slots }) {
    const {
      mergedPrefixCls,
      mergedProps,
      activeStep,
      activeIndex,
      goTo,
      finish,
      isCurrentMax,
      setVisible,
      onStepChange,
    } = inject(tourToken)!

    const [renderData, setRenderData] = useState<
      { step: ResolvedTourStep | undefined; activeIndex: number; isCurrentMax: boolean } | undefined
    >(undefined)
    const updateRenderData = () => {
      setRenderData({ step: activeStep.value, activeIndex: activeIndex.value, isCurrentMax: isCurrentMax.value })
    }

    onMounted(updateRenderData)
    onStepChange(updateRenderData)

    const handleClose = () => {
      setVisible(false)
      callEmit(mergedProps.value.onClose)
    }

    const renderHeader = () => {
      const { step: { title = undefined } = {}, activeIndex = 0 } = renderData.value ?? {}
      const { closable } = mergedProps.value

      if (!title && !slots.title && !slots.header && !closable) {
        return
      }

      return (
        <ɵHeader
          size="sm"
          closable={closable}
          closeIcon="close"
          header={title}
          onClose={handleClose}
          v-slots={{
            header: slots.header,
            title: slots.title ? () => slots.title!({ activeIndex, title }) : undefined,
          }}
        />
      )
    }

    const renderDescription = (prefixCls: string) => {
      const { step: { description = undefined } = {}, activeIndex = 0 } = renderData.value ?? {}
      const children = slots.description ? slots.description({ activeIndex, description }) : description

      return !isEmptyNode(children) ? <div class={`${prefixCls}-description`}>{children}</div> : undefined
    }

    const renderIndicators = (prefixCls: string) => {
      const total = mergedProps.value.steps?.length ?? 0
      const { activeIndex = 0 } = renderData.value ?? {}

      return (
        <div class={`${prefixCls}-indicators`}>
          {slots.indicators ? slots.indicators({ activeIndex, total }) : `${activeIndex + 1} / ${total}`}
        </div>
      )
    }

    const _goTo = (offset: number) => {
      if (!renderData.value?.step) {
        return
      }

      goTo(renderData.value.step.index + offset)
    }
    const next = () => {
      _goTo(1)
    }
    const prev = () => {
      _goTo(-1)
    }

    const renderButtons = (prefixCls: string) => {
      if (!renderData.value?.step) {
        return
      }

      const {
        step: { nextButton, nextButtonText, prevButton, prevButtonText },
        activeIndex,
        isCurrentMax,
      } = renderData.value

      return (
        <div class={`${prefixCls}-buttons`}>
          {activeIndex > 0 && prevButton && (
            <IxButton class={`${prefixCls}-button`} {...prevButton} onClick={prev}>
              {prevButtonText}
            </IxButton>
          )}
          {nextButton && (
            <IxButton class={`${prefixCls}-button`} {...nextButton} onClick={isCurrentMax ? finish : next}>
              {nextButtonText}
            </IxButton>
          )}
        </div>
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-panel`

      const header = renderHeader()
      const innerCls = [`${prefixCls}-inner`, header ? undefined : `${prefixCls}-inner-no-header`]

      return (
        <div class={prefixCls} onClick={evt => evt.stopImmediatePropagation()}>
          {header}
          <div class={innerCls}>
            {renderDescription(prefixCls)}
            <div class={`${prefixCls}-footer`}>
              {renderIndicators(prefixCls)}
              {renderButtons(prefixCls)}
            </div>
          </div>
        </div>
      )
    }
  },
})
