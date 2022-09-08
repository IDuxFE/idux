/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Ref, Transition, computed, defineComponent, nextTick, normalizeClass, provide, ref } from 'vue'

import { CdkPortal } from '@idux/cdk/portal'
import { cancelRAF, rAF } from '@idux/cdk/utils'
import { ɵMask } from '@idux/components/_private/mask'
import { LoadingBarConfig, useGlobalConfig } from '@idux/components/config'
import { usePortalTarget } from '@idux/components/utils'

import { loadingBarProviderToken } from './token'
import {
  LoadingBarOptions,
  LoadingBarProviderProps,
  LoadingBarProviderRef,
  StatusType,
  loadingBarProviderProps,
} from './types'

export default defineComponent({
  name: 'IxLoadingBarProvider',
  inheritAttrs: false,
  props: loadingBarProviderProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('loadingBar')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-loading-bar`)
    const mergedPortalTarget = usePortalTarget(props, config, common, mergedPrefixCls)

    const { start, finish, error, status, visible, progress, mask } = useLoadingBarProvider(props, config)

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}`]: true,
        [`${prefixCls}--${status.value}`]: !!status.value,
      })
    })
    const apis = { start, finish, error }

    provide(loadingBarProviderToken, apis)
    expose(apis)

    return () => {
      return (
        <>
          <CdkPortal target={mergedPortalTarget.value}>
            <ɵMask class={`${mergedPrefixCls.value}-mask`} mask={mask.value} visible={visible.value} />
            <Transition appear name={`${common.prefixCls}-move-up`}>
              <div v-show={visible.value} class={classes.value} style={{ maxWidth: `${progress.value}%` }} />
            </Transition>
          </CdkPortal>
          {slots.default?.()}
        </>
      )
    }
  },
})

interface LoadingBarProviderBindings extends LoadingBarProviderRef {
  visible: Ref<boolean>
  status: Ref<StatusType>
  mask: Ref<boolean>
  progress: Ref<number>
}

const useLoadingBarProvider = (
  props: LoadingBarProviderProps,
  config: LoadingBarConfig,
): LoadingBarProviderBindings => {
  const { loading: loadingConfig, error: errorConfig, finish: finishConfig } = config.animation
  const maskEnable = computed(() => props.mask ?? config.mask)
  const animation = (callback: (elapsed: number) => void) => {
    let start = 0
    return async function (t: number) {
      if (start === 0) {
        start = t
      }
      callback(t - start)
    }
  }

  const visible = ref(false)
  const status = ref<StatusType>('finish')
  const mask = ref(false)
  const progress = ref(0)

  let raf: number
  const start = (options?: LoadingBarOptions) => {
    raf && cancelRAF(raf)

    progress.value = 0
    status.value = 'loading'
    visible.value = true
    mask.value = options?.mask ?? maskEnable.value

    const animationFn = animation(elapsed => {
      if (elapsed < loadingConfig.duration) {
        progress.value = (elapsed / loadingConfig.duration) * loadingConfig.progress
        raf = rAF(animationFn)
      } else {
        cancelRAF(raf)
        progress.value = loadingConfig.progress
      }
    })
    raf = rAF(animationFn)
  }
  const error = () => {
    raf && cancelRAF(raf)

    progress.value = 0
    status.value = 'error'
    visible.value = true
    mask.value = maskEnable.value

    const animationFn = animation(async elapsed => {
      if (elapsed < errorConfig.duration) {
        progress.value = (elapsed / errorConfig.duration) * errorConfig.progress

        raf = rAF(animationFn)
      } else {
        cancelRAF(raf)
        progress.value = errorConfig.progress

        await nextTick()
        visible.value = false
      }
    })
    raf = rAF(animationFn)
  }

  const finish = () => {
    if (status.value !== 'loading') {
      return
    }
    raf && cancelRAF(raf)

    const loadingProgress = Math.min(progress.value, loadingConfig.progress)

    const animationFn = animation(async elapsed => {
      if (elapsed < finishConfig.duration) {
        progress.value = loadingProgress + (elapsed / finishConfig.duration) * (finishConfig.progress - loadingProgress)
        raf = rAF(animationFn)
      } else {
        cancelRAF(raf)
        progress.value = finishConfig.progress

        await nextTick()
        mask.value = maskEnable.value
        visible.value = false
        status.value = 'finish'
      }
    })
    raf = rAF(animationFn)
  }

  return {
    start,
    error,
    finish,
    status,
    visible,
    progress,
    mask,
  }
}
