<template>
  <IxComment :datetime="datetime">
    <template #author>
      <a>Han Solo</a>
    </template>
    <template #avatar>
      <IxAvatar src="/images/avatar/0.png" />
    </template>
    <template #content>
      <p>
        We supply a series of design principles, practical patterns and high quality design resources (Sketch and
        Axure), to help people create their product prototypes beautifully and efficiently.
      </p>
    </template>
    <template #actions>
      <IxTooltip title="Like">
        <span @click="handleLike">
          <IxIcon :name="likeIconName" />
          <span style="padding-left: 8px; cursor: auto">{{ likes }}</span>
        </span>
      </IxTooltip>
      <IxTooltip title="disLike">
        <span @click="handleDislike">
          <IxIcon :name="dislikeIconName" />
          <span style="padding-left: 8px; cursor: auto">{{ dislikes }}</span>
        </span>
      </IxTooltip>
      <span key="comment-basic-reply-to">Reply to</span>
    </template>
    <slot></slot>
  </IxComment>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { format } from 'date-fns'

const datetime = ref(format(new Date(), 'yyyy-MM-dd HH:mm'))
const likes = ref(0)
const dislikes = ref(0)
const action = ref('')

const likeStatus = 'liked'
const dislikedStatus = 'disliked'

const likeIconName = computed(() => (action.value === likeStatus ? 'like-filled' : 'like'))
const dislikeIconName = computed(() => (action.value === dislikedStatus ? 'dislike-filled' : 'dislike'))

const setAction = (status: string) => {
  action.value = status
}
const setLikes = (value: number) => {
  likes.value = value
}
const setDislikes = (value: number) => {
  dislikes.value = value
}
const handleLike = () => {
  setAction(likeStatus)
  setLikes(1)
  setDislikes(0)
}
const handleDislike = () => {
  setAction('disliked')
  setLikes(0)
  setDislikes(1)
}
</script>
