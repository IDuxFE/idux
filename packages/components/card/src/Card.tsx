/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CardProps } from './types'

import { Slots, VNode, VNodeTypes, computed, defineComponent, isVNode, normalizeClass, provide } from 'vue'

import { isString } from 'lodash-es'

import { callEmit, useControlledProp } from '@idux/cdk/utils'
import { ɵHeader } from '@idux/components/_private/header'
import { IxButton } from '@idux/components/button'
import { useGlobalConfig } from '@idux/components/config'
import { IxCol, IxRow } from '@idux/components/grid'
import { IxIcon } from '@idux/components/icon'

import { cardToken } from './token'
import { cardProps } from './types'

export default defineComponent({
  name: 'IxCard',
  props: cardProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-card`)
    const config = useGlobalConfig('card')
    const hoverable = computed(() => props.hoverable ?? config.hoverable)

    provide(cardToken, { hoverable })

    const [selected, setSelected] = useControlledProp(props, 'selected', false)
    const isDisabled = computed(() => props.disabled)
    const isSelectable = computed(() => props.selectable)
    const handleClick = () => {
      if (isDisabled.value || !isSelectable.value) {
        return
      }

      const newSelected = !selected.value
      setSelected(newSelected)
      callEmit(props.onSelectedChange, newSelected)
    }

    return () => {
      const prefixCls = mergedPrefixCls.value
      const { borderless = config.borderless, loading, size = config.size, shadow } = props

      const children = slots.default?.() ?? []
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hasGrid = children.some(node => node.type && (node.type as any).name === 'IxCardGrid')

      const classes = normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-hoverable`]: !hasGrid && hoverable.value,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-has-shadow`]: shadow,
        [`${prefixCls}-has-grid`]: hasGrid,
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-selectable`]: isSelectable.value,
        [`${prefixCls}-selected`]: isSelectable.value && selected.value,
        [`${prefixCls}-disabled`]: isDisabled.value,
      })
      return (
        <div class={classes} onClick={handleClick}>
          {renderCover(props, slots, prefixCls)}
          <ɵHeader v-slots={slots} size={size} header={props.header} />
          {renderBody(props, children, hasGrid, prefixCls)}
          {renderFooter(props, slots, prefixCls)}
          {renderCornerMark(props, prefixCls)}
        </div>
      )
    }
  },
})

const renderCornerMark = (props: CardProps, prefixCls: string) => {
  const isSelectable = computed(() => props.selectable ?? false)
  if (!isSelectable.value) {
    return undefined
  }

  return (
    <div class={`${prefixCls}-mark-wrap`}>
      <div class={`${prefixCls}-mark`}></div>
      <IxIcon name="check-filled" class={`${prefixCls}-mark-icon`} color="white" />
    </div>
  )
}

const renderCover = (props: CardProps, slots: Slots, prefixCls: string) => {
  let coverNode: VNodeTypes | undefined
  if (slots.cover) {
    coverNode = slots.cover()
  } else if (props.cover) {
    const { cover } = props
    const imgProps = isString(cover) ? { src: cover } : cover
    coverNode = <img {...imgProps} />
  }
  return coverNode ? <div class={`${prefixCls}-cover`}>{coverNode}</div> : undefined
}

const renderBody = (props: CardProps, children: VNode[], hasGrid: boolean, prefixCls: string) => {
  let bodyNode: VNodeTypes | undefined
  if (props.loading) {
    bodyNode = renderLoading(prefixCls)
  } else if (children.length) {
    bodyNode = hasGrid ? <IxRow>{children}</IxRow> : children
  }
  return bodyNode ? <div class={`${prefixCls}-body`}>{bodyNode}</div> : undefined
}

const loadingSpans = [[22], [8, 15], [6, 18], [13, 9], [4, 3, 16], [8, 6, 8]]

const renderLoading = (prefixCls: string) => {
  const loadingChild = loadingSpans.map(spans => {
    const cols = spans.map(span => (
      <IxCol span={span} class={`${prefixCls}-loading-col`}>
        <div class={`${prefixCls}-loading-block`}></div>
      </IxCol>
    ))
    return <IxRow>{cols}</IxRow>
  })
  return <div class={`${prefixCls}-loading`}>{loadingChild}</div>
}

const renderFooter = (props: CardProps, slots: Slots, prefixCls: string) => {
  if (!slots.footer && !props.footer) {
    return undefined
  }

  let footerNode: VNodeTypes
  if (slots.footer) {
    footerNode = slots.footer()
  } else {
    footerNode = props.footer!.map(item => {
      let itemChild: VNodeTypes | null
      if (isVNode(item)) {
        itemChild = item
      } else {
        const { text, ...rest } = item
        itemChild = (
          <IxButton class={`${prefixCls}-footer-button`} waveless={true} {...rest}>
            {text}
          </IxButton>
        )
      }
      return itemChild ? <li>{itemChild}</li> : null
    })
  }

  return <ul class={`${prefixCls}-footer`}>{footerNode}</ul>
}
