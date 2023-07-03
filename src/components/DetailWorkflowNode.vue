<template>
  <v-card class="node-card">
    <v-card-item :prepend-icon="'fas ' + icon">
      <v-card-title class="node-label">
        <span class="text-overline">{{ label }}</span>
      </v-card-title>
    </v-card-item>
    <v-list v-if="items" density="compact" :items="items"></v-list>
  </v-card>
  <MultipleHandleNode :handles="handles"></MultipleHandleNode>
</template>

<script setup lang="ts">
import type { HandleSpec } from './MultipleHandleNode.vue'
import MultipleHandleNode from './MultipleHandleNode.vue'

export type WorkflowNodeData = {
  icon?: string
  handles?: HandleSpec[]
  items?: object[]
  target?: string
}

defineProps<WorkflowNodeData & { label: string }>()
</script>

<style scoped lang="less">
.node-card {
  border-width: 3px;
  border-color: rgb(30, 71, 104);
}
// .node-card.link {
//   border-width: 3px;
//   border-color: slategray;
//   cursor: pointer;

//   &:hover {
//     border-color: purple;
//   }
// }
</style>
