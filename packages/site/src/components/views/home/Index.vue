<template>
  <div class="home">
    <div class="home-banner">
      <div class="home-banner-content">
        <h1>IDUX UI</h1>
        <div class="home-banner-content-description">{{ locale.description }}</div>
        <router-link class="home-banner-content-start" :to="'/docs/introduce/' + lang">
          {{ locale.start }}
        </router-link>
      </div>
    </div>
    <div class="home-content">
      <ix-row :gutter="{ sm: 8, md: 16, lg: 24, xl: 32 }">
        <ix-col v-for="guideline in locale.guidelines" :key="guideline.name" xs="24" sm="12" md="8">
          <router-link class="home-content-guideline" :to="guideline.path">
            <ix-card class="home-content-card" hoverable borderless>
              <img width="80" height="80" :src="guideline.icon" />
              <h2>{{ guideline.name }}</h2>
              <div>{{ guideline.description }}</div>
            </ix-card>
          </router-link>
        </ix-col>
      </ix-row>
      <!-- <br />
      <br />
      <ix-card hoverable borderless>
        <ix-card-grid xs="24" sm="12" md="6"></ix-card-grid>
        <ix-card-grid xs="24" sm="12" md="6"></ix-card-grid>
        <ix-card-grid xs="24" sm="12" md="6"></ix-card-grid>
        <ix-card-grid xs="24" sm="12" md="6"></ix-card-grid>
      </ix-card>
      <br />
      <br />
      <ix-row :gutter="{ sm: 8, md: 16, lg: 24, xl: 32 }">
        <ix-col xs="24" md="12"> </ix-col>
        <ix-col xs="24" md="12"> </ix-col>
      </ix-row> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { appContextToken } from '../../../context'
import { homeLocales } from './locales'

export default defineComponent({
  setup() {
    const { lang } = inject(appContextToken)!
    const locale = computed(() => homeLocales[lang.value])
    return { lang, locale }
  },
})
</script>
