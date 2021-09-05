<template>
  <IxMenu class="side-nav" mode="inline" :indent="48" :selectedKeys="selectedKeys">
    <template v-if="page === 'docs'">
      <IxMenuItem v-for="docs in config.docs" v-show="docs.lang === lang" :key="docs.path">
        <router-link :to="docs.path">
          <span>{{ docs.title }}</span>
        </router-link>
      </IxMenuItem>
    </template>
    <template v-if="page === 'components'">
      <IxMenuItemGroup
        v-for="group in config.components"
        v-show="group.lang === lang"
        :key="group.name"
        :label="group.name"
      >
        <IxMenuItem v-for="component in group.children" :key="component.path">
          <router-link :to="component.path">
            <IxSpace>
              <span>{{ component.title }}</span>
              <span>{{ component.subtitle }}</span>
            </IxSpace>
          </router-link>
        </IxMenuItem>
      </IxMenuItemGroup>
    </template>
    <template v-if="page === 'cdk'">
      <IxMenuItem v-for="cdk in config.cdk" v-show="cdk.lang === lang" :key="cdk.path">
        <router-link :to="cdk.path">
          <IxSpace>
            <span>{{ cdk.title }}</span>
            <span>{{ cdk.subtitle }}</span>
          </IxSpace>
        </router-link>
      </IxMenuItem>
    </template>
  </IxMenu>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { appContextToken } from '../../context'
import { config } from '../../sideNav'

export default defineComponent({
  setup() {
    const { lang, page, path } = inject(appContextToken)!
    const selectedKeys = computed(() => [path.value])
    return { lang, page, selectedKeys, config }
  },
})
</script>
