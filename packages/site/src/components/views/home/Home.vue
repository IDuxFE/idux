<template>
  <div class="home-content-wrapper">
    <div class="home-banner">
      <div class="video-wrapper">
        <video src="/medias/home-banner.mp4" autoplay loop muted>{{ locale.videoErr }}</video>
        <div class="home-banner-title-wrapper">
          <h1 class="home-banner-title"> {{ locale.bannerTitle }} </h1>
          <div class="home-banner-title-desc">{{ locale.bannerTitleDesc }}</div>
          <ix-button-group class="home-banner-btn-group" size="lg">
            <ix-button mode="primary" @click="gotoPage('/docs/introduce')">{{ locale.start }}</ix-button>
            <ix-button mode="link" href="https://github.com/IDuxFE/idux" target="_blank">{{ locale.github }}</ix-button>
          </ix-button-group>
        </div>
      </div>
    </div>
    <div class="home-comp-properties-wrapper">
      <div v-for="(item, index) of locale.compProperties" :key="index" class="home-comp-properties">
        <dl>
          <div class="home-comp-properties-img"></div>
          <dt>{{ item.title }}</dt>
          <dd v-for="(desc, _index) of item.descs" :key="_index">{{ desc }}</dd>
        </dl>
      </div>
    </div>
    <!-- <div class="home-desc">
    <h3 class="home-desc-h3 home-desc-scene">{{ locale.sceneDesc[0] }}</h3>
    <h2 class="home-desc-h2 home-desc-scene">{{ locale.sceneDesc[1] }}</h2>
    <h2 class="home-desc-h2 home-desc-welcome">{{ locale.welcome[0] }}</h2>
    <p class="home-desc-p home-desc-welcome">{{ locale.welcome[1] }}</p>
  </div>
  <div class="home-comments">
    <div v-for="(item, index) of locale.comments" :key="index" class="home-comments-item">
      <dl>
        <dt>{{ item.desc }}</dt>
        <dd>{{ item.author }}</dd>
      </dl>
    </div>
  </div> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import { useRouter } from 'vue-router'

import { appContextToken } from '../../../context'
import { homeLocales } from './locales'

export default defineComponent({
  setup() {
    const { lang, org, repo } = inject(appContextToken)!
    const router = useRouter()

    const locale = computed(() => homeLocales[lang.value])
    const githubUrl = computed(() => `https://github.com/${org}/${repo}`)
    const gotoPage = (path: string) => {
      router.push(`${path}/${lang.value}`)
    }

    return { lang, locale, githubUrl, gotoPage }
  },
})
</script>
