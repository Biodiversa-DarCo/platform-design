<template>
  <v-container>
    <h1 class="text-h4">Storage</h1>
    <v-divider class="my-6"></v-divider>
    <div class="text-body-1"></div>
    <DetailWorkflow :nodes="nodes" :edges="edges" v-bind="$attrs" />
  </v-container>
</template>

<script setup lang="ts">
import type { WorkflowNodeData } from '@/components/DetailWorkflowNode.vue'
import { Position, type Edge, type Node as FlowNode } from '@vue-flow/core'

import { ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import DetailWorkflow from '@/components/DetailWorkflow.vue'
import { defaultHandles } from '@/components/MultipleHandleNode.vue'

useVueFlow({ id: 'biomat' })

interface Node extends FlowNode<WorkflowNodeData> {}

const nodeDefinitions: Node[] = [
  {
    id: 'collection',
    type: 'custom',
    label: 'Collection',
    position: { x: 0, y: 200 },
    data: {
      icon: 'fa-boxes',
      handles: defaultHandles(['right']),
      items: [
        { title: 'Label' },
        { title: 'Maintainers', props: { appendIcon: 'fas fa-users' } },
        { title: 'Taxonomic group' }
      ]
    }
  },
  {
    id: 'biomat-store',
    type: 'custom',
    label: 'Biological material storage',
    position: { x: 400, y: 0 },
    data: {
      icon: 'fa-box',
      handles: defaultHandles(['left', 'right']),
      items: [{ title: 'Label' }, { title: 'Description' }]
    }
  },
  {
    id: 'slide-store',
    type: 'custom',
    label: 'Slides storage',
    position: { x: 400, y: 200 },
    data: {
      icon: 'fa-box',
      handles: defaultHandles(['left', 'right']),
      items: [{ title: 'Label' }, { title: 'Description' }]
    }
  },
  {
    id: 'dna-store',
    type: 'custom',
    label: 'DNA storage',
    position: { x: 400, y: 400 },
    data: {
      icon: 'fa-box',
      handles: defaultHandles(['left', 'right']),
      items: [{ title: 'Label' }]
    }
  },
  {
    id: 'biomat',
    type: 'custom',
    label: 'Biological Material',
    position: { x: 900, y: 0 },
    data: {
      handles: defaultHandles(['left']),
      target: 'biomat'
    }
  },
  {
    id: 'specimen',
    type: 'custom',
    label: 'Specimen (slides)',
    position: { x: 900, y: 200 },
    data: {
      handles: defaultHandles(['left']),
      target: 'biomat'
    }
  },
  {
    id: 'dna',
    type: 'custom',
    label: 'Sequencing [DNA]',
    position: { x: 900, y: 400 },
    data: {
      handles: defaultHandles(['left']),
      target: 'biomat'
    }
  }
]

const nodes = ref(nodeDefinitions)

const edges: Edge[] = [
  {
    id: 'collection-biomat',
    source: 'collection',
    target: 'biomat-store',
    sourceHandle: 'right',
    targetHandle: 'left',
    label: 'contains'
  },
  {
    id: 'collection-slides',
    source: 'collection',
    target: 'slide-store',
    sourceHandle: 'right',
    targetHandle: 'left',
    label: 'contains'
  },
  {
    id: 'collection-dna',
    source: 'collection',
    target: 'dna-store',
    sourceHandle: 'right',
    targetHandle: 'left',
    label: 'contains'
  },
  {
    id: 'sequencing-dna',
    source: 'dna',
    target: 'dna-store',
    sourceHandle: 'left',
    targetHandle: 'right',
    animated: true
  },
  {
    id: 'specimen-slides',
    source: 'specimen',
    target: 'slide-store',
    sourceHandle: 'left',
    targetHandle: 'right',
    animated: true
  },
  {
    id: 'biomat-biomat',
    source: 'biomat',
    target: 'biomat-store',
    sourceHandle: 'left',
    targetHandle: 'right',
    animated: true
  }
]
</script>

<style scoped lang="less">
.vue-flow {
  background: white;
  width: 100%;
  height: calc(100vh - 300px);
}
</style>
