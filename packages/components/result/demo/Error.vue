<template>
  <ix-result
    status="error"
    title="Submission Failed"
    subtitle="Please check and modify the following information before resubmitting."
  >
    <template #extra>
      <ix-button mode="primary">Go console</ix-button>
      <ix-button>Bug again</ix-button>
    </template>
    <!-- TODO use Typography -->
    The content you submitted has the following error:
    <ul>
      <li>Your account has been frozen.</li>
      <li>Your account is not yet eligible to apply.</li>
    </ul>
  </ix-result>
</template>
