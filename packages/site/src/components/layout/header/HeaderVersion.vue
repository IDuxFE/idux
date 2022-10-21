<script setup lang="ts">
import { ref } from 'vue'

import { version as lastVersion } from '@idux/components/version'

const dataSource = ref([{ key: lastVersion, label: lastVersion }])
const selectVersion = ref(lastVersion)
</script>

<template>
  <IxSelect
    v-model:value="selectVersion"
    :dataSource="dataSource"
    class="header-version"
    style="width: 80px"
  ></IxSelect>
</template>
