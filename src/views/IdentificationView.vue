<template>
  <v-container>
    <WorkflowHeader title="Morphological and molecular identification" discussion="identification">
    </WorkflowHeader>
    <p class="mb-3">
      Biological samples can be assigned to a taxonomic group using either morphological or
      molecular criteria.
    </p>
    <p class="mb-3">
      Molecular identification predominates of morphological criteria. As a result, we make a round
      trip from the level of biological material where identification is done on the basis of
      morphological traits, to the level of sequence where we can get a molecular identification.
      This molecular identification propagates back at the level of the specimen of which the DNA
      was extracted, and then to the biological material.
    </p>
    <p class="mb-3">
      A biological material bundle is defined as a collection of specimen in the same taxonomic
      group. Whenever some heterogeneity is discovered within a biological material bundle, it
      should be split as two distinct ones.
    </p>

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
    id: 'biomat',
    type: 'custom',
    label: 'Biological material',
    position: { x: 0, y: 50 },
    data: {
      handles: defaultHandles(['bot', 'right']),
      target: 'biomat',
      icon: 'fa-box'
    }
  },
  {
    id: 'specimen',
    type: 'custom',
    label: 'Specimen',
    position: { x: 0, y: 300 },
    data: {
      handles: defaultHandles(['top', 'right', 'bot']),
      icon: 'fa-locust',
      target: 'specimen'
    }
  },
  {
    id: 'sequence',
    type: 'custom',
    label: 'Sequence',
    position: { x: 0, y: 500 },
    data: {
      target: 'sequencing',
      icon: 'fa-dna',
      handles: defaultHandles(['top', 'right'])
    }
  },
  {
    id: 'taxon',
    type: 'custom',
    label: 'Taxon',
    position: { x: 900, y: 200 },
    data: {
      icon: 'fa-tag',
      items: [{ title: 'Name' }, { title: 'Level' }],
      handles: defaultHandles()
    }
  },
  {
    id: 'seqid',
    type: 'custom',
    label: 'Sequence ID',
    position: { x: 400, y: 500 },
    data: {
      icon: 'fa-chevron-right',
      handles: defaultHandles(['left', 'right'])
    }
  },
  {
    id: 'specimen-id',
    type: 'custom',
    label: 'Specimen: Molecular ID',
    position: { x: 400, y: 300 },
    data: {
      icon: 'fa-chevron-right',
      handles: defaultHandles(['left', 'right'])
    }
  },
  {
    id: 'biomat-id-morpho',
    type: 'custom',
    label: 'BioMat: Morphological ID',
    position: { x: 400, y: 0 },
    data: {
      icon: 'fa-chevron-right',
      handles: defaultHandles(['left', 'right'])
    }
  },
  {
    id: 'biomat-id-mol',
    type: 'custom',
    label: 'BioMat: Molecular ID',
    position: { x: 400, y: 100 },
    data: {
      icon: 'fa-chevron-right',
      handles: defaultHandles(['left', 'right'])
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
    animated: true
  },
  {
    id: 'specimen-seq',
    source: 'specimen',
    target: 'sequence',
    sourceHandle: 'bot',
    targetHandle: 'top',
    animated: true
  },
  {
    id: 'biomat-morpho-id',
    source: 'biomat',
    target: 'biomat-id-morpho',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true
  },
  {
    id: 'biomat-mol-id',
    source: 'biomat',
    target: 'biomat-id-mol',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true
  },
  {
    id: 'specimen-mol-id',
    source: 'specimen',
    target: 'specimen-id',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true,
    type: 'bezier'
  },
  {
    id: 'sequence-id',
    source: 'sequence',
    target: 'seqid',
    sourceHandle: 'right',
    targetHandle: 'left',
    type: 'bezier',
    animated: true
  },
  {
    id: 'seqid-taxon',
    source: 'seqid',
    target: 'taxon',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true,
    type: 'bezier'
  },
  {
    id: 'specimen-taxon',
    source: 'specimen-id',
    target: 'taxon',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true,
    type: 'bezier'
  },
  {
    id: 'biomat-taxon-morpho',
    source: 'biomat-id-morpho',
    target: 'taxon',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true,
    type: 'bezier'
  },
  {
    id: 'biomat-taxon-mol',
    source: 'biomat-id-mol',
    target: 'taxon',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true,
    type: 'bezier'
  },
  {
    id: 'taxon-parent',
    source: 'taxon',
    target: 'taxon',
    sourceHandle: 'right',
    targetHandle: 'top',
    label: 'has parent'
  },
  {
    id: 'seq-specimen-id',
    source: 'sequence',
    target: 'specimen-id',
    sourceHandle: 'right',
    targetHandle: 'left',
    type: 'bezier'
  }
]
</script>
