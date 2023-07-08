<template>
  <v-container>
    <WorkflowHeader
      title="External biological material"
      discussion="biological-material"
    ></WorkflowHeader>
    <div class="text-body-1">
      <p class="mb-3">
        A biological material bundle contains several specimens that are all identified to a single
        taxonomic group.
      </p>
      <p class="mb-3">
        Functional traits can be attached to a biological material bundle to describe specimens it
        contains.
      </p>
    </div>
    <DetailWorkflow :nodes="nodes" :edges="edges" v-bind="$attrs" />
    <GiscusWrapper term="External bio material" />
  </v-container>
</template>

<script setup lang="ts">
import type { WorkflowNodeData } from '@/components/DetailWorkflowNode.vue'

import WorkflowHeader from '@/components/WorkflowHeader.vue'
import { Position, type Edge, type Node as FlowNode } from '@vue-flow/core'

import { ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import DetailWorkflow from '@/components/DetailWorkflow.vue'
import { defaultHandles } from '@/components/MultipleHandleNode.vue'

import GiscusWrapper from '@/components/GiscusWrapper.vue'

useVueFlow({ id: 'biomat' })

interface Node extends FlowNode<WorkflowNodeData> {}

const nodeDefinitions: Node[] = [
  {
    id: 'sampling',
    type: 'custom',
    label: 'Sampling',
    position: { x: 150, y: 0 },
    width: 300,
    data: {
      icon: 'fa-bucket',
      target: 'sampling',
      handles: defaultHandles(['bot'])
    }
  },
  {
    id: 'biomat',
    type: 'custom',
    label: 'External bio. material',
    position: { x: 150, y: 200 },
    width: 300,
    data: {
      icon: 'fa-box',
      items: [
        {
          title: 'Code',
          appendIcon: 'fas fa-hashtag',
          content: {
            text: 'An identifier generated as <code>{taxon_code|sampling_code}</code>'
          }
        },
        { title: 'Date' },
        {
          title: 'Number of specimens',
          content: { text: 'An estimation of the number of specimens' }
        },
        {
          title: 'Published in',
          appendIcon: 'fas fa-newspaper',
          content: { text: 'A reference to the original source of the data' }
        },
        { title: 'Imported by', appendIcon: 'fas fa-user' }
      ],
      handles: defaultHandles(['top', 'right'])
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
    id: 'identification',
    type: 'custom',
    label: 'Identification',
    position: { x: 700, y: 500 },
    data: {
      icon: 'fa-sitemap',
      handles: defaultHandles(['left']),
      target: 'identification'
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
    label: 'provides',
    animated: true
  },
  {
    id: 'biomat-id',
    source: 'biomat',
    target: 'identification',
    sourceHandle: 'right',
    targetHandle: 'left'
  },
  {
    id: 'biomat-traits',
    source: 'biomat',
    target: 'traits',
    sourceHandle: 'traits',
    targetHandle: 'left',
    label: 'has some'
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
