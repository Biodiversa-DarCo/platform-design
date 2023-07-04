<template>
  <v-container>
    <WorkflowHeader title="Specimen" discussion="specimen"></WorkflowHeader>
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
import WorkflowHeader from '@/components/WorkflowHeader.vue'

useVueFlow({ id: 'biomat' })

interface Node extends FlowNode<WorkflowNodeData> {}

const nodeDefinitions: Node[] = [
  {
    id: 'biomat',
    type: 'custom',
    label: 'Biological material',
    position: { x: 300, y: 0 },
    data: {
      icon: 'fa-bucket',
      handles: defaultHandles(['bot']),
      target: 'biomat'
    }
  },
  {
    id: 'specimen',
    type: 'custom',
    label: 'Specimen',
    position: { x: 300, y: 150 },
    data: {
      icon: 'fa-box',
      items: [
        { title: 'Molecular Code', props: { appendIcon: 'fas fa-hashtag' } },
        { title: 'Morphological Code', props: { appendIcon: 'fas fa-hashtag' } },
        { title: 'Tube Code' },
        { title: 'Molecular number' },
        { title: 'Type' }
      ],
      handles: defaultHandles()
        .map((handle) =>
          [Position.Right, Position.Left].includes(handle.position)
            ? { ...handle, style: { bottom: '20%', top: 'auto' } }
            : handle
        )
        .concat(
          [
            {
              id: 'traits',
              position: Position.Right
            },
            {
              id: 'slide',
              position: Position.Left
            }
          ].map((protoHandle) => ({
            ...protoHandle,
            type: 'source',
            style: { top: '20%', bottom: 'auto' }
          }))
        )
    }
  },
  {
    id: 'identification',
    type: 'custom',
    label: 'Identification',
    position: { x: 700, y: 400 },
    data: {
      icon: 'fa-fingerprint',
      handles: defaultHandles(['left']),
      target: 'identification'
    }
  },
  {
    id: 'storage',
    type: 'custom',
    label: 'Storage',
    position: { x: 0, y: 400 },
    data: {
      icon: 'fa-boxes',
      handles: defaultHandles(['top']),
      target: 'storage'
    }
  },
  {
    id: 'traits',
    type: 'custom',
    label: 'Functional traits',
    position: { x: 700, y: 100 },
    data: {
      icon: 'fa-list',
      handles: defaultHandles(['left']),
      items: [{ title: 'Kind' }, { title: 'Value' }]
    }
  },
  {
    id: 'slide',
    type: 'custom',
    label: 'Slide',
    position: { x: 0, y: 150 },
    data: {
      icon: 'fa-microscope',
      handles: defaultHandles(['right', 'bot']),
      items: [{ title: 'Label' }, { title: 'Date' }]
    }
  },
  {
    id: 'sequencing',
    type: 'custom',
    label: 'Sequencing',
    position: { x: 300, y: 600 },
    data: {
      icon: 'fa-dna',
      handles: defaultHandles(['top']),
      target: 'sequencing'
    }
  }
]

const nodes = ref(nodeDefinitions)

const edges: Edge[] = [
  {
    id: 'biomat-specimen',
    source: 'biomat',
    target: 'specimen',
    sourceHandle: 'bot',
    targetHandle: 'top',
    label: 'contains',
    animated: true
  },
  {
    id: 'specimen-id',
    source: 'specimen',
    target: 'identification',
    sourceHandle: 'right',
    targetHandle: 'left'
  },
  {
    id: 'specimen-traits',
    source: 'specimen',
    target: 'traits',
    sourceHandle: 'traits',
    targetHandle: 'left',
    label: 'has some'
  },
  {
    id: 'specimen-slide',
    source: 'specimen',
    target: 'slide',
    sourceHandle: 'slide',
    targetHandle: 'right',
    label: 'mounted on'
  },
  {
    id: 'slide-storage',
    source: 'slide',
    target: 'storage',
    sourceHandle: 'bot',
    targetHandle: 'top',
    animated: true
  },
  {
    id: 'specimen-sequencing',
    source: 'specimen',
    target: 'sequencing',
    sourceHandle: 'bot',
    targetHandle: 'top',
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
