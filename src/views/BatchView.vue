<template>
  <v-container>
    <WorkflowHeader title="Batch processing requests"></WorkflowHeader>
    <div class="text-body-1">
      <p class="mb-3">
        A batch processing request is a set of specimens picked from any number of different
        biological material bundles, that should be sent forward to the sequencing pipeline.
      </p>
      <p class="mb-3">
        It is composed of several tubes that each contain one specimen to be sequenced.
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
    id: 'tube',
    type: 'custom',
    label: 'Bio mat. tube',
    position: { x: 300, y: 0 },
    width: 300,
    data: {
      icon: 'fa-vial',
      target: 'sampling',
      handles: defaultHandles(['bot'])
    }
  },
  {
    id: 'batch',
    type: 'custom',
    label: 'Batch request',
    position: { x: 300, y: 150 },
    width: 300,
    data: {
      icon: 'fa-table-cells',
      items: [
        {
          title: 'Number',
          appendIcon: 'fas fa-hashtag',
          content: {
            text: 'An identifier for the batch, possibly auto-generated.'
          }
        },
        {
          title: 'Completed on',
          content: {
            text: 'The date when the composition of the batch was finalized.'
          }
        },
        {
          title: 'Processed on',
          content: {
            text: 'The date when the batch content was fully sequenced.'
          }
        },
        {
          title: 'Status',
          content: {
            text: 'Indicated whether this batch is building, ready to be processed, or has been processed.'
          }
        },
        {
          title: 'Requested by',
          appendIcon: 'fas fa-user',
          content: { text: 'The person that created this batch of material' }
        },
        {
          title: 'Assignee',
          appendIcon: 'fas fa-user',
          content: { text: 'The person in charge of sequencing the content of this batch' }
        }
      ],
      handles: defaultHandles(['top'])
    }
  }
]

const nodes = ref(nodeDefinitions)

const edges: Edge[] = [
  {
    id: 'tube-batch',
    source: 'tube',
    target: 'batch',
    sourceHandle: 'bot',
    targetHandle: 'top',
    label: 'provides',
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
