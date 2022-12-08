<template>
  <IxSpace block vertical>
    <IxAlert
      title="Vue 是什么？"
      description="Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。"
      type="info"
      closable
    >
    </IxAlert>
    <IxAlert type="success">
      What is Vue?
      <template #description>
        Vue is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed
        from the ground up to be incrementally adoptable.
      </template>
    </IxAlert>
  </IxSpace>
</template>
