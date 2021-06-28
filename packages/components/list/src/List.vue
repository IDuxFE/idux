<template>
  <div class="ix-list" :class="classes">
    <div v-if="isShowHeader" class="ix-list-header">
      <slot name="header"> {{ header }} </slot>
    </div>
    <ix-spin :spinning="loading">
      <list-wrap :isUseGrid="isUseGrid" :gutter="grid?.gutter">
        <slot></slot>
      </list-wrap>
      <div v-show="isShowEmpty" class="ix-list-empty">
        <slot name="empty">
          <ix-empty :description="empty"></ix-empty>
        </slot>
      </div>
      <div v-if="isShowLoadMore" class="ix-list-loadMore">
        <slot name="loadMore">
          <ix-button :loading="loadMoreLoading" @click="handleLoadMoreClick">{{ loadMore }}</ix-button>
        </slot>
      </div>
    </ix-spin>
    <div v-if="isShowFooter" class="ix-list-footer">
      <slot name="footer"> {{ footer }} </slot>
    </div>
  </div>
</template>
<script lang="ts">
import type { ListProps } from './types'

import { computed, defineComponent, ref, provide } from 'vue'
import { IxSpin } from '@idux/components/spin'
import { IxButton } from '@idux/components/button'
import { IxEmpty } from '@idux/components/empty'
import { ListConfig, useGlobalConfig } from '@idux/components/config'
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
  return computed(() => {
    const borderless = props.borderless ?? listConfig.borderless
    const size = props.size ?? listConfig.size ?? 'medium'
    const split = props.split
    return [
      `ix-list-${size}`,
      split ? 'ix-list-split' : '',
      {
        'ix-list-border': !borderless,
      },
    ]
  })
}
</script>
