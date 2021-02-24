<template>
  <div class="icon-selector">
    <ix-button @click="changeIconType('outlined')">Outlined</ix-button>
    <ix-button @click="changeIconType('filled')">Filled</ix-button>
    <ix-button @click="changeIconType('twotone')">Two Tone</ix-button>
    <ix-input v-model:value="searchValue" suffix="search" placeholder="在此搜索图标，点击图标可复制代码" />
  </div>
  <br />
  <div class="icon-box">
    <div v-for="icon in icons" :key="icon" class="icon-box-item" @click="onCopy($event, icon)">
      <ix-icon :name="icon" />
      <br />
      <span> {{ icon }} </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue'
import { useClipboard } from '@idux/cdk/clipboard'
import { allIcons } from './all'

export default defineComponent({
  setup() {
    const groupedIcons = allIcons.reduce(
      (result, icon) => {
        if (icon.endsWith('twotone')) {
          result.twotone.push(icon)
        } else if (icon.endsWith('filled')) {
          result.filled.push(icon)
        } else {
          result.outlined.push(icon)
        }
        return result
      },
      {
        outlined: [] as string[],
        filled: [] as string[],
        twotone: [] as string[],
      },
    )

    const icons = ref(groupedIcons.outlined)
    const iconType = ref('outlined') as Ref<'outlined' | 'filled' | 'twotone'>
    const changeIconType = (type: 'outlined' | 'filled' | 'twotone') => (iconType.value = type)
    const searchValue = ref('')

    watch([iconType, searchValue], ([iconType, searchValue]) => {
      const _icons = groupedIcons[iconType]
      if (searchValue.length === 0) {
        icons.value = _icons
      } else {
        icons.value = _icons.filter(icon => icon.includes(searchValue))
      }
    })

    const { copy } = useClipboard()
    const onCopy = (evt: MouseEvent, name: string) => {
      const target = evt.target as HTMLElement
      const text = `<ix-icon name="${name}" />`

      copy(text).then(successful => {
        if (successful) {
          target.classList.add('copied')
          setTimeout(() => {
            target.classList.remove('copied')
          }, 1000)
        }
      })
    }
    return { icons, changeIconType, searchValue, onCopy }
  },
})
</script>
<style lang="less" scoped>
.icon-selector {
  display: flex;
  .ix-input {
    margin-left: 16px;
  }
}
.icon-box {
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
    transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    .ix-icon {
      margin: 12px;
      font-size: 28px;
      transition: transform 0.3s ease-in-out;
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
      transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
      content: 'Copied!';
    }

    &.copied::after {
      top: -10px;
      opacity: 1;
    }
  }
}
</style>
