<template>
  <div class="github-btn">
    <a
      class="gh-btn"
      target="_blank"
      rel="noopener"
      :href="'https://github.com/' + org + '/' + repo"
      aria-hidden="true"
    >
      <span class="gh-ico" aria-hidden="true"></span>
      <span class="gh-text">Star</span>
    </a>
    <a class="gh-count" target="_blank" rel="noopener" :href="'https://github.com/' + org + '/' + repo + '/stargazers'">
      {{ starCount }}
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const org = 'IduxFE'
    const repo = 'components'

    const starCount = ref(0)

    fetch(`https://api.github.com/repos/${org}/${repo}`)
      .then(res => res.json())
      .then(res => {
        starCount.value = res.stargazers_count
      })

    return { org, repo, starCount }
  },
})
</script>
