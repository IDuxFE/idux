<template>
  <IxStepper>
    <IxStepperItem status="finish" title="Login" icon="user"></IxStepperItem>
    <IxStepperItem status="finish" title="Verification" icon="verified"></IxStepperItem>
    <IxStepperItem status="process" title="Pay" icon="loading"></IxStepperItem>
    <IxStepperItem status="wait" title="Done">
      <template #icon>
        <IxIcon name="smile" />
      </template>
    </IxStepperItem>
  </IxStepper>
</template>
