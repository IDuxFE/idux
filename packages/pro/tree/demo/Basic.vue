<template>
  <IxProTree
    v-model:collapsed="collapsed"
    v-model:checkedKeys="checkedKeys"
    v-model:expandedKeys="expandedKeys"
    :selectedKeys="selectedKeys"
    class="demo-pro-tree"
    placeholder="搜索"
    :style="{ height: '400px' }"
    :height="321"
    :checkable="true"
    :dataSource="treeData"
    :onSearch="onSearch"
    :onUpdate:selectedKeys="onUpdateSelectedKeys"
  >
    <template #header>
      <IxHeader size="sm">
        标题
        <template #suffix>
          <div class="add-btn" @click="handleAdd"> 新增 </div>
        </template>
      </IxHeader>
    </template>
    <template #suffix="{ key, selected, node }">
      <IxSpace>
        <IxIcon class="operation-icon" name="edit" @click.stop="handleEdit(key, selected, node)" />
        <IxIcon class="operation-icon" name="delete" @click.stop="handleDelete(key, selected, node)" />
      </IxSpace>
    </template>
  </IxProTree>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

import { type TreeNode } from '@idux/components'

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

const handleEdit = (key: string, selected: boolean, node: TreeNode) => {
  selectedKeys.value = [key]
  console.log('edit', key, selected, node)
}

const handleDelete = (key: string, selected: boolean, node: TreeNode) => {
  selectedKeys.value = [key]
  console.log('delete', key, selected, node)
}

const handleAdd = () => {
  console.log('add')
}

const onSearch = (searchVal: string) => {
  console.log('searchVal', searchVal)
  if (searchVal === '') {
    // 处理每次搜索清空后选项全部收缩问题
    nextTick(() => {
      expandedKeys.value = ['0', '0-1']
    })
  }
}

const onUpdateSelectedKeys = (keys: string[]) => {
  selectedKeys.value = keys
}
</script>

<style lang="less">
.demo-pro-tree {
  .add-btn {
    font-size: 12px;
    color: #1c6eff;
  }

  .ix-tree-node {
    .ix-tree-node-content-suffix {
      position: sticky;
      right: 12px;
      display: none;
    }

    &:hover {
      .ix-tree-node-content-suffix {
        display: inline-block;
      }
    }
    &-selected {
      .ix-tree-node-content-suffix {
        display: inline-block;
      }
    }
  }

  .operation-icon {
    color: #5e6573;
    &:hover {
      color: #1c6eff;
    }
  }
}
</style>
