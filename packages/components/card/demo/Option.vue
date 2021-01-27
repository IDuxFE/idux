<template>
  <ix-card class="optionc-card" title="Small size card" :hoverable="true" size="small">
    <template #extra>
      <a href="#">More</a>
    </template>
    <p>card content</p>
    <p>card content</p>
    <template #footer>
      <div class="bottom-options">
        <ix-icon name="edit" />
        There is bottom options;
      </div>
    </template>
  </ix-card>
</template>
