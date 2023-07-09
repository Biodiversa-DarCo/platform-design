<template>
  <v-container>
    <WorkflowHeader title="Biological material"></WorkflowHeader>
    <div class="text-body-1">
      <p class="mb-3">
        A biological material bundle contains several specimens that are all identified to a single
        taxonomic group. Specimens are distributed in one or several tubes, which may contain one or
        more specimen.
      </p>
      <p class="mb-">
        Functional traits can be attached to a biological material bundle to describe specimens it
        contains.
      </p>
    </div>
    <DetailWorkflow :nodes="nodes" :edges="edges" v-bind="$attrs" />
    <GiscusWrapper term="Biological material"></GiscusWrapper>
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
    position: { x: 300, y: 0 },
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
    label: 'Biological material',
    position: { x: 300, y: 150 },
    width: 300,
    data: {
      icon: 'fa-box',
      items: [
        {
          title: 'Code',
          appendIcon: 'fas fa-hashtag',
          content: {
            text: 'A human readable identifier for the biological material, generated as <code>{taxname}|{sampling_code}</code>'
          }
        },
        {
          title: 'Date',
          content: {
            text: 'The date of constitution of the biological material.'
          }
        },
        {
          title: 'Sequencing advice',
          content: {
            text: [
              'Instructions on which parts of the biological material should be sent forward to sequencing.',
              'This is the current implementation in Gotit, but should be replaced with an explicit modelling of this part of the workflow in the database structure.'
            ]
          }
        },
        {
          title: 'Status',
          content: {
            text: 'Indicated whether this biological material bundle has been processed.'
          }
        },
        {
          title: 'Published in',
          appendIcon: 'fas fa-newspaper',
          content: { text: 'A reference to a Source where this biological material was published' }
        }
      ],
      handles: defaultHandles(['top', 'left', 'right'])
        .map((handle) =>
          [Position.Right, Position.Left].includes(handle.position)
            ? { ...handle, style: { bottom: '20%', top: 'auto' } }
            : handle
        )
        .concat([
          {
            id: 'traits',
            type: 'source',
            position: Position.Right,
            style: { top: '20%', bottom: 'auto' }
          },
          {
            id: 'storageHandle',
            type: 'source',
            position: Position.Left,
            style: { top: '20%', bottom: 'auto' }
          }
        ])
    }
  },
  {
    id: 'specimen',
    type: 'custom',
    label: 'Specimens',
    position: { x: 340, y: 600 },
    data: {
      icon: 'fa-locust',
      handles: defaultHandles(['top']),
      target: 'specimen'
    }
  },
  {
    id: 'identification',
    type: 'custom',
    label: 'Identification',
    position: { x: 700, y: 400 },
    data: {
      icon: 'fa-sitemap',
      handles: defaultHandles(['left']),
      target: 'identification'
    }
  },
  {
    id: 'storage',
    type: 'custom',
    label: 'Storage',
    position: { x: 0, y: 150 },
    data: {
      icon: 'fa-boxes',
      handles: defaultHandles(['right']),
      target: 'storage'
    }
  },
  {
    id: 'tube',
    type: 'custom',
    label: 'Tube',
    position: { x: 0, y: 450 },
    data: {
      icon: 'fa-vial',
      handles: defaultHandles(['top', 'right']),
      items: [
        {
          title: 'Label',
          content: { text: 'A label for the tube that matches its physical label' }
        },
        {
          title: 'Content type',
          content: {
            text: [
              'A description of the tube content as a tag, picked from a list of registered values.',
              'e.g. males/females, fragments, juveniles, mixed...'
            ]
          }
        }
      ]
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
      items: [
        {
          title: 'Kind',
          content: {
            text: [
              'A trait name, e.g. pigmentation.',
              'Picked from a configurable list of registered traits.'
            ]
          }
        },
        { title: 'Value', content: { text: 'A trait value' } }
      ]
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
    targetHandle: 'left',
    animated: true
  },
  {
    id: 'biomat-storage',
    source: 'biomat',
    target: 'storage',
    sourceHandle: 'storageHandle',
    targetHandle: 'right',
    animated: true
  },
  {
    id: 'biomat-traits',
    source: 'biomat',
    target: 'traits',
    sourceHandle: 'traits',
    targetHandle: 'left',
    label: 'has some'
  },
  {
    id: 'biomat-tubes',
    source: 'biomat',
    target: 'tube',
    sourceHandle: 'left',
    targetHandle: 'left',
    label: 'contains some'
  },
  {
    id: 'tubes-specimen',
    source: 'tube',
    target: 'specimen',
    sourceHandle: 'right',
    targetHandle: 'top',
    label: 'contains some'
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
