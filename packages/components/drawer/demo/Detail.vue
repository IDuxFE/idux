<template>
  <div v-for="item in users" :key="item.id">
    <IxAvatar :src="item.avatar" />
    <IxButton mode="link" @click="showDrawer(item.id)"> View Profile </IxButton>
  </div>

  <IxDrawer v-model:visible="visible" header="User Profile">
    <IxDivider position="left">Basic Info</IxDivider>
    <IxRow>
      <IxCol span="8">
        <label>Full Name :</label>
        <span>{{ userDetail?.name }}</span>
      </IxCol>
      <IxCol span="16">
        <label>Email :</label>
        <span>{{ userDetail?.email }}</span>
      </IxCol>
    </IxRow>
    <IxRow>
      <IxCol span="8">
        <label>Full Name :</label>
        <span>{{ userDetail?.name }}</span>
      </IxCol>
      <IxCol span="16">
        <label>Email :</label>
        <span>{{ userDetail?.email }}</span>
      </IxCol>
    </IxRow>
    <IxRow>
      <IxCol span="8">
        <label>Full Name :</label>
        <span>{{ userDetail?.name }}</span>
      </IxCol>
      <IxCol span="16">
        <label>Email :</label>
        <span>{{ userDetail?.email }}</span>
      </IxCol>
    </IxRow>
    <IxDivider position="left">Basic Info</IxDivider>
    <IxRow>
      <IxCol span="8">
        <label>Full Name :</label>
        <span>{{ userDetail?.name }}</span>
      </IxCol>
      <IxCol span="16">
        <label>Email :</label>
        <span>{{ userDetail?.email }}</span>
      </IxCol>
    </IxRow>
    <IxRow>
      <IxCol span="8">
        <label>Full Name :</label>
        <span>{{ userDetail?.name }}</span>
      </IxCol>
      <IxCol span="16">
        <label>Email :</label>
        <span>{{ userDetail?.email }}</span>
      </IxCol>
    </IxRow>
    <IxRow>
      <IxCol span="8">
        <label>Full Name :</label>
        <span>{{ userDetail?.name }}</span>
      </IxCol>
      <IxCol span="16">
        <label>Email :</label>
        <span>{{ userDetail?.email }}</span>
      </IxCol>
    </IxRow>
    <IxDivider position="left">Basic Info</IxDivider>
    <IxRow>
      <IxCol span="8">
        <label>Full Name :</label>
        <span>{{ userDetail?.name }}</span>
      </IxCol>
      <IxCol span="16">
        <label>Email :</label>
        <span>{{ userDetail?.email }}</span>
      </IxCol>
    </IxRow>
    <IxRow>
      <IxCol span="8">
        <label>Full Name :</label>
        <span>{{ userDetail?.name }}</span>
      </IxCol>
      <IxCol span="16">
        <label>Email :</label>
        <span>{{ userDetail?.email }}</span>
      </IxCol>
    </IxRow>
    <IxRow>
      <IxCol span="8">
        <label>Full Name :</label>
        <span>{{ userDetail?.name }}</span>
      </IxCol>
      <IxCol span="16">
        <label>Email :</label>
        <span>{{ userDetail?.email }}</span>
      </IxCol>
    </IxRow>
    <IxDivider position="left">Basic Info</IxDivider>
    <IxRow>
      <IxCol span="8">
        <label>Full Name :</label>
        <span>{{ userDetail?.name }}</span>
      </IxCol>
      <IxCol span="16">
        <label>Email :</label>
        <span>{{ userDetail?.email }}</span>
      </IxCol>
    </IxRow>
    <IxRow>
      <IxCol span="8">
        <label>Full Name :</label>
        <span>{{ userDetail?.name }}</span>
      </IxCol>
      <IxCol span="16">
        <label>Email :</label>
        <span>{{ userDetail?.email }}</span>
      </IxCol>
    </IxRow>
    <IxRow>
      <IxCol span="8">
        <label>Full Name :</label>
        <span>{{ userDetail?.name }}</span>
      </IxCol>
      <IxCol span="16">
        <label>Email :</label>
        <span>{{ userDetail?.email }}</span>
      </IxCol>
    </IxRow>
  </IxDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
  avatar: string
}

const users: User[] = [
  { id: 0, name: 'Tom', email: 'iduxfe@example.com', avatar: '/images/avatar/0.png' },
  { id: 1, name: 'Wow', email: 'iduxfe@example.com', avatar: '/images/avatar/1.png' },
]

const visible = ref(false)
const userDetail = ref<User>()

const showDrawer = (id: number) => {
  userDetail.value = users.find(item => item.id === id)
  visible.value = !visible.value
}
</script>
