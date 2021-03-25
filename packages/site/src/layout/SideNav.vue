<template>
  <ul class="site-side-nav">
    <template v-if="page === 'docs'">
      <li v-for="docs in config.docs" v-show="docs.lang === language" :key="docs.path">
        <router-link :to="docs.path">
          <span>{{ docs.title }}</span>
        </router-link>
      </li>
    </template>
    <template v-if="page === 'components'">
      <li v-for="group in config.components" v-show="group.lang === language" :key="group.name" :title="group.name">
        <ul>
          <li v-for="component in group.children" :key="component.path">
            <router-link :to="component.path">
              <span>{{ component.title }}</span>
              <span class="chinese">{{ component.subtitle }}</span>
            </router-link>
          </li>
        </ul>
      </li>
    </template>
    <template v-if="page === 'cdk'">
      <li v-for="cdk in config.cdk" v-show="cdk.lang === language" :key="cdk.path">
        <router-link :to="cdk.path">
          <span>{{ cdk.title }}</span>
          <span class="chinese">{{ cdk.subtitle }}</span>
        </router-link>
      </li>
    </template>
  </ul>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'
import { config } from '../sideNav'

export default defineComponent({
  name: 'LayoutSideNav',
  props: {
    page: { type: String, required: true },
  },
  setup() {
    const language = inject('language')
    return { language, config }
  },
})
</script>
