/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PaginationProps, PaginationSize } from './types'
import type { PaginationConfig } from '@idux/components/config'
import type { ComputedRef, Slots } from 'vue'

import { computed, defineComponent, provide, ref, watch } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { getLocale } from '@idux/components/i18n'

import Default from './Default'
import Simple from './Simple'
import Total from './Total'
import { paginationToken } from './token'
import { paginationProps } from './types'

export default defineComponent({
  name: 'IxPagination',
  props: paginationProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-pagination`)
    const config = useGlobalConfig('pagination')
    useProvider(props, slots, config, mergedPrefixCls)

    const showTotal = computed(() => props.showTotal ?? config.showTotal)
    const simple = computed(() => props.simple ?? config.simple)
    const size = computed(() => props.size ?? config.size)
    const classes = useClasses(props, simple, size, mergedPrefixCls)

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
  props: PaginationProps,
  simple: ComputedRef<boolean>,
  size: ComputedRef<PaginationSize>,
  mergedPrefixCls: ComputedRef<string>,
) => {
  return computed(() => {
    const prefixCls = mergedPrefixCls.value

    return {
      [prefixCls]: true,
      [`${prefixCls}-disabled`]: props.disabled,
      [`${prefixCls}-simple`]: simple.value,
      [`${prefixCls}-${size.value}`]: true,
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

const useProvider = (
  props: PaginationProps,
  slots: Slots,
  config: PaginationConfig,
  mergedPrefixCls: ComputedRef<string>,
) => {
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
    mergedPrefixCls,
    activeIndex,
    activeSize,
    onPageIndexChange,
    onPageSizeChange,
  })
}
