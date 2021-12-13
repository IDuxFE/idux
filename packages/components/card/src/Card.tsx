/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CardProps } from './types'
import type { ComputedRef, Slots, VNode, VNodeTypes } from 'vue'

import { computed, defineComponent, isVNode, provide } from 'vue'

import { isString } from 'lodash-es'

import { ɵHeader } from '@idux/components/_private/header'
import { IxButton } from '@idux/components/button'
import { useGlobalConfig } from '@idux/components/config'
import { IxCol, IxRow } from '@idux/components/grid'

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

    const children = computed(() => slots.default?.() || [])
    const hasGrid = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return children.value.some(node => node.type && (node.type as any).name === 'IxCardGrid')
    })

    const classes = computed(() => {
      const { borderless = config.borderless, loading, size = config.size } = props
      const hasGridValue = hasGrid.value
      const prefixCls = mergedPrefixCls.value
      return {
        [prefixCls]: true,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-hoverable`]: !hasGridValue && hoverable.value,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-has-grid`]: hasGridValue,
        [`${prefixCls}-${size}`]: true,
      }
    })

    return () => {
      const prefixCls = mergedPrefixCls.value
      return (
        <div class={classes.value}>
          {renderCover(props, slots, prefixCls)}
          <ɵHeader v-slots={slots} header={props.header} />
          {renderBody(props, children, hasGrid, prefixCls)}
          {renderFooter(props, slots, prefixCls)}
        </div>
      )
    }
  },
})

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

const renderBody = (
  props: CardProps,
  children: ComputedRef<VNode[]>,
  hasGrid: ComputedRef<boolean>,
  prefixCls: string,
) => {
  let bodyNode: VNodeTypes | undefined
  if (props.loading) {
    bodyNode = renderLoading(prefixCls)
  } else if (children.value.length) {
    bodyNode = hasGrid.value ? <IxRow>{children.value}</IxRow> : children.value
  }
  return bodyNode ? <div class={`${prefixCls}-body`}>{bodyNode}</div> : undefined
}

const loadingSpans = [[22], [8, 15], [6, 18], [13, 9], [4, 3, 16], [8, 6, 8]]

const renderLoading = (prefixCls: string) => {
  const loadingChild = loadingSpans.map(spans => {
    const cols = spans.map(span => (
      <IxCol span={span} class={`${prefixCls}-loading-col`}>
        <div class="ix-card-loading-block"></div>
      </IxCol>
    ))
    return <IxRow>{cols}</IxRow>
  })
  return <div class="ix-card-loading">{loadingChild}</div>
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
        itemChild = <IxButton {...rest}>{text}</IxButton>
      }
      return itemChild ? <li>{itemChild}</li> : null
    })
  }

  return <ul class={`${prefixCls}-footer`}>{footerNode}</ul>
}
