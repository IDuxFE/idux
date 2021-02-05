<template>
  <div class="badge-demo">
    <ix-badge count="1000"></ix-badge>

    <ix-badge>
      <template #count>
        <ix-icon name="clock-circle"></ix-icon>
      </template>
    </ix-badge>

    <ix-badge count="100" color="#00f">
      <a href="#"></a>
    </ix-badge>

    <ix-badge count="1000" :overflowCount="999">
      <a href="#"></a>
    </ix-badge>

    <ix-badge dot>
      <a href="#"></a>
    </ix-badge>

    <ix-badge>
      <a href="#"></a>
      <template #count>
        <ix-icon name="clock-circle"></ix-icon>
      </template>
    </ix-badge>
  </div>
</template>

<style lang="less" scoped>
.badge-demo {
  & > * {
    margin-right: 20px;
    a {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      background-color: gainsboro;
    }
  }
}
</style>
