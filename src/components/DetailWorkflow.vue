<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init @node-click="nodeClick">
    <template #node-custom="{ data, label }">
      <MainWorkflowNode v-if="data.target" v-bind="{ label, ...data, active: false }" />
      <DetailWorkflowNode v-else v-bind="{ label, ...data }" />
    </template>
  </VueFlow>
</template>

<script lang="ts">
import type { WorkflowNodeData } from './DetailWorkflowNode.vue'
export interface Node extends FlowNode<WorkflowNodeData> {}
</script>

<script setup lang="ts">
import type { Edge, Node as FlowNode, NodeMouseEvent } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import DetailWorkflowNode from './DetailWorkflowNode.vue'
import MainWorkflowNode from './MainWorkflowNode.vue'

useVueFlow({ id: 'sampling' })

const emit = defineEmits<{
  (event: 'goToWorkflow', id: string): void
}>()

function nodeClick({ node }: NodeMouseEvent) {
  node.data.link ? emit('goToWorkflow', node.id) : null
}

defineProps<{
  nodes: Node[]
  edges: Edge[]
}>()
</script>

<style scoped lang="less">
.vue-flow {
  background: white;
  width: 100%;
  height: calc(100vh - 300px);
}
</style>
