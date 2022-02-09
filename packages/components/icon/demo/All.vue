<template>
  <IxSpace :size="24">
    <IxRadioGroup v-model:value="iconType" buttoned>
      <IxRadio value="outlined">Outlined</IxRadio>
      <IxRadio value="filled">Filled</IxRadio>
    </IxRadioGroup>
    <IxInput v-model:value="searchValue" suffix="search" placeholder="在此搜索图标，点击图标可复制代码" />
  </IxSpace>
  <div class="icon-box">
    <div v-for="icon in icons" :key="icon" class="icon-box-item" @click="onCopy($event, icon)">
      <IxIcon :name="icon" />
      <br />
      <span> {{ icon }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { useClipboard } from '@idux/cdk/clipboard'

import { allIcons } from './all'

const groupedIcons = allIcons.reduce(
  (result, icon) => {
    if (icon.endsWith('filled')) {
      result.filled.push(icon)
    } else {
      result.outlined.push(icon)
    }
    return result
  },
  { outlined: [] as string[], filled: [] as string[] },
)

const iconType = ref<'outlined' | 'filled'>('outlined')
const searchValue = ref('')

const icons = computed(() => {
  const type = iconType.value
  const text = searchValue.value
  return groupedIcons[type].filter(name => !text || name.includes(text))
})

const { copy } = useClipboard()
const onCopy = (evt: MouseEvent, name: string) => {
  const target = evt.target as HTMLElement
  const text = `<IxIcon name="${name}" />`

  copy(text).then(successful => {
    if (successful) {
      target.classList.add('copied')
      setTimeout(() => {
        target.classList.remove('copied')
      }, 1000)
    }
  })
}
</script>

<style scoped lang="less">
.ix-input {
  width: 400px;
}

.icon-box {
  position: relative;
  overflow: hidden;

  &-item {
    position: relative;
    float: left;
    width: 12.5%;
    height: 100px;
    padding-top: 12px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    transition: @transition-all-base;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #fff;
      line-height: 110px;
      text-align: center;
      opacity: 0;
      transition: @transition-all-base;
      content: 'Copied!';
    }

    .ix-icon {
      margin: 12px;
      font-size: 24px;
      transition: @transition-all-base;
    }

    &:hover {
      color: #fff;
      background-color: #3366ff;

      .ix-icon {
        transform: scale(1.4);
      }
    }

    &.copied:hover {
      color: rgba(255, 255, 255, 0.2);
    }

    &.copied::after {
      top: -10px;
      opacity: 1;
    }
  }
}
</style>
