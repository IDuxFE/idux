import { isVNode, VNode } from 'vue'
import VueTypes, { toType, toValidableType, VueTypeDef, VueTypeValidableDef } from 'vue-types'

// use `undefined` as the default value for each prop
VueTypes.sensibleDefaults = {}

export class PropTypes extends VueTypes {
  // define a custom validator that accepts configuration parameters
  static maxLength(max: number): VueTypeDef<string> {
    return toType('maxLength', {
      type: String,
      validator: (value: string) => value.length <= max,
    })
  }

  static minLength(min: number): VueTypeDef<string> {
    return toType('minLength', {
      type: String,
      validator: (value: string) => value.length >= min,
    })
  }

  // a native-like validator that supports the `.validable` method
  static get positive(): VueTypeValidableDef<number> {
    return toValidableType('positive', {
      type: Number,
      validator: (value: number) => value > 0,
    })
  }

  /** see https://github.com/dwightjack/vue-types/issues/71 */
  static get bool(): VueTypeValidableDef<boolean> & { default: boolean } {
    return toValidableType('bool', {
      type: Boolean,
      default: undefined,
    }) as VueTypeValidableDef<boolean> & { default: boolean }
  }

  static get vNode(): VueTypeValidableDef<VNode> {
    return toType('vNode', {
      type: Object,
      validator: (value: unknown) => isVNode(value),
    }) as VueTypeValidableDef<VNode>
  }
}

/**
 * withUndefined(PropTypes.oneOfType([PropTypes.bool, PropTypes.string])) is work,
 * see https://github.com/dwightjack/vue-types/issues/71
 */
export function withUndefined<T extends { default?: unknown }>(type: T): T {
  type.default = undefined
  return type
}
