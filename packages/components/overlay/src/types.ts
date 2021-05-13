import type { DefineComponent } from 'vue'
import type { VueTypeDef } from 'vue-types'
import type { OverlayOptions } from '@idux/cdk/overlay'

import { PropTypes } from '@idux/cdk/utils'
import { overlayTriggerDef, overlayPlacementDef, overlayScrollStrategyDef } from '@idux/cdk/overlay'

export interface OverlayProps extends OverlayOptions {
  /**
   * Whether to show arrow.
   */
  showArrow?: boolean
  /**
   * The distance between the arrow and the starting point at both ends.
   * Acting when the overlay uses border-radius.
   */
  arrowOffset?: number
  /**
   * Shows whether to turn on transition animation while hiding.
   * Please pass an empty string if you don't need it.
   */
  visibleTransition?: string
  /**
   * whether destroy when popover is hidden
   */
  destroyOnHide?: boolean
  /**
   * The class name prefix of overlay.
   */
  clsPrefix?: string
}

export const overlayPropsDef = {
  visible: PropTypes.bool,
  scrollStrategy: overlayScrollStrategyDef,
  disabled: PropTypes.bool,
  placement: overlayPlacementDef,
  trigger: overlayTriggerDef,
  allowEnter: PropTypes.bool,
  autoAdjust: PropTypes.bool,
  offset: (PropTypes.array as unknown) as VueTypeDef<[number, number]>,
  hideDelay: PropTypes.number,
  showDelay: PropTypes.number,
  showArrow: PropTypes.bool.def(true),
  arrowOffset: PropTypes.number.def(0),
  visibleTransition: PropTypes.string.def('ix-fade-fast'),
  destroyOnHide: PropTypes.bool,
  clsPrefix: PropTypes.string.def('ix-overlay'),
}

export type OverlayComponent = InstanceType<DefineComponent<OverlayProps>>
