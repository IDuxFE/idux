<template>
  <IxCollapse>
    <IxCollapsePanel key="1" :header="header">
      <span>Some books should be tasted, some devoured, but only a few should be chewed and digested thoroughly.</span>
    </IxCollapsePanel>
    <IxCollapsePanel key="2" :header="header">
      <template #header="{ expanded, changeExpand }">
        <IxHeader
          :avatar="{ src: '/images/avatar/1.png' }"
          description="This is a description"
          @suffixClick="changeExpand"
        >
          Title
          <template #suffix>
            <IxIcon name="right" :rotate="expanded ? 90 : 0"></IxIcon>
          </template>
        </IxHeader>
      </template>
      <span>
        If a man will begin with certainties, he shall end in doubts; but if he will be content to begin with doubts, he
        shall end in certainties.
      </span>
    </IxCollapsePanel>
    <IxCollapsePanel key="3">
      <template #header="{ expanded, changeExpand }">
        <IxHeader title="Francis Bacon's saying" @click="changeExpand">
          <template #prefix>
            <IxIcon name="caret-right-filled" :rotate="expanded ? 90 : 0"></IxIcon>
          </template>
          <template #suffix>
            <IxSpace>
              <IxIcon name="setting" @click="onSuffixClick"></IxIcon>
              <IxIcon name="setting" @click="onSuffixClick"></IxIcon>
              <IxIcon name="setting" @click="onSuffixClick"></IxIcon>
            </IxSpace>
          </template>
        </IxHeader>
      </template>
      <span>A wise man will make more opportunities than he finds.</span>
    </IxCollapsePanel>
  </IxCollapse>
</template>

<script lang="ts" setup>
// If you don't want click extra trigger collapse, you can prevent this:
const onSuffixClick = (evt: Event) => evt.stopPropagation()

const header = {
  title: "Francis Bacon's saying",
  suffix: 'setting',
  // If you don't want click extra trigger collapse, you can prevent this:
  onSuffixClick,
}
</script>
