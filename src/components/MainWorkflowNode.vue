<template>
  <RouterLink :to="{ name: target }" custom v-slot="{ navigate }">
    <v-card
      class="node-card"
      height="100%"
      :color="active ? 'orange' : undefined"
      @click="navigate"
    >
      <v-card-item :prepend-icon="icon ? 'fas ' + icon : undefined">
        <v-card-title class="node-label">
          {{ label }}
        </v-card-title>
      </v-card-item>
    </v-card>
  </RouterLink>
  <MultipleHandleNode :handles="handles"></MultipleHandleNode>
</template>

<script setup lang="ts">
import type { Raw } from 'vue'
import type { HandleSpec } from './MultipleHandleNode.vue'
import MultipleHandleNode from './MultipleHandleNode.vue'
import { RouterLink } from 'vue-router'

export type WorkflowNodeData = {
  icon?: string
  handles?: HandleSpec[]
  component?: Raw<object>
  target?: string
}

defineProps<WorkflowNodeData & { label: string; active: boolean }>()
</script>

<style scoped lang="less">
.node-card {
  cursor: pointer;
  border-width: 5px;
  border-color: rgb(55, 116, 116);

  .node-label {
    // font-size: x-large;
    // font-weight: bold;
    display: flex;
    align-items: center;
    hyphens: unset;

    margin: 20px 0px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    width: 100%;
    white-space: break-spaces;
    text-align: center;
    color: black;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      color: purple;
    }
  }
}
</style>
