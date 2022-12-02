<template>
  <IxPopconfirm title="Are you sure to delete this task?">
    <IxButton>Delete</IxButton>
    <template #content>
      <IxFormItem label="Admin Password" compact required>
        <IxInput size="sm"></IxInput>
      </IxFormItem>
    </template>
  </IxPopconfirm>
</template>
