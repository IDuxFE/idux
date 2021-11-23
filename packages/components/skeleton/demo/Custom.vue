<template>
  <div style="display: flex">
    <IxSkeleton type="circle" :width="40"></IxSkeleton>
    <div>
      <IxSkeleton width="60%"></IxSkeleton>
      <IxSkeleton :repeat="3" :width="400"></IxSkeleton>
    </div>
  </div>
</template>
