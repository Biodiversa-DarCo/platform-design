<script setup lang="ts">
import type { ComputedRef } from 'vue'
import type { Node as FlowNode, Edge } from '@vue-flow/core'
import type { WorkflowNodeData } from './MainWorkflowNode.vue'

import { ref } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { VueFlow, Position, useVueFlow, MarkerType, Panel, PanelPosition } from '@vue-flow/core'

import MainWorkflowNode from './MainWorkflowNode.vue'
import { defaultHandles } from './MultipleHandleNode.vue'

const router = useRouter()

const { onPaneReady } = useVueFlow({
  defaultViewport: { zoom: 0.55 },
  maxZoom: 2,
  minZoom: 0.1
  // nodesDraggable: false
})

onPaneReady((instance) => instance.fitView())

const TRUNK_X_POS = 300

interface Node extends FlowNode<WorkflowNodeData> {}

const commonNodes: { [key: string]: Node } = {
  sampling: {
    id: 'sampling',
    type: 'custom',
    label: 'Sampling',
    position: { x: TRUNK_X_POS, y: 0 },
    data: {
      handles: [{ id: 'bot', type: 'source', position: Position.Bottom }],
      icon: 'fa-bucket',
      target: 'sampling'
    }
  },
  biomat: {
    id: 'biomat',
    type: 'custom',
    label: 'Biological material',
    position: { x: TRUNK_X_POS, y: 200 },
    data: {
      icon: 'fa-box',
      target: 'biomat'
    }
  },
  motu: {
    id: 'motu',
    label: 'Species hypotheses',
    type: 'custom',
    position: { x: 600, y: 800 },
    data: {
      handles: [{ type: 'target', id: 'handle', position: Position.Left }],
      icon: 'fa-tags',
      target: 'motu'
    }
  },
  identification: {
    id: 'identification',
    label: 'Identification',
    type: 'custom',
    position: { x: 700, y: 400 },
    targetPosition: Position.Left,
    data: {
      handles: [
        { type: 'target', id: 'handle', position: Position.Left },
        { type: 'target', id: 'handleTop', position: Position.Top },
        { type: 'target', id: 'handleBot', position: Position.Bottom }
      ],
      icon: 'fa-sitemap',
      target: 'identification'
    }
  }
}

const externalNodes: Node[] = [
  commonNodes.sampling,
  {
    ...commonNodes.biomat,
    id: 'external-biomat',
    label: 'External Bio. Mat.',
    data: {
      ...commonNodes.biomat.data,
      target: 'external-biomat',
      handles: defaultHandles(['top', 'bot'])
    },
    position: { x: 100, y: 300 }
  },
  {
    id: 'external-sequence',
    type: 'custom',
    label: 'External sequence',
    position: { x: 500, y: 300 },
    data: {
      icon: 'fa-dna',
      target: 'external-sequence',
      handles: defaultHandles(['top', 'right', 'bot'])
    }
  },
  {
    ...commonNodes.identification,
    id: 'external-identification',
    position: { x: 200, y: 500 },
    data: {
      ...commonNodes.identification.data,
      target: 'identification',
      handles: defaultHandles(['top'])
    }
  },
  {
    id: 'external-motu',
    label: 'Species hypotheses',
    type: 'custom',
    position: { x: 600, y: 500 },
    data: {
      handles: [{ type: 'source', id: 'right', position: Position.Right }],
      icon: 'fa-tags',
      target: 'motu'
    }
  }
]

const nodeDefinitions: Node[] = [
  commonNodes.sampling,
  commonNodes.biomat,
  {
    id: 'specimen',
    label: 'Specimen',
    type: 'custom',
    position: { x: TRUNK_X_POS, y: 400 },
    data: {
      icon: 'fa-locust',
      target: 'specimen'
    }
  },
  {
    id: 'sequencing',
    type: 'custom',
    label: 'Sequencing',
    position: { x: TRUNK_X_POS, y: 600 },
    data: {
      icon: 'fa-dna',
      target: 'sequencing'
    }
  },
  commonNodes.identification,
  commonNodes.motu,
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
      icon: 'fa-boxes-stacked',
      target: 'storage'
    }
  }
]

const view = ref(0)

