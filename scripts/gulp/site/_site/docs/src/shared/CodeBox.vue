<template>
  <section :id="demoKey" class="code-box" :class="{ expand: expanded }">
    <section class="code-box-demo">
      <div>
        <slot name="demo"></slot>
      </div>
    </section>
    <section class="code-box-meta markdown">
      <div class="code-box-title">
        <a @click="goLink()">
          {{ title }}
          <a class="edit-button" :href="editHref" target="_blank" rel="noopener noreferrer">
            <ix-icon name="edit-fill" />
          </a>
        </a>
      </div>
      <div class="code-box-description">
        <slot name="intro"></slot>
      </div>
      <div class="code-box-actions">
        <ix-icon name="copy-fill" @click="copyCode()" />
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
import { computed, defineComponent, ref } from 'vue'
import { useClipboard } from '@idux/cdk'

interface CodeBoxProps {
  title?: string
  type?: string
  component?: string
  demoKey?: string
  rawCode?: string
}

export default defineComponent({
  name: 'CodeBox',
  props: {
    title: String,
    type: String,
    component: String,
    demoKey: String,
    rawCode: String,
  },
  setup(props: CodeBoxProps) {
    const { copy } = useClipboard()

    const codeCopied = ref(false)
    const copyCode = () => {
      if (codeCopied.value || !props.rawCode) return
      copy(props.rawCode).then(successful => {
        codeCopied.value = true
        console.log('codeCopied ', successful)
        setTimeout(() => (codeCopied.value = false), 1000)
      })
    }

    const link = computed(() => `${props.type}-${props.component}-demo-${props.demoKey}`)
    const goLink = () => (window.location.hash = link.value)
    const editHref = computed(() => `https://github.com/IduxFE/components/edit/master/${link.value}.md`)

    const expanded = ref(false)
    const changeExpanded = (isExpanded: boolean) => {
      expanded.value = isExpanded
    }

    return { copyCode, goLink, editHref, expanded, changeExpanded }
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
