<template>
  <IxInputNumber
    v-model:value="value"
    :max="10"
    :min="1"
    @change="handleChange"
    @blur="onBlur"
    @focus="onFocus"
  ></IxInputNumber>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)

function handleChange(value: number | null, oldValue: number | null | undefined) {
  console.log('changed', value, oldValue)
}

const onBlur = console.log
const onFocus = console.log
</script>
