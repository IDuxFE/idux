<template>
  <div class="ix-anchor-link">
    <a :class="classes" :href="href" :data-href="href" :title="title" @click="onClick">
      <slot name="title">{{ title }}</slot>
    </a>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject, onBeforeUnmount, onMounted, watch } from 'vue'
import { linkProps } from './types'
import { anchorToken } from './token'

export default defineComponent({
  name: 'IxAnchorLink',
  props: linkProps,
  setup(props) {
    const { activeLink, handleLinkClick, unregisterLink, registerLink } = inject(anchorToken)!
    const isActive = computed(() => activeLink.value === props.href)
    const classes = computed(() => {
      return {
        'ix-anchor-link-title': true,
        'ix-anchor-link-title-active': isActive.value,
      }
    })

    const onClick = (evt: MouseEvent) => handleLinkClick(evt, props)

    watch(
      () => props.href,
      (newHref, oldHref) => {
        unregisterLink(oldHref)
        registerLink(newHref)
      },
    )

    onMounted(() => registerLink(props.href))

    onBeforeUnmount(() => unregisterLink(props.href))

    return { classes, onClick }
  },
})
</script>
