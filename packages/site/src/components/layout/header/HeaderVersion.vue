<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { version as currentVersion } from '@idux/components/version'

const selectVersion = ref(currentVersion)
const versions = ref([currentVersion])
const dataSource = computed(() => versions.value.map(v => ({ key: v, label: v })))

watch(selectVersion, version => {
  window.location.href = `${window.location.origin}/version/${version}`
})

onMounted(() => {
  // eslint-disable-next-line no-undef
  fetch(__BASE_URL__ + `config.json`)
    .then(res => res.json())
    .then(config => {
      const { preVersions } = config
      versions.value = [currentVersion, ...preVersions]
    })
})
</script>

<template>
  <IxSelect v-model:value="selectVersion" :dataSource="dataSource" class="header-version" style="width: 80px">
  </IxSelect>
</template>
