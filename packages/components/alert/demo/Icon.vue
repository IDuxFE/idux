<template>
  <IxAlert icon="alert" title="每次我不知道该说什么的时候就不知道该说什么。"></IxAlert>
  <IxAlert title="你说的这话，抛开内容来说，我十分赞同。" type="success">
    <template #icon>
      <IxIcon name="check-circle-filled" />
    </template>
  </IxAlert>
  <IxAlert type="warning" title="但凡你这话有点道理，也不至于一点道理没有。" :closable="true">
    <template #closeIcon>
      <IxButton mode="text">关闭</IxButton>
    </template>
  </IxAlert>
</template>
