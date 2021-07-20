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

<style lang="less">
.global-code-box {
  position: relative;
  width: 100%;
  margin: 0 0 @spacing-lg;
  background-color: @background-color-component;
  border: @border-width-sm @border-style @border-color-split;
  border-radius: @border-radius-md;
  transition: all @transition-duration-base;

  &.expand &-meta {
    border-bottom: @border-width-sm dashed @border-color-split;
    border-radius: 0;
  }

  &-demo {
    padding: @spacing-xl;
    border-bottom: @border-width-sm @border-style @border-color-split;
  }

  &-meta {
    &.markdown {
      position: relative;
      border-radius: 0 0 @border-radius-md @border-radius-md;

      pre {
        margin: @spacing-xs 0;
        padding: @spacing-xs @spacing-sm;
      }

      pre code {
        margin: 0;
      }

      blockquote {
        margin: 0;
      }

      h4,
      section& p {
        margin: 0;
      }
    }
  }

  &-title {
    position: absolute;
    top: -@spacing-lg;
    margin-left: @spacing-lg;
    padding: @spacing-xs @spacing-sm;
    background: @background-color-body;
    border-radius: @border-radius-sm @border-radius-sm 0 0;

    .global-code-box-edit {
      color: @text-color;
      padding-right: @spacing-xs;

      .ix-icon {
        color: @text-color-secondary;
        &:hover {
          color: @primary;
        }
      }
    }
  }

  &-description {
    padding: @spacing-lg @spacing-xl @spacing-md;
  }

  &-actions {
    padding: @spacing-sm;
    text-align: center;
    border-top: @border-width-sm dashed @border-color-split;

    .ix-icon {
      margin: 0 @spacing-xs;
      color: @text-color-secondary;
      opacity: 0.7;
      &:hover {
        color: @primary;
        opacity: 1;
      }
    }
  }

  .highlight-wrapper {
    display: none;
    overflow: auto;
    border-radius: 0 0 @border-radius-md @border-radius-md;

    &-expand {
      display: block;
    }

    pre {
      margin: 0;
      padding: 0;
    }
  }

  &-expand-trigger {
    margin-left: @spacing-md;
    font-size: @font-size-xl;
  }
}
</style>
