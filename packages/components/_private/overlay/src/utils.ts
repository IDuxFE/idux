import type { PopperOptions } from '@idux/cdk/popper'
import type { OverlayProps } from './types'

export function getPopperOptions(props: OverlayProps): PopperOptions {
  return {
    visible: props.visible,
    scrollStrategy: props.scrollStrategy,
    disabled: props.disabled,
    placement: props.placement,
    trigger: props.trigger,
    allowEnter: props.allowEnter,
    autoAdjust: props.autoAdjust,
    offset: props.offset,
    hideDelay: props.hideDelay,
    showDelay: props.showDelay,
  }
}
