<template>
  <IxCollapse v-model:active="active">
    <IxCollapsePanel name="1" title="Francis Bacon's saying">
      <IxCollapse v-model:active="active">
        <IxCollapsePanel name="4" title="Francis Bacon's saying">
          <p>A wise man will make more opportunities than he finds.</p>
        </IxCollapsePanel>
      </IxCollapse>
    </IxCollapsePanel>
    <IxCollapsePanel name="2" title="Francis Bacon's saying">
      If a man will begin with certainties, he shall end in doubts; but if he will be content to begin with doubts, he
      shall end in certainties.
    </IxCollapsePanel>
    <IxCollapsePanel name="3" title="Francis Bacon's saying">
      A wise man will make more opportunities than he finds.
    </IxCollapsePanel>
  </IxCollapse>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref('1')
    return {
      active,
    }
  },
})
</script>
