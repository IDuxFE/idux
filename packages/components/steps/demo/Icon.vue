<template>
  <ix-steps>
    <ix-step status="finish" title="Login" icon="user"></ix-step>
    <ix-step status="finish" title="Verification" icon="verified"></ix-step>
    <ix-step status="process" title="Pay" icon="loading"></ix-step>
    <ix-step status="wait" title="Done">
      <template #icon>
        <ix-icon name="smile" />
      </template>
    </ix-step>
  </ix-steps>
</template>
