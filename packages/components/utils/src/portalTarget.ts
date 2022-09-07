/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed } from 'vue'

import { PortalTargetType } from '@idux/cdk/portal'

interface ContainerProps {
  target?: PortalTargetType
  container?: PortalTargetType
}

export function usePortalTarget(
  props: ContainerProps,
  config: ContainerProps,
  common: { overlayContainer?: PortalTargetType },
  mergedPrefix: ComputedRef<string>,
): ComputedRef<PortalTargetType> {
  return computed(() => {
    return (
      props.target ??
      props.container ??
      config.target ??
      config.container ??
      common.overlayContainer ??
      `.${mergedPrefix.value}-container`
    )
  })
}

interface OverlayContainerProps {
  target?: PortalTargetType
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
      props.target ??
      props.overlayContainer ??
      config.target ??
      config.overlayContainer ??
      common.overlayContainer ??
      `.${mergedPrefix.value}-overlay-container`
    )
  })
}
