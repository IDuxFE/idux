<template>
  <ul class="floatSetting">
    <li>
      <GlobalTheme></GlobalTheme>
    </li>
    <li>
      <GlobalReturnTop></GlobalReturnTop>
    </li>
  </ul>
</template>

<script setup lang="ts"></script>

<style lang="less">
.floatSetting {
  position: fixed;
  right: 0;
  bottom: 82px;
  z-index: 99;
  cursor: pointer;
  // TODO need less var
  color: #000;
  background-color: #fff;
  padding: 6px;
  border-radius: 5px 0 0 5px;

  display: flex;
  flex-direction: column;
}
</style>
