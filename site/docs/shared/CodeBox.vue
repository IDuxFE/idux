<template>
  <section :id="link" class="code-box" :class="{ expand: expanded }">
    <section class="code-box-demo">
      <slot name="rawCode"></slot>
    </section>
    <section class="code-box-meta markdown">
      <div class="code-box-title">
        <a @click="goLink()">
          {{ title }}
          <a class="edit-button" :href="editHref" target="_blank" rel="noopener noreferrer">
            <ix-icon name="edit" />
          </a>
        </a>
      </div>
      <div class="code-box-description">
        <slot name="description"></slot>
      </div>
      <div class="code-box-actions">
        <ix-icon name="copy" @click="onCopy" />
        <span class="code-expand-icon" @click="changeExpanded(!expanded)">
          <ix-icon :name="expanded ? 'left' : 'right'" />
          <ix-icon :name="!expanded ? 'left' : 'right'" />
        </span>
      </div>
    </section>
    <section class="highlight-wrapper" :class="{ 'highlight-wrapper-expand': expanded }">
      <div class="highlight">
        <pre class="language-vue">
          <code><slot name="highlightCode"></slot></code>
        </pre>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext } from 'vue'

export default defineComponent({
  name: 'CodeBox',
  props: {
    title: { type: String, default: '' },
    packageName: { type: String, default: '' },
    componentName: { type: String, default: '' },
    demoName: { type: String, default: '' },
    copied: { type: Boolean, default: false },
  },
  emits: ['copy'],
  setup(props, { emit }: SetupContext) {
    const link = computed(() => `${props.packageName}-${props.componentName}-demo-${props.demoName}`)
    const goLink = () => (window.location.hash = link.value)
    const editHref = computed(() => {
      const gitLink = link.value.replace('-', '/')
      return `https://github.com/IduxFE/components/edit/main/packages/${gitLink}.md`
    })

    const expanded = ref(false)
    const changeExpanded = (isExpanded: boolean) => {
      expanded.value = isExpanded
    }

    const onCopy = () => emit('copy')

    return { link, goLink, editHref, expanded, changeExpanded, onCopy }
  },
})
</script>

<style lang="less">
.code-box {
  display: block;

  .simulate-iframe {
    transform: translateX(0px);
    display: block;
    > * {
      display: block;
      height: 100%;
      overflow: auto;
      transform: translateX(0px);
      > * {
        overflow: auto;
        height: 100%;
      }
    }
  }

  .highlight-wrapper {
    // TODO: 暂时隐藏
    display: none;
  }
}
</style>
