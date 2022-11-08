<script setup lang="ts">
import { ref, watch } from 'vue'

import { version as currentVersion } from '@idux/components/version'

const versions = [currentVersion, '1.0.x']

const dataSource = versions.map(v => ({ key: v, label: v }))
const selectVersion = ref(currentVersion)

watch(selectVersion, version => {
  window.location.href = `${window.location.origin}/version/${version}`
})
</script>

<template>
  <IxSelect v-model:value="selectVersion" :dataSource="dataSource" class="header-version" style="width: 80px">
  </IxSelect>
</template>
