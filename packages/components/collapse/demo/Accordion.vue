<template>
  <IxCollapse v-model:expandedKeys="expandedKeys" accordion>
    <IxCollapsePanel key="1" header="Francis Bacon's saying">
      <span>Some books should be tasted, some devoured, but only a few should be chewed and digested thoroughly.</span>
    </IxCollapsePanel>
    <IxCollapsePanel key="2" header="Francis Bacon's saying">
      <span>
        If a man will begin with certainties, he shall end in doubts; but if he will be content to begin with doubts, he
        shall end in certainties.
      </span>
    </IxCollapsePanel>
    <IxCollapsePanel key="3" header="Francis Bacon's saying">
      <span>A wise man will make more opportunities than he finds.</span>
    </IxCollapsePanel>
  </IxCollapse>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const expandedKeys = ref(['1'])
</script>
