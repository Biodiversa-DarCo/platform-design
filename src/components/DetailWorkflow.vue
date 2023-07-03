<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init :defaultEdgeOptions="defaultEdgeOptions">
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
import type { Edge, Node as FlowNode } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import DetailWorkflowNode from './DetailWorkflowNode.vue'
import MainWorkflowNode from './MainWorkflowNode.vue'

useVueFlow({ id: 'sampling' })

defineProps<{
  nodes: Node[]
  edges: Edge[]
}>()

const defaultEdgeOptions = {
  type: 'step',
  style: { stroke: 'dodgerblue', strokeWidth: '3px' },
  labelStyle: { fontSize: '16px' }
}
</script>

<style scoped lang="less">
.vue-flow {
  background: white;
  width: 100%;
  height: calc(100vh - 300px);
}
</style>
