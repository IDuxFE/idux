<template>
  <div class="all-icons">
    <ix-icon v-for="icon in icons" :key="icon" :name="icon" @click="onCopy(icon)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as AllIcons from '@idux/components/icon/definitions'
import { useClipboard } from '@idux/cdk/clipboard'

export default defineComponent({
  setup() {
    const icons = Object.keys(AllIcons)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map(key => (AllIcons as any)[key].name)
      .filter((name: string) => !name.endsWith('-twotone'))

    const { copy } = useClipboard()
    const onCopy = (name: string) => {
      const text = `<ix-icon name="${name}" />`
      copy(text).then(successful => {
        if (successful) {
          console.log(`复制成功: ${text}`)
        }
      })
    }
    return { icons, onCopy }
  },
})
</script>
<style lang="less" scoped>
.all-icons {
  overflow: hidden;
  .ix-icon {
    margin-right: 8px;
    font-size: 24px;
  }
}
</style>
