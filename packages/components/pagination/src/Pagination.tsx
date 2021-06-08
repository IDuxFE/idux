import type { ComputedRef, VNodeTypes } from 'vue'
import type { PaginationProps } from './types'

import { computed, defineComponent, ref, watch } from 'vue'
import { getLocale } from '@idux/components/i18n'
import { PaginationConfig, PaginationSize, useGlobalConfig } from '@idux/components/config'
import IxPaginationTotal from './Total'
import IxPaginationDefault from './Default.vue'
import IxPaginationSimple from './Simple.vue'
import { paginationProps } from './types'

export default defineComponent({
  name: 'IxPagination',
  props: paginationProps,
  emits: ['update:pageIndex', 'update:pageSize'],
  setup(props, { slots, emit }) {
    const locale = getLocale('pagination')
    const config = useGlobalConfig('pagination')

    const itemRender$$ = computed(() => slots.item ?? props.itemRender ?? config.itemRender)
    const pageSizes$$ = computed(() => props.pageSizes ?? config.pageSizes)
    const showQuickJumper$$ = computed(() => props.showQuickJumper ?? config.showQuickJumper)
    const showSizeChanger$$ = computed(() => props.showSizeChanger ?? config.showSizeChanger)
    const showTitle$$ = computed(() => props.showTitle ?? config.showTitle)
    const showTotal$$ = computed(() => props.showTotal ?? config.showTotal)
    const simple$$ = computed(() => props.simple ?? config.simple)
    const size$$ = computed(() => props.size ?? config.size)
    const totalRender$$ = computed(() => slots.total ?? props.totalRender ?? config.totalRender)

    const classes = useClasses(props, simple$$, size$$)
    const { activeIndex, activeSize, onPageIndexChange, onPageSizeChange } = useActive(props, config, emit)

    return {
      classes,
      activeIndex,
      activeSize,
      locale,
      itemRender$$,
      pageSizes$$,
      showQuickJumper$$,
      showSizeChanger$$,
      showTitle$$,
      showTotal$$,
      simple$$,
      size$$,
      totalRender$$,
      onPageIndexChange,
      onPageSizeChange,
    }
  },

  render() {
    const child: VNodeTypes[] = []
    if (this.showTotal$$) {
      child.push(
        <IxPaginationTotal
          locale={this.locale}
          pageIndex={this.activeIndex}
          pageSize={this.activeSize}
          total={this.total}
          totalRender={this.totalRender$$}
        />,
      )
    }

    if (this.simple$$) {
      child.push(
        <IxPaginationSimple
          disabled={this.disabled}
          itemRender={this.itemRender$$}
          locale={this.locale}
          pageIndex={this.activeIndex}
          pageSize={this.activeSize}
          showTitle={this.showTitle$$}
          size={this.size$$}
          total={this.total}
          onPageIndexChange={this.onPageIndexChange}
        />,
      )
    } else {
      child.push(
        <IxPaginationDefault
          disabled={this.disabled}
          itemRender={this.itemRender$$}
          locale={this.locale}
          pageIndex={this.activeIndex}
          pageSize={this.activeSize}
          pageSizes={this.pageSizes$$}
          showQuickJumper={this.showQuickJumper$$}
          showSizeChanger={this.showSizeChanger$$}
          showTitle={this.showTitle$$}
          size={this.size$$}
          total={this.total}
          onPageIndexChange={this.onPageIndexChange}
          onPageSizeChange={this.onPageSizeChange}
        />,
      )
    }

    return <ul class={this.classes}>{child}</ul>
  },
})

const useClasses = (props: PaginationProps, simple: ComputedRef<boolean>, size: ComputedRef<PaginationSize>) => {
  return computed(() => {
    return {
      'ix-pagination': true,
      'ix-pagination-disabled': props.disabled,
      'ix-pagination-simple': simple.value,
      [`ix-pagination-${size.value}`]: true,
    }
  })
}

const validatePageIndex = (index: number, lastIndex: number) => {
  if (index > lastIndex) {
    return lastIndex
  } else if (index < 1) {
    return 1
  } else {
    return index
  }
}

const useActive = (
  props: PaginationProps,
  config: PaginationConfig,
  emit: (event: 'update:pageIndex' | 'update:pageSize', ...args: number[]) => void,
) => {
  const pagesize = computed(() => props.pageSize ?? config.pageSize)
  const activeSize = ref(pagesize.value)
  const activeIndex = ref(props.pageIndex)
  const lastIndex = computed(() => Math.ceil(props.total / activeSize.value))

  const onPageIndexChange = (index: number) => {
    const validIndex = validatePageIndex(index, lastIndex.value)
    if (validIndex !== activeIndex.value) {
      activeIndex.value = validIndex
      emit('update:pageIndex', validIndex)
    }
  }

  const onPageSizeChange = (size: number) => {
    activeSize.value = size
    emit('update:pageSize', size)
  }

  watch(pagesize, size => (activeSize.value = size))

  watch(
    () => props.pageIndex,
    index => (activeIndex.value = index),
  )

  watch(
    [activeIndex, lastIndex],
    ([currPageIndex, currLastIndex]) => {
      if (currPageIndex > currLastIndex) {
        onPageIndexChange(currLastIndex)
      }
    },
    { immediate: true },
  )

  return { activeSize, activeIndex, onPageIndexChange, onPageSizeChange }
}
