<template>
  <IxRow>
    <IxCol xs="24" sm="8">
      <div>Selected: {{ selected1 }}</div>
      <IxCard
        v-model:selected="selected1"
        :header="{ title: 'Selectable', extra: 'setting' }"
        size="lg"
        selectable
        @selectedChange="logSelected"
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </IxCard>
    </IxCol>
    <IxCol xs="24" sm="8">
      <div>Selected: {{ selected2 }}</div>
      <IxCard
        v-model:selected="selected1"
        :header="{ title: 'Disabled and selected', extra: 'setting' }"
        selectable
        disabled
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </IxCard>
    </IxCol>
    <IxCol xs="24" sm="8">
      <div>Selected: {{ selected3 }}</div>
      <IxCard
        v-model:selected="selected1"
        :header="{ title: 'Disable and unselected', extra: 'setting' }"
        selectable
        disabled
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </IxCard>
    </IxCol>
  </IxRow>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const selected1 = ref(true)
const selected2 = ref(true)
const selected3 = ref(false)

const logSelected = selected => {
  console.log(`selected is ${selected}`)
}
</script>
