<template>
  <IxStepper clickable>
    <IxStepperItem title="Finished" subTitle="20:20:01" description="This is a description."></IxStepperItem>
    <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
    <IxStepperItem :disabled="true" title="Waiting" description="This is a description."></IxStepperItem>
  </IxStepper>
</template>
