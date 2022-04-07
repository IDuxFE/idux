<template>
  <IxList :header="`${listData.length} replies`">
    <li v-for="item in listData" :key="item.id">
      <IxComment :author="item.author" :avatar="item.avatar">
        <template #content>
          <p>{{ item.content }}</p>
        </template>
        <template #actions>
          <span key="comment-basic-reply-to">Reply to</span>
        </template>
        <template #datetime>
          <p>
            <IxTooltip :title="item.datetime">
              <span>{{ item.datetime }}</span>
            </IxTooltip>
          </p>
        </template>
      </IxComment>
    </li>
  </IxList>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

const datetime = format(new Date(), 'yyyy-MM-dd HH:mm')
const listData = [
  {
    author: 'Han Solo',
    avatar: '/images/avatar/0.png',
    content: `We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.`,
    datetime: datetime,
  },
  {
    author: 'Han Solo',
    avatar: '/images/avatar/0.png',
    content: `We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.`,
    datetime: datetime,
  },
]
</script>
