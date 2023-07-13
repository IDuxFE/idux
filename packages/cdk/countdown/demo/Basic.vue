<template>
  <IxSpace vertical :size="20">
    <div class="countdown">
      <div class="timer">
        <div class="time-block">
          <span class="time">{{ hours }}</span>
          <span class="label">时</span>
        </div>
        <div class="time-block">
          <span class="time"> {{ minutes }}</span>
          <span class="label">分</span>
        </div>
        <div class="time-block">
          <span class="time">{{ seconds }}</span>
          <span class="label">秒</span>
        </div>
      </div>
    </div>
    <IxSwitch v-model:checked="active"></IxSwitch>
    <IxButton @click="reset">复原</IxButton>
  </IxSpace>
</template>

<script setup lang="ts">
import { useCountdown } from '@idux/cdk/countdown'

const { hours, minutes, seconds, active, reset } = useCountdown(9116 * 1000)
</script>
<style scoped>
.countdown {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.timer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: #fff;
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
}

.time {
  font-size: 3rem;
  color: #333;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.label {
  font-size: 1.5rem;
  color: #fff;
  margin-top: 10px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
