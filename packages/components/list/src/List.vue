<template>
  <div :class="classes">
    <div v-if="isShowHeader" :class="`${prefixCls}-list-header`">
      <slot name="header"> {{ header }} </slot>
    </div>
    <IxSpin :spinning="loading">
      <list-wrap :isUseGrid="isUseGrid" :gutter="grid?.gutter">
        <slot></slot>
      </list-wrap>
      <div v-show="isShowEmpty" :class="`${prefixCls}-list-empty`">
        <slot name="empty">
          <IxEmpty :description="empty"></IxEmpty>
        </slot>
      </div>
      <div v-if="isShowLoadMore" :class="`${prefixCls}-list-loadMore`">
        <slot name="loadMore">
          <IxButton :loading="loadMoreLoading" @click="handleLoadMoreClick">{{ loadMore }}</IxButton>
        </slot>
      </div>
    </IxSpin>
    <div v-if="isShowFooter" :class="`${prefixCls}-list-footer`">
      <slot name="footer"> {{ footer }} </slot>
    </div>
  </div>
</template>
<script lang="ts">
import type { ListProps } from './types'

import { computed, defineComponent, ref, provide } from 'vue'

import { IxButton } from '@idux/components/button'
import { ListConfig, useGlobalConfig } from '@idux/components/config'
import { IxEmpty } from '@idux/components/empty'
import { IxSpin } from '@idux/components/spin'
import ListWrap from './ListWrap.vue'
import { listProps } from './types'
import { listToken } from './token'

export default defineComponent({
  name: 'IxList',
  components: {
    ListWrap,
    IxSpin,
    IxButton,
    IxEmpty,
  },
  props: listProps,
  emits: ['loadMore'],
  setup(props: ListProps, { slots, emit }) {
    provide(
      listToken,
      computed(() => props.grid),
    )

    const isUseGrid = computed(() => !!props.grid)
    const isShowEmpty = computed(() => !slots.default)
    const isShowLoadMore = computed(() => slots.loadMore || props.loadMore)
    const isShowHeader = computed(() => slots.header || props.header)
    const isShowFooter = computed(() => slots.footer || props.footer)
    const { prefixCls } = useGlobalConfig('common')
    const listConfig = useGlobalConfig('list')
    const classes = useClasses(props, listConfig)

    const loadMoreLoading = ref(false)
    const handleLoadMoreClick = () => {
      loadMoreLoading.value = true
      const done = () => {
        loadMoreLoading.value = false
      }
      emit('loadMore', done)
    }

    return {
      prefixCls,
      isUseGrid,
      isShowEmpty,
      isShowLoadMore,
      isShowHeader,
      isShowFooter,
      loadMoreLoading,
      handleLoadMoreClick,
      classes,
    }
  },
})

const useClasses = (props: ListProps, listConfig: ListConfig) => {
  const { prefixCls } = useGlobalConfig('common')
  return computed(() => {
    const borderless = props.borderless ?? listConfig.borderless
    const size = props.size ?? listConfig.size ?? 'medium'
    const split = props.split
    return [
      `${prefixCls}-list`,
      `${prefixCls}-list-${size}`,
      split ? `${prefixCls}-list-split` : '',
      {
        [`${prefixCls}-list-border`]: !borderless,
      },
    ]
  })
}
</script>
