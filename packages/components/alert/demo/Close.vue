<template>
  <IxAlert title="雪崩的时候，没有一片雪花是不崩的。" closable @beforeClose="onBeforeClose"></IxAlert>
  <IxAlert closable @beforeClose="handleBeforeClose"> 香蕉越大，香蕉皮越大。 </IxAlert>
  <IxAlert
    title="如果你愿意多花一点时间读完，你就会发现你多花了一点时间。"
    closable
    type="success"
    @close="onClose"
  ></IxAlert>
</template>

<script lang="ts" setup>
import { useMessage } from '@idux/components/message'
import { useModal } from '@idux/components/modal'

const { success } = useMessage()
const { confirm } = useModal()

const onBeforeClose = () => {
  success('onBeforeClose执行了。')
  return false
}

const handleBeforeClose = () => {
  return new Promise<boolean>(resolve => {
    const modalRef = confirm({
      title: '确认是否关闭？',
      footer: [
        {
          text: '确定',
          mode: 'primary',
          onClick: () => {
            resolve(true)
            modalRef.close()
          },
        },
        {
          text: '取消',
          mode: 'text',
          onClick: () => {
            resolve(false)
            modalRef.close()
          },
        },
      ],
    })
  })
}

const onClose = () => {
  success('close事件触发了。')
}
</script>
