<template>
  <v-container>
    <WorkflowHeader title="External sequence" discussion="biological-material"></WorkflowHeader>
    <div class="text-body-1">
      <p class="mb-3">
        A gene sequence that was not produced in the lab, but was imported from published data in
        the literature or public databases.
      </p>
      <p class="mb-">
        Unlike internal sequences, external sequences are not attached to a specimen or a biological
        material bundle, but rather directly to a sampling. Their original taxonomic identification
        in the original source is saved, while a concurrent identification can be provided, for
        example as a result of blasting the sequence in your own database.
      </p>
    </div>
    <DetailWorkflow :nodes="nodes" :edges="edges" v-bind="$attrs" />
    <div class="comment-container">
      <GiscusWrapper term="External sequences" />
    </div>
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
import { useHead } from '@unhead/vue'
import GiscusWrapper from '@/components/GiscusWrapper.vue'

useHead({
  meta: [{ name: 'og:title', content: 'External sequences' }]
})
useVueFlow({ id: 'ext-seq' })

interface Node extends FlowNode<WorkflowNodeData> {}

const nodeDefinitions: Node[] = [
  {
    id: 'sampling',
    type: 'custom',
    label: 'Sampling',
    position: { x: 0, y: 0 },
    width: 300,
    data: {
      icon: 'fa-bucket',
      target: 'sampling',
      handles: defaultHandles(['bot'])
    }
  },
  {
    id: 'sequence',
    type: 'custom',
    label: 'External sequence',
    position: { x: 0, y: 150 },
    width: 300,
    data: {
      icon: 'fa-box',
      items: [
        {
          title: 'Gene',
          content: { text: ['Picked from a list of registered genes.', 'e.g. 16S, COI'] }
        },
        { title: 'Origin', content: { text: 'Source repository for the data, e.g. NCBI' } },
        {
          title: 'Code',
          appendIcon: 'fas fa-hashtag',
          content: {
            text: [
              'Unique identifier generated as <code>{status}_{external_taxon_code}_{sampling_code}_{specimen_number}_{accession_number}|{origin}</code>',
              'Status is omitted if it is "valid".'
            ]
          }
        },
        {
          title: 'Alignment code',
          appendIcon: 'fas fa-hashtag',
          content: {
            text: [
              'Unique identifier generated as <code>{status}_{internal_taxon_code}_{sampling_code}_{specimen_number}_{accession_number}|{origin}</code>',
              'Status is omitted if it is "valid".'
            ]
          }
        },
        {
          title: 'Accession number',
          content: { text: 'Sequence identifier in the source repository' }
        },
        {
          title: 'Specimen identifier',
          content: {
            text: [
              'Specimen identifier from which the sequence was extracted',
              'e.g. "Isolate number" in the NCBI'
            ]
          }
        },
        { title: 'Date' },
        {
          title: 'Status',
          content: {
            text: [
              'A qualification of the sequence.',
              'This distinguishes between "valid" sequences and other sequences that have undesirable features.',
              'e.g. contaminated or truncated'
            ]
          }
        },
        {
          title: 'Published in',
          appendIcon: 'fas fa-newspaper',
          content: { text: 'Reference to the original Source in which the sequence was published.' }
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
            id: 'external-id',
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
    position: { x: 600, y: 350 },
    data: {
      icon: 'fa-sitemap',
      handles: defaultHandles(['left']),
      target: 'identification'
    }
  }
]

const nodes = ref(nodeDefinitions)

const edges: Edge[] = [
  {
    id: 'sampling-biomat',
    source: 'sampling',
    target: 'sequence',
    sourceHandle: 'bot',
    targetHandle: 'top',
    label: 'provides',
    animated: true
  },
  {
    id: 'sequence-id',
    source: 'sequence',
    target: 'identification',
    sourceHandle: 'right',
    targetHandle: 'left',
    label: 'internal identification'
  },
  {
    id: 'sequence-ext-id',
    source: 'sequence',
    target: 'identification',
    sourceHandle: 'external-id',
    targetHandle: 'left',
    label: 'external identification'
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
