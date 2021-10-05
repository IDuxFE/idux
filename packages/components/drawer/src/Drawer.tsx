import { computed, defineComponent, provide, onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import { IxPortal } from '@idux/cdk/portal'
import { BlockScrollStrategy } from '@idux/cdk/scroll'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxMask } from '@idux/components/_private'
import DrawerWrapper from './DrawerWrapper'
import { drawerToken, DRAWER_TOKEN } from './token'
import { DrawerProps, drawerProps } from './types'

export default defineComponent({
  name: 'IxDrawer',
  inheritAttrs: false,
  props: drawerProps,
  setup(props, { slots, expose, attrs }) {
    const { prefixCls } = useGlobalConfig('common')
    const config = useGlobalConfig('drawer')
    const mask = computed(() => props.mask ?? config.mask)
    const zIndex = computed(() => props.zIndex ?? config.zIndex)
    const { updateVisible, visible, animatedVisible } = useVisible(props)
    const { open, close } = useTrigger(props, updateVisible)

    provide(drawerToken, { props, slots, config, visible, animatedVisible })
    provide(DRAWER_TOKEN, { props, open, close })

    expose({ open, close })

    return () => {
      if (!animatedVisible.value && props.destroyOnHide) {
        return null
      }

      return (
        <IxPortal target={`${prefixCls}-modal-container`} load={visible.value}>
          <IxMask mask={mask.value} visible={visible.value} zIndex={zIndex.value}></IxMask>
          <DrawerWrapper {...attrs}></DrawerWrapper>
        </IxPortal>
      )
    }
  },
})

const useVisible = (props: DrawerProps) => {
  const visible = ref(props.visible)
  const animatedVisible = ref(props.visible)
  watch(
    () => props.visible,
    value => {
      if (value) {
        animatedVisible.value = value
      }
      visible.value = value!
    },
  )

  const updateVisible = (value: boolean) => {
    animatedVisible.value = value
    visible.value = value
    callEmit(props['onUpdate:visible'], value)
  }

  const scrollStrategy = new BlockScrollStrategy()

  watchEffect(() => {
    if (animatedVisible.value) {
      scrollStrategy.enable()
    } else {
      scrollStrategy.disable()
    }
  })

  onBeforeUnmount(() => scrollStrategy.disable())

  return { updateVisible, visible, animatedVisible }
}

const useTrigger = (props: DrawerProps, updateVisible: (value: boolean) => void) => {
  const open = () => updateVisible(true)

  const close = async (evt?: Event | unknown) => {
    const result = await Promise.resolve(callEmit(props.onClose, evt))
    if (result === false) {
      return
    }
    updateVisible(false)
  }

  return { open, close }
}
