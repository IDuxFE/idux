<template>
  <IxSwitch v-model:checked="loading"></IxSwitch>
  <IxSkeleton :loading="loading" :repeat="3" style="margin: 16px 0">
    <div>
      人生在世，你只要知道两件事。一：这世界上绝对存在不需要读书也很聪明的人，不需要努力也过得很好的人，甚至不需要钱就能很快乐的人。二：这个人绝对不是你！
    </div>
  </IxSkeleton>

  <IxSkeleton v-if="loading" type="rect" :width="192" :height="192"></IxSkeleton>
  <img v-else src="/images/avatar/0.png" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)
</script>
