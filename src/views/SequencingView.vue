<template>
  <v-container>
    <WorkflowHeader title="Sequencing" discussion="sequencing"></WorkflowHeader>
    <DetailWorkflow :nodes="nodes" :edges="edges" v-bind="$attrs" />
  </v-container>
</template>

<script setup lang="ts">
import type { Edge } from '@vue-flow/core'
import type { Node } from '@/components/DetailWorkflow.vue'

import { ref } from 'vue'
import { defaultHandles } from '@/components/MultipleHandleNode.vue'
import DetailWorkflow from '@/components/DetailWorkflow.vue'
import WorkflowHeader from '@/components/WorkflowHeader.vue'

const nodeDefinitions: Node[] = [
  {
    id: 'specimen',
    type: 'custom',
    label: 'Specimen',
    position: { x: 500, y: 50 },
    data: {
      handles: defaultHandles(['bot']),
      target: 'specimen',
      icon: 'fa-locust'
    }
  },
  {
    id: 'DNA',
    type: 'custom',
    label: 'DNA',
    position: { x: 0, y: 200 },
    data: {
      handles: defaultHandles(['top', 'right']),
      icon: 'fa-dna',
      items: [
        { title: 'Concentration' },
        { title: 'Quality' },
        { title: 'Extraction date' },
        { title: 'Extraction method' },
        { title: 'Extracted by' }
      ]
    }
  },
  {
    id: 'PCR',
    type: 'custom',
    label: 'PCR',
    position: { x: 300, y: 200 },
    data: {
      icon: 'fa-refresh',
      items: [
        { title: 'Number' },
        { title: 'Date' },
        { title: 'Details' },
        { title: 'Target gene' },
        { title: 'Quality' },
        { title: 'Specificity' },
        { title: 'Forward primer' },
        { title: 'Reverse primer' },
        { title: 'Performed by' }
      ],
      handles: defaultHandles(['left', 'right'])
    }
  },
  {
    id: 'chromato',
    type: 'custom',
    label: 'Chromatogramme',
    position: { x: 600, y: 200 },
    data: {
      icon: 'fa-chart-column',
      items: [
        { title: 'Number' },
        { title: 'Sequencing institute' },
        { title: 'Quality' },
        { title: 'Primer' }
      ],
      handles: defaultHandles(['left', 'right'])
    }
  },
  {
    id: 'sequence',
    type: 'custom',
    label: 'Sequence',
    position: { x: 1000, y: 200 },
    data: {
      icon: 'fa-chevron-right',
      items: [
        { title: 'Date' },
        { title: 'Accession number' },
        { title: 'Code' },
        { title: 'Alignment code' },
        { title: 'Assembled by' },
        { title: 'Status' },
        { title: 'Published in' }
      ],
      handles: defaultHandles(['left', 'right'])
    }
  },
  {
    id: 'motu',
    type: 'custom',
    label: 'Species Hypotheses',
    position: { x: 1300, y: 300 },
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
    id: 'specimen-dna',
    source: 'specimen',
    target: 'DNA',
    sourceHandle: 'bot',
    targetHandle: 'top',
    animated: true,
    label: 'extraction'
  },
  {
    id: 'dna-pcr',
    source: 'DNA',
    target: 'PCR',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true,
    label: 'amplification'
  },
  {
    id: 'pcr-chromato',
    source: 'PCR',
    target: 'chromato',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true,
    label: 'sequencing'
  },
  {
    id: 'chromato-seq',
    source: 'chromato',
    target: 'sequence',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true,
    label: 'processed to'
  },
  {
    id: 'seq-motu',
    source: 'sequence',
    target: 'motu',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true,
    label: 'assigned to '
  }
]
</script>
