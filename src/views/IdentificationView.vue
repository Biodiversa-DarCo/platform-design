<template>
  <v-container>
    <WorkflowHeader title="Morphological and molecular identification"> </WorkflowHeader>
    <p class="mb-3">
      Biological samples can be assigned to a taxonomic group using either morphological or
      molecular criteria, depending on whether a sequence is available. Molecular identification
      takes priority over morphological assignment.
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
    <GiscusWrapper term="Identification"></GiscusWrapper>
  </v-container>
</template>

<script setup lang="ts">
import { MarkerType, type Edge } from '@vue-flow/core'
import type { Node } from '@/components/DetailWorkflow.vue'

import { defaultHandles } from '@/components/MultipleHandleNode.vue'
import DetailWorkflow from '@/components/DetailWorkflow.vue'
import WorkflowHeader from '@/components/WorkflowHeader.vue'
import GiscusWrapper from '@/components/GiscusWrapper.vue'

const nodes: Node[] = [
  {
    id: 'biomat',
    type: 'custom',
    label: 'Biological material',
    position: { x: 0, y: 50 },
    width: 300,
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
    position: { x: 0, y: 250 },
    width: 300,
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
    position: { x: 0, y: 450 },
    width: 300,
    data: {
      target: 'sequencing',
      icon: 'fa-dna',
      handles: defaultHandles(['top', 'right'])
    }
  },
  {
    id: 'taxonomy',
    type: 'custom',
    label: 'Taxonomy',
    position: { x: 800, y: 50 },
    width: 280,
    data: {
      icon: 'fa-sitemap',
      target: 'taxonomy',
      handles: defaultHandles(['bot'])
    }
  },
  {
    id: 'seqid',
    type: 'custom',
    label: 'Sequence ID',
    position: { x: 400, y: 460 },
    width: 300,
    data: {
      icon: 'fa-chevron-right',
      handles: defaultHandles(['left', 'right'])
    }
  },
  {
    id: 'specimen-id',
    type: 'custom',
    label: 'Specimen: Molecular ID',
    width: 300,
    position: { x: 400, y: 260 },
    data: {
      icon: 'fa-chevron-right',
      handles: defaultHandles(['left', 'right'])
    }
  },
  {
    id: 'biomat-id-morpho',
    type: 'custom',
    label: 'BioMat: Morpho ID',
    width: 300,
    position: { x: 400, y: 60 },
    data: {
      icon: 'fa-chevron-right',
      handles: defaultHandles(['left', 'right'])
    }
  },
  // {
  //   id: 'biomat-id-mol',
  //   type: 'custom',
  //   label: 'BioMat: Molecular ID',
  //   width: 300,
  //   position: { x: 450, y: 100 },
  //   data: {
  //     icon: 'fa-chevron-right',
  //     handles: defaultHandles(['left', 'right'])
  //   }
  // },
  {
    id: 'external',
    type: 'custom',
    label: 'Ext. occurrences',
    width: 280,
    position: { x: 800, y: 450 },
    data: {
      icon: 'fa-box',
      handles: defaultHandles(['top']),
      target: 'external'
    }
  },
  {
    id: 'identification',
    type: 'custom',
    label: 'Identification',
    width: 280,
    position: { x: 800, y: 200 },
    data: {
      icon: 'fa-box',
      handles: defaultHandles(['left', 'bot', 'top']),
      items: [{ title: 'Curator', appendIcon: 'fas fa-user' }, { title: 'Date' }]
    }
  }
]

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
    target: 'identification',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true,
    type: 'bezier'
  },
  {
    id: 'specimen-taxon',
    source: 'specimen-id',
    target: 'identification',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true,
    type: 'bezier'
  },
  {
    id: 'biomat-taxon-morpho',
    source: 'biomat-id-morpho',
    target: 'identification',
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
    type: 'bezier',
    label: 'refers to'
  },
  {
    id: 'taxon-ext-seq',
    target: 'identification',
    source: 'external-seq',
    targetHandle: 'bot',
    sourceHandle: 'left',
    animated: true
  },
  {
    id: 'taxon-ext-biomat',
    target: 'identification',
    source: 'external',
    targetHandle: 'bot',
    sourceHandle: 'left',
    animated: true
  },
  {
    id: 'id-taxon',
    source: 'identification',
    target: 'taxonomy',
    sourceHandle: 'top',
    targetHandle: 'bot',
    markerEnd: { type: MarkerType.ArrowClosed, color: 'dodgerblue' }
    // animated: true
  }
]
</script>
