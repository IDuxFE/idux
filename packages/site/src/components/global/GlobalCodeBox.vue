<template>
  <section :id="id" class="global-code-box" :class="{ expand: expanded }">
    <section class="global-code-box-demo">
      <slot name="rawCode"></slot>
    </section>
    <section class="global-code-box-meta markdown">
      <div class="global-code-box-title">
        {{ title }}
        <a class="global-code-box-edit" :href="editHref" target="_blank" rel="noopener noreferrer">
          <IxIcon name="edit" />
        </a>
      </div>
      <div class="global-code-box-description">
        <slot name="description"></slot>
      </div>
      <div class="global-code-box-actions">
        <IxIcon name="copy" @click="onCopy" />
        <IxIcon v-show="expanded" name="code-expand" @click="expanded = !expanded" />
        <IxIcon v-show="!expanded" name="code-collapse" @click="expanded = !expanded" />
      </div>
    </section>
    <section class="highlight-wrapper" :class="{ 'highlight-wrapper-expand': expanded }">
      <slot name="highlightCode"></slot>
    </section>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, inject } from 'vue'
import { useClipboard } from '@idux/cdk/clipboard'
import { throttle } from 'lodash-es'
import { useMessage } from '@idux/components/message'
import { appContextToken } from '../../context'

export default defineComponent({
  props: {
    title: { type: String, default: '' },
    packageName: { type: String, default: '' },
    componentName: { type: String, default: '' },
    demoName: { type: String, default: '' },
    copied: { type: Boolean, default: false },
    code: { type: String, default: '' },
  },
  setup(props) {
    const { lang } = inject(appContextToken)!

    const id = computed(() => `${props.packageName}-${props.componentName}-demo-${props.demoName}`)

    const editHref = computed(() => {
      const gitLink = `${props.packageName}/${props.componentName}/demo/${props.demoName}`
      return `https://github.com/IDuxFE/idux/edit/main/packages/${gitLink}.md`
    })

    const expanded = ref(false)

    const { copy } = useClipboard()
    const { success } = useMessage()

    const onCopy = throttle(() => {
      copy(decodeURIComponent(props.code)).then(() => {
        success(lang.value === 'zh' ? '复制成功' : 'copy succeeded')
      })
    }, 300)

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
          color: @color-primary;
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
      cursor: pointer;
      &:hover {
        color: @color-primary;
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
