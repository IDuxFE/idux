<template>
  <IxTag :number="3">低危</IxTag>
  <IxTag :number="4" status="risk">中危</IxTag>
  <IxTag :number="7" status="error">高危</IxTag>
  <IxTag :number="10" status="fatal">已失陷</IxTag>
  <br />
  <br />
  <IxTag filled :number="3">低危</IxTag>
  <IxTag filled :number="4" status="risk">中危</IxTag>
  <IxTag filled :number="7" status="error">高危</IxTag>
  <IxTag filled :number="10" status="fatal">已失陷</IxTag>
</template>
