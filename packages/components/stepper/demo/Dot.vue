<template>
  <IxStepper :progressDot="true" :active="1">
    <IxStepperItem
      status="finish"
      title="Finished"
      subTitle="20:20:01"
      description="This is a description."
    ></IxStepperItem>
    <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
    <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
  </IxStepper>

  <IxDivider />

  <IxStepper :progressDot="true" direction="vertical" :active="1">
    <IxStepperItem
      status="finish"
      title="Finished"
      subTitle="20:20:01"
      description="This is a description."
    ></IxStepperItem>
    <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
    <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
  </IxStepper>

  <IxDivider />

  <IxStepper :active="1">
    <template #progressDot="{ index, status, prefixCls }">
      <span :class="prefixCls + '-head-dot'" :title="index + 1 + ': Current status is ' + status"></span>
    </template>
    <IxStepperItem
      status="finish"
      title="Finished"
      subTitle="20:20:01"
      description="This is a description."
    ></IxStepperItem>
    <IxStepperItem title="In Progress" description="This is a description."></IxStepperItem>
    <IxStepperItem title="Waiting" description="This is a description."></IxStepperItem>
  </IxStepper>
</template>
