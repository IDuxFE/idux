/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IconInstance } from '@idux/components/icon'

import { type ComputedRef, type Ref, computed, watchEffect } from 'vue'

import { useState } from '@idux/cdk/utils'

export interface NavRelatedElSize {
  navSize: ComputedRef<number>
  navWrapperSize: ComputedRef<number>
  navPreNextSize: ComputedRef<number>
  selectedElSize: ComputedRef<number>
  syncNavElSize: () => void
  syncSelectedElSize: () => void
}

export function useNavRelatedElSize(
  isHorizontal: ComputedRef<boolean>,
  navWrapperElRef: Ref<HTMLElement | null>,
  navElRef: Ref<HTMLElement | null>,
  navPreElRef: Ref<IconInstance | null>,
  selectedElRef: Ref<HTMLElement | null>,
): NavRelatedElSize {
  const [navWidth, setNavWidth] = useState(0)
  const [navHeight, setNavHeight] = useState(0)

  const [navWrapperWidth, setNavWrapperWidth] = useState(0)
  const [navWrapperHeight, setNavWrapperHeight] = useState(0)
  const [navPreNextWidth, setNavPreNextWidth] = useState(0)
  const [navPreNextHeight, setNavPreNextHeight] = useState(0)
  const [selectedWidth, setSelectedWidth] = useState(0)
  const [selectedHeight, setSelectedHeight] = useState(0)

  const navSize = computed(() => (isHorizontal.value ? navWidth.value : navHeight.value))
  const navPreNextSize = computed(() => (isHorizontal.value ? navPreNextWidth.value : navPreNextHeight.value))
  const navWrapperSize = computed(() => (isHorizontal.value ? navWrapperWidth.value : navWrapperHeight.value))
  const selectedElSize = computed(() => (isHorizontal.value ? selectedWidth.value : selectedHeight.value))

  // dom 的size无法响应式获取，只能手动获取
  const syncNavElSize = () => {
    setNavWrapperWidth(navWrapperElRef.value?.offsetWidth ?? 0)
    setNavWrapperHeight(navWrapperElRef.value?.offsetHeight ?? 0)

    setNavWidth(navElRef.value?.offsetWidth ?? 0)
    setNavHeight(navElRef.value?.offsetHeight ?? 0)
  }

  const syncSelectedElSize = () => {
    setSelectedWidth(selectedElRef.value?.offsetWidth ?? 0)
    setSelectedHeight(selectedElRef.value?.offsetHeight ?? 0)
  }

  // 向前、向后按钮是动态渲染的，所以可以使用 watchEffect 获取其size
  watchEffect(() => {
    setNavPreNextWidth(navPreElRef.value?.$el.offsetWidth ?? 0)
    setNavPreNextHeight(navPreElRef.value?.$el.offsetHeight ?? 0)
  })

  return {
    navSize,
    navWrapperSize,
    navPreNextSize,
    selectedElSize,
    syncNavElSize,
    syncSelectedElSize,
  }
}

export function useSelectedElVisibleSize(
  navWrapperSize: ComputedRef<number>,
  selectedElOffset: ComputedRef<number>,
  navOffset: ComputedRef<number>,
): ComputedRef<number> {
  return computed(() => {
    return navWrapperSize.value + navOffset.value - selectedElOffset.value
  })
}
