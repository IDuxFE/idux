<template>
  <ul class="site-side-nav">
    <template v-if="page === 'docs'">
      <li v-for="docs in routerList.docs" v-show="docs.language === language" :key="docs.path">
        <router-link :to="docs.path">
          <span>{{ docs.title }}</span>
        </router-link>
      </li>
    </template>
    <template v-if="page === 'components'">
      <li
        v-for="group in routerList.components"
        v-show="group.language === language"
        :key="group.name"
        :title="group.name"
      >
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
      <li v-for="cdk in routerList.cdk" v-show="cdk.language === language" :key="cdk.path">
        <router-link :to="cdk.path">
          <span>{{ cdk.title }}</span>
          <span class="chinese">{{ cdk.subtitle }}</span>
        </router-link>
      </li>
    </template>
  </ul>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    routerList: { type: Object, required: true },
    language: { type: String, required: true },
    page: { type: String, required: true },
  },
})
</script>
