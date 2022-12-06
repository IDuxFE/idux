/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { isFunction } from 'lodash-es'

import { type PortalTargetType } from '@idux/cdk/portal'

export type OverlayContainerType =
  | string
  | HTMLElement
  | null
  | undefined
  | ((element?: Element) => string | HTMLElement | null | undefined)

interface ContainerProps {
  container?: PortalTargetType
}

export function usePortalTarget(
  props: ContainerProps,
  config: ContainerProps,
  common: { overlayContainer?: OverlayContainerType },
  mergedPrefix: ComputedRef<string>,
): ComputedRef<() => string | HTMLElement> {
  return computed(() => {
    const container = props.container ?? config.container ?? common.overlayContainer
    return () => (isFunction(container) ? container() : container) ?? `.${mergedPrefix.value}-container`
  })
}

interface OverlayContainerProps {
  overlayContainer?: OverlayContainerType
}

export function useOverlayContainer(
  props: OverlayContainerProps,
  config: OverlayContainerProps,
  common: { overlayContainer?: OverlayContainerType },
  mergedPrefix: ComputedRef<string>,
): ComputedRef<(element?: Element) => string | HTMLElement> {
  return computed(() => {
    const container = props.overlayContainer ?? config.overlayContainer ?? common.overlayContainer
    return element =>
      (isFunction(container) ? container(element) : container) ?? `.${mergedPrefix.value}-overlay-container`
  })
}
