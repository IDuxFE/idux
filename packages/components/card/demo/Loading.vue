<template>
  <ix-switch v-model:checked="loading"></ix-switch>
  <br />
  <ix-row>
    <ix-col xs="24" sm="8">
      <ix-card :loading="loading" :header="{ title: 'Card title', extra: 'setting' }">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </ix-card>
    </ix-col>
    <ix-col xs="24" sm="8">
      <ix-card :loading="loading" :footer="footer">
        <ix-header
          :avatar="{ src: '/images/avatar/2.png' }"
          title="Card title"
          description="This is the description"
        ></ix-header>
      </ix-card>
    </ix-col>
  </ix-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const loading = ref(true)
    const onClick = () => console.log('footer click')
    const footer = [
      { icon: 'setting', onClick },
      { icon: 'edit', onClick },
      { icon: 'ellipsis', onClick },
    ]
    return { loading, footer }
  },
})
</script>
