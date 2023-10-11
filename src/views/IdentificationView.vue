<template>
  <v-container>
    <WorkflowHeader title="Morphological and molecular identification"> </WorkflowHeader>
    <p class="mb-3">
      Biological samples can be assigned to a taxonomic group using either morphological or
      molecular criteria, depending on whether a sequence is available. Molecular identification
      takes priority over morphological assignment.
    </p>
    <p class="mb-3">
      A biological material bundle is defined as a collection of specimens that were assigned to the
      same taxonomic group on morphological criteria. After sequencing, some taxonomic heterogeneity
      may appear within the bundle. Each sequenced specimen is tagged with a molecular assignment,
      and each of them is accessible from the bundle, taking precedence over the initial
      morphological assignment. A bundle may be split into several ones at any time, and does not
      have to be homogeneous with regard to molecular taxonomic assignments derived from its
      content.
    </p>
    <p class="mb-3">
      The molecular assignment for a specimen is derived from one of its sequences. Among the
      sequences derived from a specimen, a single one (defaulting to the first created) is tagged as
      the reference sequence, which indicates that the specimen should be assigned the same taxon as
      this sequence. Afterwards, other sequences from this specimen may automatically receive the
      same assignment as the reference one. Any discrepancy between taxonomic assignments on
      sequences of the same specimen is signaled to the users.
    </p>
    <p class="mb-3">
      External occurrence data follow roughly the same principles. External sequences and biological
      samples are tagged with a taxonomic assignment. External sequences may, or may not, be related
      to a biological sample: in this case, their molecular assignment takes precedence over the
      taxonomic assignment of the biological sample.
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
