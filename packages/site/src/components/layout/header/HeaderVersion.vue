<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { version as currentVersion } from '@idux/components/version'

const selectVersion = ref(currentVersion)
const versions = computed(() => {
  const [major, minor] = currentVersion.split('.')
  const minorVersions = []
  for (let index = Number(minor) - 1; index >= 0; index--) {
    minorVersions.push(`${major}.${index}.x`)
  }
  const majorVersion = []
  for (let index = Number(major) - 1; index >= 1; index--) {
    majorVersion.push(`${index}.x`)
  }
  return [currentVersion].concat(minorVersions, majorVersion)
})
const dataSource = computed(() => versions.value.map(v => ({ key: v, label: v })))

watch(selectVersion, version => {
  window.location.href = `${window.location.origin}/version/${version}`
})
</script>

<template>
  <IxSelect v-model:value="selectVersion" :dataSource="dataSource" class="header-version" style="width: 80px">
  </IxSelect>
</template>
