<template>
  <IxProTree
    v-model:collapsed="collapsed"
    v-model:checkedKeys="checkedKeys"
    v-model:selectedKeys="selectedKeys"
    v-model:expandedKeys="expandedKeys"
    class="demo-pro-tree"
    placeholder="搜索"
    :style="{ height: '400px' }"
    :checkable="true"
    :dataSource="treeData"
  >
    <template #header>
      <IxHeader size="sm">
        标题
        <template #suffix>
          <div class="add-btn" @click="handleAdd"> 新增 </div>
        </template>
      </IxHeader>
    </template>
    <template #suffix>
      <IxIcon :style="{ 'margin-right': '8px' }" name="edit" @click="handleEdit" />
      <IxIcon name="delete" @click="handleDelete" />
    </template>
  </IxProTree>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = [
  {
    label: 'Node 0',
    key: '0',
    children: [
      {
        label: 'Node 0-0',
        key: '0-0',
        children: [
          {
            label: 'Node 0-0-0',
            key: '0-0-0',
          },
          {
            label: 'Node 0-0-1',
            key: '0-0-1',
          },
        ],
      },
      {
        label: 'Node 0-1',
        key: '0-1',
        children: [
          { label: 'Node 0-1-0', key: '0-1-0' },
          { label: 'Node 0-1-1', key: '0-1-1' },
        ],
      },
      {
        label: 'Node 0-2',
        key: '0-2',
        children: [
          {
            label: 'Node 0-2-0',
            key: '0-2-0',
          },
          {
            label: 'Node 0-2-1',
            key: '0-2-1',
          },
        ],
      },
      {
        label: 'Node 0-3',
        key: '0-3',
        children: [
          {
            label: 'Node 0-3-0',
            key: '0-3-0',
          },
          {
            label: 'Node 0-3-1',
            key: '0-3-1',
          },
        ],
      },
      {
        label: 'Node 0-4',
        key: '0-4',
        children: [
          {
            label: 'Node 0-4-0',
            key: '0-4-0',
          },
          {
            label: 'Node 0-4-1',
            key: '0-4-1',
          },
        ],
      },
    ],
  },
]

const checkedKeys = ref(['0'])
const selectedKeys = ref(['0'])
const expandedKeys = ref(['0', '0-1'])
const collapsed = ref(false)

const handleEdit = (evt: Event) => {
  console.log('edit')
  evt.stopPropagation()
}

const handleDelete = (evt: Event) => {
  console.log('delete')
  evt.stopPropagation()
}

const handleAdd = () => {
  console.log('add')
}
</script>

<style lang="less">
.demo-pro-tree {
  .add-btn {
    color: #1c6eff;
  }

  .ix-tree-node {
    .ix-tree-node-content-suffix {
      position: sticky;
      right: 12px;
      display: none;
      background-color: #fff;
      transition: background-color 0.3s;
    }

    &:hover {
      .ix-tree-node-content-suffix {
        display: inline-block;
        background-color: #f7f9fc;
      }
    }
    &-selected {
      .ix-tree-node-content-suffix {
        display: inline-block;
        background-color: #edf1f7;
      }
    }
  }
}
</style>
