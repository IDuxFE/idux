<template>
  <div :id="id" class="global-code-box">
    <div class="global-code-box-title markdown">
      <h3>
        <span>{{ title }}</span>
        <a class="anchor" :href="'#' + id">#</a>
      </h3>
    </div>
    <div class="global-code-box-description">
      <slot name="description"></slot>
    </div>
    <div class="global-code-box-content">
      <div class="global-code-box-content-border">
        <div class="global-code-box-raw-code">
          <slot name="rawCode"></slot>
          <div class="global-code-box-tools">
            <IxSpace>
              <GlobalPlayground :code="code" />
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
        </div>
        <Transition name="ix-fade-down">
          <div v-if="expanded" class="global-code-box-highlight-code">
            <slot name="highlightCode"></slot>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue'

import { kebabCase, throttle } from 'lodash-es'

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

    const id = computed(() => `${props.packageName}-${props.componentName}-${kebabCase(props.demoName)}`)

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
.global-code-box {
  position: relative;
  margin-bottom: 16px;
  width: 100%;

  &-title {
    margin-bottom: 0;
  }

  &-description {
    margin-top: -8px;
    margin-bottom: 1em;
  }

  &-content {
    padding: 8px;
    border-radius: @border-radius-md;
    background: @color-graphite-l50;
    box-shadow: inset 0 0 4px 0 rgba(0, 0, 0, 0.1);

    &-border {
      position: relative;
      width: 100%;
      padding: 8px;
      background-color: @background-color-component;
      border: 1px @border-style @border-color-split;
      border-radius: @border-radius-md;
      transition: @transition-all-base;
    }
  }

  &-raw-code {
    position: relative;
    padding: 16px;
  }

  &-highlight-code {
    padding: 8px;
    border-radius: 0 0 @border-radius-md @border-radius-md;

    pre {
      margin: 0;
      padding: 8px;
    }
    pre code {
      margin: 0;
      padding: 0;
    }
  }

  &-tools {
    position: absolute;
    bottom: -4px;
    right: 16px;
    cursor: pointer;

    .ix-icon {
      color: @text-color-secondary;

      &:hover {
        color: @text-color;
      }
    }
  }
}
</style>
