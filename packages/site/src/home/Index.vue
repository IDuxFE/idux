<template>
  <div class="home">
    <div class="home-title">
      <h1 v-typography>A UI Component Library for Vue 3.x</h1>
      <div v-typography>{{ locale.subTitle }}</div>
      <div v-typography class="home-title-start">
        <router-link :to="'/docs/introduce/' + lang"> {{ locale.start }}</router-link>
      </div>
      <img alt="home" src="/home.png" />
    </div>

    <div class="home-content">
      <h3 v-typography>{{ locale.moreText }}</h3>
      <ix-row>
        <ix-col v-for="guideline in locale.guidelines" :key="guideline.name" xs="24" md="12" xl="8">
          <div class="home-content-guideline-icon">
            <router-link :to="guideline.path">
              <ix-icon :name="guideline.icon" />
            </router-link>
          </div>
          <h4 v-typography>{{ guideline.name }}</h4>
          <div v-typography>{{ guideline.description }}</div>
        </ix-col>
      </ix-row>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { appContextToken } from '../context'
import { homeLocales } from './homeLocales'

export default defineComponent({
  setup() {
    const { lang } = inject(appContextToken)!
    const locale = computed(() => homeLocales[lang.value])
    return { lang, locale }
  },
})
</script>
