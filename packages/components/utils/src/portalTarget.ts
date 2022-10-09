/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { PortalTargetType } from '@idux/cdk/portal'

interface ContainerProps {
  container?: PortalTargetType
}

export function usePortalTarget(
  props: ContainerProps,
  config: ContainerProps,
  common: { overlayContainer?: PortalTargetType },
  mergedPrefix: ComputedRef<string>,
): ComputedRef<PortalTargetType> {
  return computed(() => {
    return props.container ?? config.container ?? common.overlayContainer ?? `.${mergedPrefix.value}-container`
  })
}

interface OverlayContainerProps {
  overlayContainer?: PortalTargetType
}

export function useOverlayContainer(
  props: OverlayContainerProps,
  config: OverlayContainerProps,
  common: { overlayContainer?: PortalTargetType },
  mergedPrefix: ComputedRef<string>,
): ComputedRef<PortalTargetType> {
  return computed(() => {
    return (
      props.overlayContainer ??
      config.overlayContainer ??
      common.overlayContainer ??
      `.${mergedPrefix.value}-overlay-container`
    )
  })
}