const nodes: ComputedRef<Node[]> = computed(() => {
  return [nodeDefinitions, externalNodes][view.value].map<Node>(({ data, ...rest }) => ({
    width: 300,
    selected: router.currentRoute.value.name === data?.target,
    data,
    // height: 100,
    ...rest
  }))
})

const commonEdges: Edge[] = [
  {
    id: 'sampling-biomat',
    source: 'sampling',
    target: 'biomat'
  },
  {
    id: 'id-biomat',
    type: 'step',
    source: 'biomat',
    target: 'identification',
    sourceHandle: 'right',
    targetHandle: 'handleTop'
  }
]

const externalEdges: Edge[] = [
  {
    id: 'sampling-biomat',
    source: 'sampling',
    target: 'external-biomat'
  },
  {
    id: 'id-biomat',
    type: 'step',
    source: 'external-biomat',
    target: 'external-identification',
    sourceHandle: 'bot',
    targetHandle: 'handleTop'
  },
  {
    id: 'sampling-seq',
    source: 'sampling',
    target: 'external-sequence',
    sourceHandle: 'bot'
  },
  {
    id: 'id-seq',
    type: 'step',
    source: 'external-sequence',
    target: 'external-identification',
    sourceHandle: 'bot',
    targetHandle: 'handleTop'
  },
  {
    id: 'seq-motu-external',
    type: 'step',
    source: 'external-sequence',
    target: 'external-motu',
    sourceHandle: 'right',
    targetHandle: 'right'
  }
]

const internalEdges: Edge[] = [
  ...commonEdges,
  {
    id: 'biomat-specimen',
    source: 'biomat',
    target: 'specimen',
    sourceHandle: 'bot',
    targetHandle: 'top'
  },
  {
    id: 'specimen-seq',
    source: 'specimen',
    sourceHandle: 'bot',
    target: 'sequencing'
  },

  {
    id: 'id-specimen',
    type: 'step',
    source: 'specimen',
    sourceHandle: 'right',
    target: 'identification'
  },
  {
    id: 'id-seq',
    type: 'step',
    source: 'sequencing',
    target: 'identification',
    sourceHandle: 'right',
    targetHandle: 'handleBot'
  },
  {
    id: 'seq-motu',
    type: 'step',
    source: 'sequencing',
    target: 'motu',
    sourceHandle: 'bot',
    targetHandle: 'top'
  },
  {
    id: 'dna-storage',
    type: 'step',
    source: 'sequencing',
    target: 'storage',
    sourceHandle: 'left',
    targetHandle: 'handleBot'
  },
  { id: 'specimen-storage', type: 'step', source: 'specimen', target: 'storage' },
  {
    id: 'biomat-storage',
    type: 'step',
    source: 'biomat',
    target: 'storage',
    sourceHandle: 'left',
    targetHandle: 'handleTop'
  }
]

const edges: ComputedRef<Edge[]> = computed(() => {
  return [internalEdges, externalEdges][view.value]
})

const activeNodeName = computed(() => router.currentRoute.value.name)

const defaultEdgeOptions = {
  style: { stroke: 'dodgerblue', strokeWidth: '3px' },
  markerEnd: { type: MarkerType.ArrowClosed, color: 'dodgerblue' },
  animated: true
}

const buttons = [{ text: 'Internal data' }, { text: 'External data' }]
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    v-bind="$attrs"
    fit-view-on-init
    :default-edge-options="defaultEdgeOptions"
    class="mx-auto"
  >
    <v-item-group v-model="view" mandatory>
      <Panel :position="PanelPosition.TopLeft" class="d-flex flex-column">
        <v-item v-for="{ text } in buttons" :key="text" v-slot="{ isSelected, toggle }">
          <v-btn class="mb-3" :class="isSelected ? 'bg-info' : ''" @click="toggle">
            {{ text }}
          </v-btn>
        </v-item>
      </Panel>
    </v-item-group>
    <template #node-custom="{ data, label, id }">
      <MainWorkflowNode v-bind="{ label, active: id === activeNodeName, ...data }" />
    </template>
  </VueFlow>
</template>

<style lang="less">
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';

.vue-flow {
  background: white;
  width: 100%;
  height: calc(100vh - 100px);
}
</style>
