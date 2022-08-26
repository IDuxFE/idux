<template>
  <CdkClickOutside style="border: 1px dashed; padding: 24px" @clickOutside="onClickOutside">
    CdkClickOutside
  </CdkClickOutside>
</template>

<script setup lang="ts">
const onClickOutside = () => {
  console.log('CdkClickOutside emit clickOutside')
}
</script>
