<template>
  <IxDesc :header="header">
    <IxDescItem label="策略名称">保障网络会议</IxDescItem>
    <IxDescItem label="状态">禁用</IxDescItem>
    <IxDescItem label="操作人">saas</IxDescItem>
    <IxDescItem label="描述信息">优先保证网络会议带宽的使用</IxDescItem>
    <IxDescItem label="优先级">高</IxDescItem>
    <IxDescItem label="更新时间">2022-02-20 16:29</IxDescItem>
  </IxDesc>
</template>

<script setup lang="ts">
import { HeaderProps } from '@idux/components/header'

const header: HeaderProps = {
  title: '自定义头部',
  suffix: 'setting',
  onSuffixClick: () => console.log('onSuffixClick'),
}
</script>
