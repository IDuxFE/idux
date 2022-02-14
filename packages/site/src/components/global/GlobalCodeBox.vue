<template>
  <div :id="id" class="global-code-box-wrapper">
    <section class="global-code-box-title markdown">
      <h3>{{ title }}</h3>
    </section>
    <div class="global-code-box-border">
      <section class="global-code-box">
        <section class="global-code-box-meta markdown">
          <div class="global-code-box-description">
            <slot name="description"></slot>
          </div>
          <div class="global-code-box-actions">
            <IxSpace>
              <GlobalCodeSandbox :code="code" />
              <IxTooltip :title="lang === 'zh' ? '在 GitHub 上编辑此示例' : 'Edit this demo on GitHub'">
                <a :href="editHref" class="global-code-box-edit" target="_blank" rel="noopener noreferrer">
                  <IxIcon name="edit" />
                </a>
              </IxTooltip>
              <IxTooltip :title="lang === 'zh' ? '复制代码' : 'Copy code'">
                <IxIcon name="copy" @click="onCopy" />
              </IxTooltip>
              <IxTooltip :title="expandedTitle">
                <IxIcon :name="expanded ? 'unexpand' : 'expand'" @click="onExpanded" />
              </IxTooltip>
            </IxSpace>
          </div>
        </section>
        <section class="global-code-box-demo">
          <slot name="rawCode"></slot>
        </section>
        <section class="highlight-wrapper" :class="{ 'highlight-wrapper-expand': expanded }">
          <slot name="highlightCode"></slot>
        </section>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue'

import { throttle } from 'lodash-es'

import { useClipboard } from '@idux/cdk/clipboard'
import { useMessage } from '@idux/components/message'

import { appContextToken } from '../../context'

export default defineComponent({
  name: 'GlobalCodeBox',
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
    const expandedTitle = computed(() => {
      if (lang.value === 'zh') {
        return expanded.value ? '收起代码' : '显示代码'
      }
      return expanded.value ? 'Hide Code' : 'Show Code'
    })

    const onExpanded = () => {
      expanded.value = !expanded.value
    }

    const { copy } = useClipboard()
    const { success } = useMessage()

    const onCopy = throttle(() => {
      copy(decodeURIComponent(props.code)).then(() => {
        success(lang.value === 'zh' ? '复制成功' : 'copy succeeded')
      })
    }, 300)

    return { id, lang, editHref, expanded, expandedTitle, onExpanded, onCopy }
  },
})
</script>

<style lang="less">
.global-code-box-wrapper {
  position: relative;
  margin-bottom: 16px;
  width: 100%;

  .global-code-box-border {
    padding: 8px;
    border-radius: @border-radius-md;
    background: @color-graphite-l50;
    box-shadow: inset 0 0 4px 0 rgba(0, 0, 0, 0.1);
  }

  .global-code-box {
    position: relative;
    width: 100%;
    padding: 16px;
    background-color: @background-color-component;
    border: 1px @border-style @border-color-split;
    border-radius: @border-radius-md;
    transition: @transition-all-base;

    &-title h3 {
      margin-bottom: 0;
    }

    &-description {
      border-bottom: 1px dashed @border-color-split;
    }

    &-actions {
      position: absolute;
      top: 8px;
      right: 16px;

      .ix-icon {
        color: @text-color-secondary;
        cursor: pointer;

        &:hover {
          color: @text-color;
        }
      }
    }

    &-demo {
      padding: 16px 0;
    }

    .highlight-wrapper {
      display: none;
      border-radius: 0 0 @border-radius-md @border-radius-md;

      &-expand {
        display: block;
      }

      pre {
        margin: 0;
        padding: 8px;
      }
    }
  }
}
</style>
