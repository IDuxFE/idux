<template>
  <ix-button icon="github" @click="onClick">
    {{ starCount }}
  </ix-button>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { appContextToken, isDevMode } from '../../context'

export default defineComponent({
  setup() {
    const { org, repo } = inject(appContextToken)!

    const onClick = () => window.open(`https://github.com/${org}/${repo}`, '_blank')

    const starCount = ref(0)
    if (!isDevMode) {
      fetch(`https://api.github.com/repos/${org}/${repo}`)
        .then(res => res.json())
        .then(res => {
          starCount.value = res.stargazers_count
        })
    }

    return { onClick, starCount }
  },
})
</script>
