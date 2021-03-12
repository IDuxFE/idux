<template>
  <ix-button ref="triggerRef" @click="triggerEvents.onClick">Trigger</ix-button>
  <ix-portal target="ix-overlay">
    <article
      v-if="visibility"
      ref="overlayRef"
      v-typography
      v-click-outside="hide"
      class="overlay"
      @mouseenter="overlayEvents.onMouseenter"
      @mouseleave="overlayEvents.onMouseleave"
    >
      <h1 v-typography>深圳</h1>
      <p v-typography>
        深圳，简称“深”，别称鹏城，是<strong>广东省副省级市、计划单列市、超大城市，国务院批复确定的中国经济特区、全国性经济中心城市和国际化城市</strong>。截至2019年末，全市下辖9个区，总面积1997.47平方千米，建成区面积927.96平方千米，常住人口1343.88万人，比上年末增加41.22万人。其中常住户籍人口494.78万人，常住非户籍人口849.10万人。
      </p>
      <p v-typography>
        深圳地处中国华南地区、广东南部、珠江口东岸，东临大亚湾和大鹏湾，西濒珠江口和伶仃洋，南隔深圳河与香港相连，是粤港澳大湾区四大中心城市之一、国家物流枢纽、国际性综合交通枢纽、国际科技产业创新中心、中国三大全国性金融中心之一，并全力建设中国特色社会主义先行示范区、综合性国家科学中心、全球海洋中心城市。深圳水陆空铁口岸俱全，是中国拥有口岸数量最多、出入境人员最多、车流量最大的口岸城市。
      </p>
      <h2 v-typography>深圳辖区概况</h2>
      <ul>
        <li>福田区</li>
        <li>罗湖区</li>
        <li>南山区</li>
        <li>盐田区</li>
        <li>宝安区</li>
        <li>龙岗区</li>
        <li>龙华区</li>
        <li>坪山区</li>
        <li>光明区</li>
        <li>大鹏新区</li>
      </ul>
    </article>
  </ix-portal>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { IxButton } from '@idux/components'
import { IxPortal } from '@idux/cdk/portal'
import { useOverlay } from '@idux/cdk/overlay'
import { clickOutside } from '@idux/cdk/click-outside'

export default defineComponent({
  name: 'Portal',
  components: { IxButton, IxPortal },
  directives: { clickOutside },
  setup() {
    const { initialize, triggerRef, triggerEvents, overlayRef, overlayEvents, destroy, visibility, hide } = useOverlay({
      scrollStrategy: 'reposition',
      placement: 'bottom-start',
      trigger: 'click',
      offset: [5, 5],
      hideDelay: 500,
      showDelay: 100,
    })

    onMounted(initialize)

    onBeforeUnmount(destroy)

    return { triggerEvents, triggerRef, overlayRef, overlayEvents, visibility, hide }
  },
})
</script>
<style lang="less">
.overlay {
  width: 300px;
  height: 600px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 2px 1px 4px rgba(0, 0, 0, 0.6);
  overflow: auto;
}
</style>
