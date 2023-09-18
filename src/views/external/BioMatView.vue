<template>
  <v-container>
    <WorkflowHeader title="External occurrences"></WorkflowHeader>
    <div class="text-body-1">
      <p class="mb-3">
        This is the part of the workflow dedicated to record so-called "external" data, with lower
        requirements on their level of details. This serves two main purposes:
      </p>
      <ul class="mb-3">
        <li>
          Collect data that were generated within the lab, but cannot fit in the main workflow
          because they do not have full traceability. This is expected of most data generated before
          adopting the use of this workflow. Accordingly, in the context of DarCo, this is the
          branch of the workflow that will be used for data integration.
        </li>
        <li>
          Integrate data from external sources, e.g. public databases, published literature or
          personnal communication.
        </li>
      </ul>
      <p class="mb-3">
        <b>External biological material bundles</b> are a collection of specimen published in the
        literature or public databases. Their content is not modelled as precisely as internal
        biological material, but is summarized as an approximate number of specimens, their
        taxonomic group, and possibly some functional traits.
      </p>
      <p class="mb-3">
        <b>External sequences</b> are sequences imported from the NCBI Nucleotide database. More
        rarely, they may also be unpublished material that were provided e.g. through personnal
        communications. Unlike their internal counterpart, external sequences do not have to be
        derived from a biological material sample, and may be directly issued from a sampling event.
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
    position: { x: 250, y: 0 },
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
    position: { x: 500, y: 150 },
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
      handles: defaultHandles(['top', 'right', 'left']).map((handle) =>
        handle.position === Position.Right
          ? { ...handle, style: { top: '20%', bottom: 'auto' } }
          : handle
      )
    }
  },
  {
    id: 'identification',
    type: 'custom',
    label: 'Identification',
    position: { x: 500, y: 500 },
    width: 300,
    data: {
      icon: 'fa-sitemap',
      handles: defaultHandles(['left', 'top']),
      target: 'identification'
    }
  },
  {
    id: 'traits',
    type: 'custom',
    label: 'Traits',
    position: { x: 900, y: 300 },
    data: {
      icon: 'fa-list',
      handles: defaultHandles(['top']),
      items: [{ title: 'Work in progress' }]
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
            ? { ...handle, style: { bottom: '10%', top: 'auto' } }
            : handle
        )
        .concat([
          {
            id: 'top-right',
            type: 'source',
            position: Position.Right,
            style: { top: '30%', bottom: 'auto' }
          }
        ])
    }
  },
  {
    id: 'motu',
    type: 'custom',
    label: 'Species Hypotheses',
    position: { x: 500, y: 600 },
    width: 300,
    data: {
      handles: defaultHandles(['left']),
      target: 'motu',
      icon: 'fa-tags'
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
    id: 'sampling-seq',
    source: 'sampling',
    target: 'sequence',
    sourceHandle: 'bot',
    targetHandle: 'top',
    label: 'provides',
    animated: true
  },
  {
    id: 'biomat-seq',
    source: 'sequence',
    target: 'biomat',
    sourceHandle: 'top-right',
    targetHandle: 'left',
    label: 'extracted from',
    animated: true
  },
  {
    id: 'biomat-seq',
    source: 'sequence',
    target: 'identification',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true
  },
  {
    id: 'biomat-id',
    source: 'biomat',
    target: 'identification',
    sourceHandle: 'bot',
    targetHandle: 'top',
    animated: true
  },
  {
    id: 'biomat-traits',
    source: 'biomat',
    target: 'traits',
    sourceHandle: 'right',
    targetHandle: 'top',
    label: 'has some'
  },
  {
    id: 'seq-motu',
    source: 'sequence',
    target: 'motu',
    sourceHandle: 'right',
    targetHandle: 'left',
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
