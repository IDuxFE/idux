import type { ComputedRef, Slots } from 'vue'
import type { PaginationConfig } from '@idux/components/config'
import type { PaginationProps, PaginationSize } from './types'

import { computed, defineComponent, provide, ref, watch } from 'vue'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { getLocale } from '@idux/components/i18n'
import Total from './Total'
import Default from './Default'
import Simple from './Simple'
import { paginationProps } from './types'
import { paginationToken } from './token'

export default defineComponent({
  name: 'IxPagination',
  props: paginationProps,
  setup(props, { slots }) {
    const { prefixCls } = useGlobalConfig('common')
    const config = useGlobalConfig('pagination')
    useProvider(props, slots, config)

    const showTotal = computed(() => props.showTotal ?? config.showTotal)
    const simple = computed(() => props.simple ?? config.simple)
    const size = computed(() => props.size ?? config.size)
    const classes = useClasses(prefixCls, props, simple, size)

    return () => {
      return (
        <ul class={classes.value}>
          {showTotal.value ? <Total /> : null}
          {simple.value ? <Simple /> : <Default />}
        </ul>
      )
    }
  },
})

const useClasses = (
  prefixCls: string,
  props: PaginationProps,
  simple: ComputedRef<boolean>,
  size: ComputedRef<PaginationSize>,
) => {
  return computed(() => {
    return {
      [`${prefixCls}-pagination`]: true,
      [`${prefixCls}-pagination-disabled`]: props.disabled,
      [`${prefixCls}-pagination-simple`]: simple.value,
      [`${prefixCls}-pagination-${size.value}`]: true,
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

const useProvider = (props: PaginationProps, slots: Slots, config: PaginationConfig) => {
  const locale = getLocale('pagination')
  const pagesize = computed(() => props.pageSize ?? config.pageSize)
  const activeSize = ref(pagesize.value)
  const activeIndex = ref(props.pageIndex)
  const lastIndex = computed(() => Math.ceil(props.total / activeSize.value))

  const onPageIndexChange = (index: number) => {
    const validIndex = validatePageIndex(index, lastIndex.value)
    if (validIndex !== activeIndex.value) {
      activeIndex.value = validIndex
      callEmit(props['onUpdate:pageIndex'], validIndex)
      callEmit(props.onChange, validIndex, activeSize.value)
    }
  }

  const onPageSizeChange = (size: number) => {
    activeSize.value = size
    callEmit(props['onUpdate:pageSize'], size)
    callEmit(props.onChange, activeIndex.value, size)
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

  provide(paginationToken, {
    props,
    slots,
    config,
    locale,
    activeIndex,
    activeSize,
    onPageIndexChange,
    onPageSizeChange,
  })
}
