<template>
  <v-container>
    <h1 class="text-h4">Sequencing</h1>
    <v-divider class="my-3"></v-divider>
    <p class="mb-3">
      Sample collection is the starting point of the research workflow. A sampling operation is done
      on a site, whose coordinates and location are kept track of, as well as some descriptive
      variables such as the habitat type (e.g. subterranean freshwater, river). It targets one or
      several taxonomic groups.
    </p>
    <p class="mb-3">
      A sampling operation provides one or several bundles of
      <a href="" @click.prevent="$emit('goToWorkflow', 'biomat')">biological material</a>.
    </p>

    <DetailWorkflow :nodes="nodes" :edges="edges" v-bind="$attrs" />
  </v-container>
</template>

<script setup lang="ts">
import type { Edge } from '@vue-flow/core'
import type { Node } from '@/components/DetailWorkflow.vue'

import { ref } from 'vue'
import { Position } from '@vue-flow/core'
import { defaultHandles } from '@/components/MultipleHandleNode.vue'
import DetailWorkflow from '@/components/DetailWorkflow.vue'

const nodeDefinitions: Node[] = [
  {
    id: 'DNA',
    type: 'custom',
    label: 'DNA',
    position: { x: 0, y: 0 },
    data: {
      handles: [{ id: 'right', type: 'source', position: Position.Right }],
      icon: 'fa-location',
      items: [
        { type: 'subheader', title: 'Locality' },
        { title: 'Country' },
        { title: 'Municipality' },
        { type: 'divider' },
        { type: 'subheader', title: 'Site' },
        { title: 'Name' },
        { title: 'Description' },
        { title: 'Coordinates', subtitle: 'Latitude ; Longitude ; Elevation' },
        { title: 'Habitat type' },
        { title: 'Access instructions' }
      ]
    }
  },
  {
    id: 'PCR',
    type: 'custom',
    label: 'PCR',
    position: { x: 300, y: 0 },
    data: {
      icon: 'fa-bucket',
      items: [
        { title: 'Date' },
        { title: 'Duration' },
        { title: 'Target taxa' },
        { title: 'Participants' },
        { title: 'Conditions' },
        { title: 'Methods' },
        { title: 'Is donation ?' }
      ],
      handles: defaultHandles().filter(({ id }) => id !== 'top')
    }
  },
  {
    id: 'chromato',
    type: 'custom',
    label: 'Chromatogramme',
    position: { x: 600, y: 0 },
    data: {
      icon: 'fa-file-circle-check',
      items: [
        { title: 'Name' },
        { title: 'Coordinators' },
        { title: 'Founding agency' },
        { title: 'Start/end years' }
      ],
      handles: defaultHandles().filter(({ id }) => id === 'left')
    }
  },
  {
    id: 'sequence',
    type: 'custom',
    label: 'Sequence',
    position: { x: 600, y: 300 },
    data: {
      icon: 'fa-file-circle-check',
      items: [
        { title: 'Name' },
        { title: 'Coordinators' },
        { title: 'Founding agency' },
        { title: 'Start/end years' }
      ],
      handles: defaultHandles().filter(({ id }) => id === 'left')
    }
  },
  {
    id: 'biomat',
    type: 'custom',
    label: 'Biological material',
    position: { x: 300, y: 500 },
    data: {
      icon: 'fa-box',
      handles: defaultHandles().filter(({ id }) => id === 'top'),
      target: 'biomat'
    }
  }
]

const nodes = ref(nodeDefinitions)

const edges: Edge[] = []
//   {
//     id: 'sampling-biomat',
//     source: 'sampling',
//     target: 'biomat',
//     sourceHandle: 'bot',
//     targetHandle: 'top',
//     animated: true
//   },
//   {
//     id: 'location-sampling',
//     source: 'location',
//     target: 'sampling',
//     sourceHandle: 'right',
//     targetHandle: 'left'
//   },
//   {
//     id: 'program-sampling',
//     source: 'program',
//     target: 'sampling',
//     sourceHandle: 'left',
//     targetHandle: 'right'
//   }
// ].map<Edge>((edge) => ({ type: 'step', ...edge }))
</script>
