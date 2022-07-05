<template>
  <IxSpace vertical block>
    <IxSwitch v-model:checked="loading"></IxSwitch>
    <IxRow>
      <IxCol xs="24" sm="8">
        <IxCard :loading="loading" :header="{ title: 'Card title', suffix: 'setting' }">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </IxCard>
      </IxCol>
      <IxCol xs="24" sm="8">
        <IxCard :loading="loading" :footer="footer">
          <IxHeader :avatar="{ src: '/images/avatar/2.png' }" title="Card title">
            <template #description>
              <p>This is the description</p>
            </template>
          </IxHeader>
        </IxCard>
      </IxCol>
    </IxRow>
  </IxSpace>
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
