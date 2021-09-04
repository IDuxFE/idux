<template>
  <IxCollapse>
    <IxCollapsePanel key="1" :header="header">
      <span>Some books should be tasted, some devoured, but only a few should be chewed and digested thoroughly.</span>
    </IxCollapsePanel>
    <IxCollapsePanel key="2" :header="header">
      <span>
        If a man will begin with certainties, he shall end in doubts; but if he will be content to begin with doubts, he
        shall end in certainties.
      </span>
    </IxCollapsePanel>
    <IxCollapsePanel key="3">
      <template #header="{ expanded, onClick }">
        <IxHeader title="Francis Bacon's saying" @click="onClick">
          <template #prefix>
            <IxIcon name="caret-right" :rotate="expanded ? 90 : 0"></IxIcon>
          </template>
          <template #suffix>
            <IxIcon name="setting"></IxIcon>
            <IxIcon name="setting"></IxIcon>
            <IxIcon name="setting"></IxIcon>
          </template>
        </IxHeader>
      </template>
      <span>A wise man will make more opportunities than he finds.</span>
    </IxCollapsePanel>
  </IxCollapse>
</template>

<script lang="ts" setup>
const header = {
  title: "Francis Bacon's saying",
  suffix: 'setting',
  // If you don't want click extra trigger collapse, you can prevent this:
  onSuffixClick: (evt: Event) => evt.stopPropagation(),
}
</script>
