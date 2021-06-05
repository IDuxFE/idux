<template>
  <li :class="classes">
    <ix-sub-menu-title
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
    </ix-sub-menu-title>
    <ix-sub-menu-inline-content v-if="mode === 'inline'" :mode="mode" :opened="opened">
      <slot />
    </ix-sub-menu-inline-content>
    <ix-portal v-else target="ix-menu-container">
      <transition>
        <ix-sub-menu-overlay-content
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
        </ix-sub-menu-overlay-content>
      </transition>
    </ix-portal>
  </li>
</template>

<script lang="ts">
import type { SubMenuProps } from '../types'

import { computed, defineComponent, getCurrentInstance, inject, provide } from 'vue'
import { IxPortal } from '@idux/cdk/portal'
import { useGlobalConfig } from '@idux/components/config'
import IxSubMenuTitle from './SubMenuTitle.vue'
import IxSubMenuInlineContent from './SubMenuInlineContent.vue'
import IxSubMenuOverlayContent from './SubMenuOverlayContent.vue'

import { subMenuPropsDef } from '../types'
import { menuItemGroupToken, menuToken, subMenuToken } from '../token'
import { usePaddingLeft } from '../usePaddingLeft'
import {
  useSubMenuClasses,
  useSubMenuMode,
  useSubMenuOpened,
  useSubMenuOverlay,
  useSubMenuSelected,
} from './useSubMenu'

export default defineComponent({
  name: 'IxSubMenu',
  components: { IxSubMenuTitle, IxSubMenuInlineContent, IxSubMenuOverlayContent, IxPortal },
  props: subMenuPropsDef,
  emits: ['click'],
  setup(props: SubMenuProps, { emit }) {
    const { uid } = getCurrentInstance()!
    const cid = computed(() => props.cid ?? uid)

    const config = useGlobalConfig('subMenu')
    const suffix$$ = computed(() => props.suffix ?? config.suffix)
    const suffixRotates$$ = computed(() => props.suffixRotates ?? config.suffixRotates)

    // menuContext must exist
    const menuContext = inject(menuToken, null)!
    const subMenuContext = inject(subMenuToken, null)
    const menuItemGroupContext = inject(menuItemGroupToken, false)

    const mode = useSubMenuMode(menuContext, subMenuContext)
    const level = subMenuContext ? subMenuContext.level + 1 : 1

    const { opened, setOpen, setChildOpenState, setMouseOverlay } = useSubMenuOpened(
      cid,
      mode,
      menuContext,
      subMenuContext,
    )

    const { isSelected, setChildSelectState } = useSubMenuSelected(cid, menuContext.multiple, subMenuContext)

    const menuItemClick = () => {
      if (!props.disabled && mode.value !== 'inline' && !menuContext.multiple.value) {
        setOpen(false)
      }
    }

    provide(subMenuToken, { level, menuItemClick, setChildOpenState, setChildSelectState })

    const classes = useSubMenuClasses(props, mode, opened, isSelected)
    const paddingLeft = usePaddingLeft(mode, menuContext.indent, level, menuItemGroupContext)
    const { triggerRef, overlayRef, visibility, overlayWidth } = useSubMenuOverlay(mode, opened)

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
