<template>
  <div class="text-body-1">
    <p class="mb-3">
      A sampling operation provides one or several bundles of biological material. A biological
      material bundle contains several specimens that are all identified to a single taxonomic group
      (at least at this point, see the Identification workflow).
    </p>
    <p class="mb-">
      Functional traits can be attached to a biological material bundle to describe specimens it
      contains.
    </p>
  </div>
  <DetailWorkflow :nodes="nodes" :edges="edges" v-bind="$attrs" />
</template>

<script setup lang="ts">
import type { WorkflowNodeData } from '../DetailWorkflowNode.vue'
import { Position, type Edge, type Node as FlowNode } from '@vue-flow/core'

import { ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import DetailWorkflow from '../DetailWorkflow.vue'
import { defaultHandles } from '../MultipleHandleNode.vue'

useVueFlow({ id: 'biomat' })

interface Node extends FlowNode<WorkflowNodeData> {}

const nodeDefinitions: Node[] = [
  {
    id: 'sampling',
    type: 'custom',
    label: 'Sampling',
    position: { x: 300, y: 0 },
    data: {
      icon: 'fa-bucket',
      link: true,
      handles: defaultHandles().filter(({ id }) => id === 'bot')
    }
  },
  {
    id: 'biomat',
    type: 'custom',
    label: 'Biological material',
    position: { x: 300, y: 150 },
    data: {
      icon: 'fa-box',
      items: [
        { title: 'Code' },
        { title: 'Date' },
        { title: 'Sequencing advice' },
        { title: 'Status' },
        { title: 'Published in' },
        { title: 'Composition' }
      ],
      handles: defaultHandles()
        .map((handle) =>
          handle.position === Position.Right
            ? { ...handle, style: { bottom: '20%', top: 'auto' } }
            : handle
        )
        .concat([
          {
            id: 'traits',
            type: 'source',
            position: Position.Right,
            style: { top: '20%', bottom: 'auto' }
          }
        ])
    }
  },
  {
    id: 'specimen',
    type: 'custom',
    label: 'Specimens',
    position: { x: 300, y: 600 },
    data: {
      icon: 'fa-locust',
      handles: defaultHandles().filter(({ id }) => id === 'top'),
      link: true
    }
  },
  {
    id: 'identification',
    type: 'custom',
    label: 'Identification',
    position: { x: 700, y: 300 },
    data: {
      icon: 'fa-fingerprint',
      handles: defaultHandles().filter(({ id }) => id === 'left'),
      link: true
    }
  },
  {
    id: 'storage',
    type: 'custom',
    label: 'Storage',
    position: { x: 0, y: 300 },
    data: {
      icon: 'fa-boxes',
      handles: defaultHandles().filter(({ id }) => id === 'right'),
      link: true
    }
  },
  {
    id: 'traits',
    type: 'custom',
    label: 'Functional traits',
    position: { x: 700, y: 0 },
    data: {
      icon: 'fa-list',
      handles: defaultHandles().filter(({ id }) => id === 'left'),
      items: [{ title: 'Kind' }, { title: 'Value' }]
    }
  }
]

const nodes = ref(nodeDefinitions)

const edges: Edge[] = [
  {
    id: 'sampling-biomat',
    source: 'sampling',
    target: 'biomat',
    sourceHandle: 'bot',
    targetHandle: 'top',
    label: 'provides'
  },
  {
    id: 'biomat-specimen',
    source: 'biomat',
    target: 'specimen',
    sourceHandle: 'bot',
    targetHandle: 'top',
    label: 'contains'
  },
  {
    id: 'biomat-id',
    source: 'biomat',
    target: 'identification',
    sourceHandle: 'right',
    targetHandle: 'left'
  },
  {
    id: 'biomat-storage',
    source: 'biomat',
    target: 'storage',
    sourceHandle: 'left',
    targetHandle: 'right'
  },
  {
    id: 'biomat-traits',
    source: 'biomat',
    target: 'traits',
    sourceHandle: 'traits',
    targetHandle: 'left',
    label: 'has some'
  }
].map<Edge>((edge) => ({ type: 'step', ...edge }))
</script>

<style scoped lang="less">
.vue-flow {
  background: white;
  width: 100%;
  height: calc(100vh - 300px);
}
</style>
