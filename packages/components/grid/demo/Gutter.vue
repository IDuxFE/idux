<template>
  <div class="grey">
    <div>
      <p>gutter: 20</p>
      <ix-row :gutter="20">
        <ix-col span="10">
          <div class="block">Col</div>
        </ix-col>
        <ix-col span="10">
          <div class="block">Col</div>
        </ix-col>
        <ix-col span="10">
          <div class="block">Col</div>
        </ix-col>
        <ix-col span="10">
          <div class="block">Col</div>
        </ix-col>
      </ix-row>
    </div>
    <div>
      <p>[ { xs: 8, lg: 32, xl: 56 }, { xs: 16, lg: 48, xl: 72 }, ]</p>
      <ix-row
        :gutter="[
          { xs: 8, lg: 32, xl: 56 },
          { xs: 16, lg: 48, xl: 72 },
        ]"
      >
        <ix-col span="10">
          <div class="block">Col</div>
        </ix-col>
        <ix-col span="10">
          <div class="block">Col</div>
        </ix-col>
        <ix-col span="10">
          <div class="block">Col</div>
        </ix-col>
        <ix-col span="10">
          <div class="block">Col</div>
        </ix-col>
      </ix-row>
    </div>
    <div>
      <p>gutter: { xs: 8, sm: 24, md: 40, lg: 56, xl: 72, }</p>
      <ix-row
        :gutter="{
          xs: 8,
          sm: 24,
          md: 40,
          lg: 56,
          xl: 72,
        }"
      >
        <ix-col span="10">
          <div class="block">Col</div>
        </ix-col>
        <ix-col span="10">
          <div class="block">Col</div>
        </ix-col>
        <ix-col span="10">
          <div class="block">Col</div>
        </ix-col>
        <ix-col span="10">
          <div class="block">Col</div>
        </ix-col>
      </ix-row>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import './common/index.less';
</style>
