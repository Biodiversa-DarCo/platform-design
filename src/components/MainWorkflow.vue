<script setup lang="ts">
import type { Ref } from 'vue'
import type { Node as FlowNode, Edge } from '@vue-flow/core'
import type { WorkflowNodeData } from './MainWorkflowNode.vue'

import { ref, markRaw } from 'vue'
import { VueFlow, Position, useVueFlow, MarkerType } from '@vue-flow/core'
import SamplingWorkflow from '@/components/workflows/SamplingWorkflow.vue'
import MainWorkflowNode from './MainWorkflowNode.vue'
import BioMatWorkflow from './workflows/BioMatWorkflow.vue'

const { onPaneReady, addSelectedNodes } = useVueFlow({
  defaultViewport: { zoom: 0.55 },
  maxZoom: 4,
  minZoom: 0.1
  // nodesDraggable: false
})

onPaneReady((instance) => instance.fitView())

const X_OFFSET = 0

const TRUNK_X_POS = 300

interface Node extends FlowNode<WorkflowNodeData> {}

const nodeDefinitions: Node[] = [
  {
    id: 'sampling',
    type: 'custom',
    label: 'Sampling',
    position: { x: TRUNK_X_POS, y: 0 },
    data: {
      handles: [{ id: 'bot', type: 'source', position: Position.Bottom }],
      icon: 'fa-bucket',
      component: markRaw(SamplingWorkflow)
    }
  },
  {
    id: 'biomat',
    type: 'custom',
    label: 'Biological material',
    position: { x: TRUNK_X_POS, y: 200 },
    data: {
      icon: 'fa-box',
      component: markRaw(BioMatWorkflow)
    }
  },
  {
    id: 'specimen',
    label: 'Specimen',
    type: 'custom',
    position: { x: TRUNK_X_POS, y: 400 },
    data: {
      icon: 'fa-locust'
    }
  },
  {
    id: 'sequencing',
    type: 'custom',
    label: 'Sequencing',
    position: { x: TRUNK_X_POS, y: 600 },
    data: {
      icon: 'fa-dna'
    }
  },
  {
    id: 'identification',
    label: 'Identification',
    type: 'custom',
    position: { x: 700, y: 400 },
    targetPosition: Position.Left,
    width: 300,
    data: {
      handles: [
        { type: 'target', id: 'handle', position: Position.Left },
        { type: 'target', id: 'handleTop', position: Position.Top },
        { type: 'target', id: 'handleBot', position: Position.Bottom }
      ],
      icon: 'fa-fingerprint'
    }
  },
  {
    id: 'sp-hypotheses',
    label: 'Species hypotheses',
    type: 'custom',
    width: 400,
    position: { x: 600, y: 800 },
    targetPosition: Position.Left,
    data: {
      handles: [{ type: 'target', id: 'handle', position: Position.Left }],
      icon: 'fa-tags'
    }
  },
  {
    id: 'storage',
    label: 'Storage',
    type: 'custom',
    position: { x: 0, y: 400 },
    width: 200,
    data: {
      handles: [
        { type: 'target', id: 'handle', position: Position.Right },
        { type: 'target', id: 'handleTop', position: Position.Top },
        { type: 'target', id: 'handleBot', position: Position.Bottom }
      ],
      icon: 'fa-boxes-stacked'
    }
  }
]

const nodes: Ref<Node[]> = ref(
  nodeDefinitions.map<Node>(({ position: { x, y }, ...rest }) => ({
    position: { x: x + X_OFFSET, y },
    width: 300,
    // height: 100,
    ...rest
  }))
)

const edges: Ref<Edge[]> = ref(
  [
    {
      id: 'sampling-biomat',
      source: 'sampling',
      target: 'biomat',
      animated: true
      // style: { strokeWidth: '15px' }
    },
    {
      id: 'biomat-specimen',
      source: 'biomat',
      target: 'specimen',
      sourceHandle: 'bot',
      targetHandle: 'top',
      animated: true
    },
    {
      id: 'specimen-seq',
      source: 'specimen',
      sourceHandle: 'bot',
      target: 'sequencing',
      animated: true
    },
    {
      id: 'id-biomat',
      type: 'step',
      source: 'biomat',
      target: 'identification',
      sourceHandle: 'right',
      targetHandle: 'handleTop',
      animated: true
    },
    {
      id: 'id-specimen',
      type: 'step',
      source: 'specimen',
      sourceHandle: 'right',
      target: 'identification',
      animated: true
    },
    {
      id: 'id-seq',
      type: 'step',
      source: 'sequencing',
      target: 'identification',
      sourceHandle: 'right',
      targetHandle: 'handleBot',
      animated: true
    },
    {
      id: 'seq-motu',
      type: 'step',
      source: 'sequencing',
      target: 'sp-hypotheses',
      sourceHandle: 'bot',
      animated: true
    },
    {
      id: 'dna-storage',
      type: 'step',
      source: 'sequencing',
      target: 'storage',
      sourceHandle: 'left',
      targetHandle: 'handleBot',
      animated: true
    },
    { id: 'specimen-storage', type: 'step', source: 'specimen', target: 'storage', animated: true },
    {
      id: 'biomat-storage',
      type: 'step',
      source: 'biomat',
      target: 'storage',
      sourceHandle: 'left',
      targetHandle: 'handleTop',
      animated: true
    }
  ].map<Edge>((edge) => ({
    style: { stroke: 'green', strokeWidth: '5px' },
    markerEnd: MarkerType.ArrowClosed,
    ...edge
  }))
)
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :default-zoom="0.2"
    fit-view-on-init
    @nodeClick="
      ({ node }) => {
        addSelectedNodes([node])
      }
    "
  >
    <template #node-custom="{ data, label, selected }">
      <MainWorkflowNode v-bind="{ label, selected, ...data }" />
    </template>
  </VueFlow>
</template>

<style lang="less">
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';

/* :root {
  --vf-connection-path: green;
} */

.vue-flow {
  background: white;
  width: 100%;
  height: calc(100vh - 100px);
}
</style>
