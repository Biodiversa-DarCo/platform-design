<template>
  <v-card class="node-card" height="100%" :color="selected ? 'orange' : undefined">
    <v-card-item :prepend-icon="icon ? 'fas ' + icon : undefined">
      <v-card-title class="node-label">
        <span>{{ label }}</span>
      </v-card-title>
    </v-card-item>
  </v-card>
  <MultipleHandleNode :handles="handles"></MultipleHandleNode>
</template>

<script setup lang="ts">
import type { Raw } from 'vue'
import type { HandleSpec } from './MultipleHandleNode.vue'
import MultipleHandleNode from './MultipleHandleNode.vue'

export type WorkflowNodeData = {
  icon?: string
  handles?: HandleSpec[]
  component?: Raw<object>
}

defineProps<WorkflowNodeData & { label: string; selected: boolean }>()
</script>

<style scoped lang="less">
.node-card {
  cursor: pointer;
  border-width: 5px;
  border-color: rgb(55, 116, 116);
  padding: 20px 0px;
  &.selected {
    border-color: black;
  }
  .node-label {
    // font-size: x-large;
    // font-weight: bold;
    display: flex;
    align-items: center;
    hyphens: unset;

    i {
      width: 70px;
    }
    span {
      word-wrap: break-word;
      overflow-wrap: break-word;
      width: 100%;
      white-space: break-spaces;
      text-align: center;
    }
  }
}
</style>
