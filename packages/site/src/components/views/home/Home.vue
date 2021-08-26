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
      <IxRow :gutter="{ sm: 8, md: 16, lg: 24, xl: 32 }">
        <IxCol v-for="guideline in locale.guidelines" :key="guideline.name" xs="24" sm="12" md="8">
          <router-link class="home-content-guideline" :to="guideline.path">
            <IxCard class="home-content-card" hoverable borderless>
              <img width="80" height="80" :src="guideline.icon" />
              <h2>{{ guideline.name }}</h2>
              <div>{{ guideline.description }}</div>
            </IxCard>
          </router-link>
        </IxCol>
      </IxRow>
      <!-- <br />
      <br />
      <IxCard hoverable borderless>
        <IxCardGrid xs="24" sm="12" md="6"></IxCardGrid>
        <IxCardGrid xs="24" sm="12" md="6"></IxCardGrid>
        <IxCardGrid xs="24" sm="12" md="6"></IxCardGrid>
        <IxCardGrid xs="24" sm="12" md="6"></IxCardGrid>
      </IxCard>
      <br />
      <br />
      <IxRow :gutter="{ sm: 8, md: 16, lg: 24, xl: 32 }">
        <IxCol xs="24" md="12"> </IxCol>
        <IxCol xs="24" md="12"> </IxCol>
      </IxRow> -->
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
