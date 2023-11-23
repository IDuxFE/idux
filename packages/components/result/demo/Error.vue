<template>
  <IxResult
    status="error"
    title="Submission Failed"
    subtitle="Please check and modify the following information before resubmitting."
  >
    <template #extra>
      <IxButton mode="primary">Go console</IxButton>
      <IxButton>Bug again</IxButton>
    </template>
    The content you submitted has the following error:
    <ul>
      <li>Your account has been frozen.</li>
      <li>Your account is not yet eligible to apply.</li>
    </ul>
  </IxResult>
</template>
