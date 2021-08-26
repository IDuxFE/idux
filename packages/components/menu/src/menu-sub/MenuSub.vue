<template>
  <li :class="classes">
    <menu-sub-title
      ref="triggerRef"
      :opened="opened"
      :disabled="disabled"
      :icon="icon"
      :mode="mode"
      :paddingLeft="paddingLeft"
      :suffix="suffix$$"
      :suffixRotates="suffixRotates$$"
      :title="title"
      @click="onTitleClick"
      @mouseOverlayChang="onMouseOverlayChang"
    >
      <slot name="title"></slot>
      <template v-if="$slots.icon" #icon><slot name="icon"></slot></template>
      <template v-if="$slots.suffix" #suffix><slot name="suffix"></slot></template>
    </menu-sub-title>
    <menu-sub-inline-content v-if="mode === 'inline'" :mode="mode" :opened="opened">
      <slot />
    </menu-sub-inline-content>
    <IxPortal v-else target="ix-menu-container">
      <transition>
        <menu-sub-overlay-content
          v-show="visibility"
          ref="overlayRef"
          :class="overlayClass"
          :style="{ width: overlayWidth }"
          :disabled="disabled"
          :mode="mode"
          :theme="theme"
          @mouseOverlayChang="onMouseOverlayChang"
        >
          <slot />
        </menu-sub-overlay-content>
      </transition>
    </IxPortal>
  </li>
</template>

<script lang="ts">
import type { MenuSubProps } from '../types'

import { computed, defineComponent, getCurrentInstance, inject, provide } from 'vue'
import { IxPortal } from '@idux/cdk/portal'
import { useGlobalConfig } from '@idux/components/config'
import MenuSubTitle from './MenuSubTitle.vue'
import MenuSubInlineContent from './MenuSubInlineContent.vue'
import MenuSubOverlayContent from './MenuSubOverlayContent.vue'

import { menuSubProps } from '../types'
import { menuItemGroupToken, menuToken, menuSubToken } from '../token'
import { usePaddingLeft } from '../usePaddingLeft'
import {
  useMenuSubClasses,
  useMenuSubMode,
  useMenuSubOpened,
  useMenuSubOverlay,
  useMenuSubSelected,
} from './useMenuSub'

export default defineComponent({
  name: 'IxMenuSub',
  components: { MenuSubTitle, MenuSubInlineContent, MenuSubOverlayContent, IxPortal },
  props: menuSubProps,
  emits: ['click'],
  setup(props: MenuSubProps, { emit }) {
    const { uid } = getCurrentInstance()!
    const cid = computed(() => props.cid ?? uid)

    const config = useGlobalConfig('menuSub')
    const suffix$$ = computed(() => props.suffix ?? config.suffix)
    const suffixRotates$$ = computed(() => props.suffixRotates ?? config.suffixRotates)

    // menuContext must exist
    const menuContext = inject(menuToken, null)!
    const menuSubContext = inject(menuSubToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, false)

    const mode = useMenuSubMode(menuContext, menuSubContext)
    const level = menuSubContext ? menuSubContext.level + 1 : 1

    const { opened, setOpen, setChildOpenState, setMouseOverlay } = useMenuSubOpened(
      cid,
      mode,
      menuContext,
      menuSubContext,
    )

    const { isSelected, setChildSelectState } = useMenuSubSelected(cid, menuContext.multiple, menuSubContext)

    const menuItemClick = () => {
      if (!props.disabled && mode.value !== 'inline' && !menuContext.multiple.value) {
        setOpen(false)
      }
    }

    provide(menuSubToken, { level, menuItemClick, setChildOpenState, setChildSelectState })

    const classes = useMenuSubClasses(props, mode, opened, isSelected)
    const paddingLeft = usePaddingLeft(mode, menuContext.indent, level, menuItemGroupContext)
    const { triggerRef, overlayRef, visibility, overlayWidth } = useMenuSubOverlay(mode, opened)

    const onTitleClick = (evt: Event) => {
      if (!props.disabled) {
        setOpen(!opened.value)
        emit('click', { evt, cid: cid.value })
      }
    }

    const onMouseOverlayChang = (value: boolean) => {
      if (mode.value !== 'inline') {
        setMouseOverlay(value)
      }
    }

    return {
      classes,
      paddingLeft,
      suffix$$,
      suffixRotates$$,
      triggerRef,
      overlayRef,
      visibility,
      overlayWidth,
      onTitleClick,
      onMouseOverlayChang,
      mode,
      theme: menuContext.theme,
      opened,
    }
  },
})
</script>
