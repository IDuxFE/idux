import type { DefineComponent } from 'vue'
import type { VueTypeDef } from 'vue-types'
import type { OverlayOptions } from '@idux/cdk/overlay/src/types'

import { PropTypes } from '@idux/cdk/utils'

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
   * The class name of arrow.
   */
  arrowClassName?: string
  /**
   * Shows whether to turn on transition animation while hiding.
   * Please pass an empty string if you don't need it.
   */
  visibleTransition?: string
}

export const overlayPropsDef = {
  visible: PropTypes.bool,
  scrollStrategy: PropTypes.oneOf(['none', 'close', 'reposition'] as const),
  disabled: PropTypes.bool,
  placement: PropTypes.oneOf([
    'topStart',
    'top',
    'topEnd',
    'rightStart',
    'right',
    'rightEnd',
    'bottomStart',
    'bottom',
    'bottomEnd',
    'leftStart',
    'left',
    'leftEnd',
  ] as const),
  trigger: PropTypes.oneOf(['click', 'hover', 'focus', 'contextmenu', 'manual'] as const),
  allowEnter: PropTypes.bool,
  autoAdjust: PropTypes.bool,
  offset: (PropTypes.array as unknown) as VueTypeDef<[number, number]>,
  hideDelay: PropTypes.number,
  showDelay: PropTypes.number,
  showArrow: PropTypes.bool.def(true),
  arrowOffset: PropTypes.number.def(4),
  arrowClassName: PropTypes.string,
  visibleTransition: PropTypes.string.def('ix-fade-fast'),
}

export type OverlayComponent = InstanceType<DefineComponent<OverlayProps>>
