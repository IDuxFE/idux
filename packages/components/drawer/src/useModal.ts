import { DrawerProps } from './types'
import { ref, nextTick, watch, onMounted } from 'vue'
import type { Ref, SetupContext } from 'vue'
import { on } from '@idux/cdk/utils'

export default function (props: DrawerProps, ctx: SetupContext, targetRef: Ref<HTMLElement>): Record<string, unknown> {
  const maskVisible = ref(false)
  const closed = ref(false)
  const rendered = ref(false)

  function afterEnter() {
    ctx.emit('opened')
  }

  function afterLeave() {
    ctx.emit('closed')
    ctx.emit('update:visible', false)
    if (props.destroyOnHide) {
      rendered.value = false
    }
  }

  function beforeLeave() {
    ctx.emit('close')
  }

  function open() {
    maskVisible.value = true
  }

  function close() {
    maskVisible.value = false
  }

  function hide(shouldCancel: boolean) {
    if (shouldCancel) {
      return
    }
    closed.value = true
    maskVisible.value = false
  }

  function handleClose() {
    if (props.beforeClose) {
      props.beforeClose(hide)
    } else {
      close()
    }
  }

  function onModalClick() {
    if (props.maskClosable) {
      handleClose()
    }
  }

  function handlekeyboard(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      e.stopPropagation()
      handleClose()
    }
  }

  watch(
    () => props.visible,
    val => {
      if (val) {
        closed.value = false
        open()
        rendered.value = true // enables lazy rendering
        nextTick(() => {
          if (targetRef.value) {
            targetRef.value.scrollTop = 0
          }
        })
      } else {
        if (maskVisible.value) {
          close()
        }
      }
    },
  )

  onMounted(() => {
    if (props.visible) {
      maskVisible.value = true
      rendered.value = true // enables lazy rendering
      open()
    }
    if (props.keyboard) {
      on(document, 'keydown', handlekeyboard)
    }
  })
  return {
    maskVisible,
    closed,
    rendered,
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
  }
}
