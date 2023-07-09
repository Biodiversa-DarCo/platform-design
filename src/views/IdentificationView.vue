<template>
  <v-container>
    <WorkflowHeader title="Morphological and molecular identification"> </WorkflowHeader>
    <p class="mb-3">
      Taxonomy is represented as a hierarchical structure, where one record represents a specific
      taxon, which can be any rank. Each taxon refers to its direct parent in the taxonomy, up to
      the root taxon which is set depending on the focus of the database (e.g. Asellidae).
    </p>
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
    <GiscusWrapper term="Identification"></GiscusWrapper>
  </v-container>
</template>

<script setup lang="ts">
import type { Edge } from '@vue-flow/core'
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
    position: { x: 0, y: 300 },
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
    position: { x: 0, y: 550 },
    width: 300,
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
    position: { x: 850, y: 200 },
    data: {
      icon: 'fa-sitemap',
      items: [
        { title: 'Name', content: { text: 'Taxon name' } },
        {
          title: 'Code',
          appendIcon: 'fas fa-hashtag',
          content: { text: 'A unique short name to be used when refering to the taxon' }
        },
        { title: 'Rank', content: { text: 'Taxonomic rank, e.g. order, family, genus... ' } }
      ],
      handles: defaultHandles()
    }
  },
  {
    id: 'seqid',
    type: 'custom',
    label: 'Sequence ID',
    position: { x: 450, y: 560 },
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
    position: { x: 450, y: 310 },
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
    position: { x: 450, y: 20 },
    data: {
      icon: 'fa-chevron-right',
      handles: defaultHandles(['left', 'right'])
    }
  },
  {
    id: 'biomat-id-mol',
    type: 'custom',
    label: 'BioMat: Molecular ID',
    width: 300,
    position: { x: 450, y: 100 },
    data: {
      icon: 'fa-chevron-right',
      handles: defaultHandles(['left', 'right'])
    }
  },
  {
    id: 'external-biomat',
    type: 'custom',
    label: 'Ext. bio. material',
    width: 300,
    position: { x: 1000, y: 450 },
    data: {
      icon: 'fa-box',
      handles: defaultHandles(['left']),
      target: 'external-biomat'
    }
  },
  {
    id: 'external-seq',
    type: 'custom',
    label: 'External sequence',
    width: 300,
    position: { x: 1000, y: 550 },
    data: {
      icon: 'fa-box',
      handles: defaultHandles(['left']),
      target: 'external-sequence'
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
    type: 'bezier',
    label: 'refers to'
  },
  {
    id: 'taxon-ext-seq',
    target: 'taxon',
    source: 'external-seq',
    targetHandle: 'bot',
    sourceHandle: 'left',
    animated: true
  },
  {
    id: 'taxon-ext-biomat',
    target: 'taxon',
    source: 'external-biomat',
    targetHandle: 'bot',
    sourceHandle: 'left',
    animated: true
  }
]
</script>
