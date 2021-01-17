// from Element: https://github.com/hug-sun/element3/blob/master/packages/element3/src/use/emitter.js
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentInstance, onUnmounted, ComponentInternalInstance } from 'vue'
import mitt, { EventType, Handler } from 'mitt'

const DISPATCH = 'dispatch'
const BROADCAST = 'broadcast'

const wrapper: unique symbol = Symbol('wrapper')

const emitter = mitt()

type Event = { value: any; type: 'dispatch' | 'broadcast'; emitComponentInstance: ComponentInternalInstance }

interface HandleWrapper {
  (e?: Event): void
}

interface EmitterHandler extends Handler {
  [wrapper]?: HandleWrapper
}

interface Emitter {
  on(type: EventType, handler: EmitterHandler): void

  once(type: EventType, handler: EmitterHandler): void

  broadcast(type: EventType, event?: any): void

  dispatch(type: EventType, event?: any): void

  off(type: EventType, handler: EmitterHandler): void
}

/**
 * check componentChild is componentParent child components
 * @param {*} componentChild
 * @param {*} componentParent
 */
function isChildComponent(componentChild: ComponentInternalInstance, componentParent: ComponentInternalInstance) {
  const parentUId = componentParent.uid
  while (componentChild && componentChild?.parent?.uid !== parentUId) {
    componentChild = componentChild.parent as ComponentInternalInstance
  }

  return Boolean(componentChild)
}

export function useEmitter(): Emitter {
  const currentComponentInstance = getCurrentInstance() as ComponentInternalInstance

  function on(type: EventType, handler: EmitterHandler) {
    const handleWrapper: HandleWrapper = e => {
      const { value, type, emitComponentInstance } = e as Event
      if (type === BROADCAST) {
        if (isChildComponent(currentComponentInstance, emitComponentInstance)) {
          handler && handler(...value)
        }
      } else if (type === DISPATCH) {
        if (isChildComponent(emitComponentInstance, currentComponentInstance)) {
          handler && handler(...value)
        }
      } else {
        handler && handler(...value)
      }
    }

    // Save the real handler because the need to call off
    handler[wrapper] = handleWrapper
    emitter.on(type, handleWrapper)

    // Auto off handler when component unmounted
    onUnmounted(() => {
      off(type, handler)
    })
  }

  function off(type: EventType, handler: EmitterHandler) {
    emitter.off(type, handler[wrapper] as EmitterHandler)
  }

  function once(type: EventType, handler: EmitterHandler) {
    const handleOn = (...args: any[]) => {
      handler && handler(...args)
      off(type, handleOn)
    }
    on(type, handleOn)
  }

  function broadcast(type: EventType, ...args: any[]) {
    emitter.emit(type, {
      type: BROADCAST,
      emitComponentInstance: currentComponentInstance,
      value: args,
    })
  }

  function dispatch(type: EventType, ...args: any[]) {
    emitter.emit(type, {
      type: DISPATCH,
      emitComponentInstance: currentComponentInstance,
      value: args,
    })
  }

  return {
    on,
    off,
    once,
    broadcast,
    dispatch,
  }
}
