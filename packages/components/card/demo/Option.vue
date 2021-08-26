<template>
  <IxCard hoverable :cover="cover" :header="header" :footer="footer">
    <p>Card content</p>
    <p>Card content</p>
  </IxCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const cover = { src: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png', alt: 'example' }
    const header = {
      avatar: { src: '/images/avatar/3.png' },
      title: 'Card title',
      description: 'This is the description',
    }
    const onClick = () => console.log('footer click')
    const footer = [
      { icon: 'setting', onClick },
      { icon: 'edit', onClick },
      { icon: 'ellipsis', onClick },
    ]
    return { cover, header, footer }
  },
})
</script>
