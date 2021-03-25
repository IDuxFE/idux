<template>
  <section :id="id" class="global-code-box" :class="{ expand: expanded }">
    <section class="global-code-box-demo">
      <slot name="rawCode"></slot>
    </section>
    <section class="global-code-box-meta markdown">
      <div class="global-code-box-title">
        {{ title }}
        <a class="global-code-box-edit" :href="editHref" target="_blank" rel="noopener noreferrer">
          <ix-icon name="edit" />
        </a>
      </div>
      <div class="global-code-box-description">
        <slot name="description"></slot>
      </div>
      <div class="global-code-box-actions">
        <ix-icon name="copy" @click="onCopy" />
        <ix-icon v-show="expanded" name="code-expand" @click="expanded = !expanded" />
        <ix-icon v-show="!expanded" name="code-collapse" @click="expanded = !expanded" />
      </div>
    </section>
    <section class="highlight-wrapper" :class="{ 'highlight-wrapper-expand': expanded }">
      <slot name="highlightCode"></slot>
    </section>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext } from 'vue'

export default defineComponent({
  name: 'GlobalCodeBox',
  props: {
    title: { type: String, default: '' },
    packageName: { type: String, default: '' },
    componentName: { type: String, default: '' },
    demoName: { type: String, default: '' },
    copied: { type: Boolean, default: false },
  },
  emits: ['copy'],
  setup(props, { emit }: SetupContext) {
    const id = computed(() => `${props.packageName}-${props.componentName}-demo-${props.demoName}`)

    const editHref = computed(() => {
      const gitLink = `${props.packageName}/${props.componentName}/demo/${props.demoName}`
      return `https://github.com/IduxFE/idux/edit/main/packages/${gitLink}.md`
    })

    const expanded = ref(false)

    const onCopy = () => emit('copy')

    return { id, editHref, expanded, onCopy }
  },
})
</script>
