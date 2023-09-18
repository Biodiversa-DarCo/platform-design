<template>
  <v-container>
    <WorkflowHeader title="Sampling"></WorkflowHeader>
    <p class="mb-3">
      Sample collection is the starting point of the research workflow. A sampling operation is done
      on a site, whose coordinates and location are kept track of, as well as some descriptive
      variables such as the habitat type (e.g. subterranean freshwater, river). It targets one or
      several taxonomic groups.
    </p>
    <p class="mb-3">
      A sampling operation provides one or several bundles of
      <RouterLink :to="{ name: 'biomat' }">biological material</RouterLink>, or describes the origin
      of external sequences or biological material bundles.
    </p>

    <DetailWorkflow :nodes="nodes" :edges="edges" v-bind="$attrs" />
    <GiscusWrapper term="Sampling"></GiscusWrapper>
  </v-container>
</template>

<script setup lang="ts">
import type { Edge } from '@vue-flow/core'
import type { Node } from '@/components/DetailWorkflow.vue'

import { ref } from 'vue'
import { Position } from '@vue-flow/core'
import { defaultHandles } from '@/components/MultipleHandleNode.vue'
import DetailWorkflow from '@/components/DetailWorkflow.vue'
import { RouterLink } from 'vue-router'
import WorkflowHeader from '@/components/WorkflowHeader.vue'
import GiscusWrapper from '@/components/GiscusWrapper.vue'

const nodeDefinitions: Node[] = [
  {
    id: 'location',
    type: 'custom',
    label: 'Location',
    position: { x: 0, y: 0 },
    data: {
      handles: [{ id: 'right', type: 'source', position: Position.Right }],
      icon: 'fa-location',
      items: [
        { type: 'subheader', title: 'Locality' },
        { title: 'Country', content: { text: 'Picked from the complete list of countries' } },
        {
          title: 'Municipality',
          content: {
            text: 'A growing list of municipalities where sampling operations have been conducted.'
          }
        },
        { type: 'divider' },
        { type: 'subheader', title: 'Site' },
        {
          title: 'Code',
          appendIcon: 'fas fa-hashtag',
          content: { text: 'A unique, user-defined identifier for the site' }
        },
        { title: 'Name', content: { text: 'A name for the sampling site' } },
        { title: 'Description', content: { text: 'General infos on the site' } },
        { title: 'Coordinates', content: { text: ['Latitude, Longitude + Elevation'] } },
        {
          title: 'Habitat type',
          content: {
            text: [
              'A formalized classification of the site, picked from a predefined list.',
              'e.g. "River", "Subterranean waterbed", ...'
            ]
          }
        },
        {
          title: 'Access instructions',
          content: { text: 'Additional infos on how to get to the site.' }
        }
      ]
    }
  },
  {
    id: 'abiotic',
    type: 'custom',
    label: 'Abiotic measurement',
    width: 300,
    position: { x: 400, y: 0 },
    data: {
      icon: 'fa-temperature-half',
      handles: defaultHandles().filter(({ id }) => ['left', 'bot'].includes(id)),
      items: [{ title: 'Parameter' }, { title: 'Value' }]
    }
  },
  {
    id: 'sampling',
    type: 'custom',
    label: 'Sampling',
    width: 300,
    position: { x: 400, y: 200 },
    data: {
      icon: 'fa-bucket',
      items: [
        {
          title: 'Code',
          appendIcon: 'fas fa-hashtag',
          content: { text: 'Unique identifier generated as <code>{site_code}_{YearMonth}</code>' }
        },
        { title: 'Date', content: { text: 'Date of the sampling operation' } },
        { title: 'Duration', content: { text: 'Approximate duration of the sampling' } },
        {
          title: 'Target taxa',
          content: {
            text: 'One or several references to taxonomic groups that were targeted'
          }
        },
        {
          title: 'Participants',
          appendIcon: 'fas fa-users',
          content: {
            text: 'People that took part in the sampling operation'
          }
        },
        {
          title: 'Methods',
          content: {
            text: [
              'A list of sampling methods that were used.',
              'Picked from a predefined set of sampling methods.'
            ]
          }
        },
        {
          title: 'Donation',
          content: {
            text: ['Indicates whether this sampling was donated', 'e.g. participative science']
          }
        }
      ],
      handles: defaultHandles().filter(({ id }) => id !== 'top')
    }
  },
  {
    id: 'program',
    type: 'custom',
    label: 'Program',
    position: { x: 800, y: 260 },
    data: {
      icon: 'fa-file-circle-check',
      items: [
        { title: 'Name', content: { text: 'Name of the program that organizes the sampling' } },
        {
          title: 'Coordinators',
          appendIcon: 'fas fa-users',
          content: { text: 'People that manage the research program' }
        },
        {
          title: 'Funding agency',
          content: { text: 'Institution that funds the sampling program' }
        },
        { title: 'Start/end years' }
      ],
      handles: defaultHandles().filter(({ id }) => id === 'left')
    }
  },
  {
    id: 'biomat',
    type: 'custom',
    label: 'Biological material',
    position: { x: 0, y: 600 },
    data: {
      icon: 'fa-box',
      handles: defaultHandles(['right']),
      target: 'biomat'
    }
  },
  {
    id: 'ext-biomat',
    type: 'custom',
    label: 'External occurrences',
    position: { x: 800, y: 600 },
    width: 320,
    data: {
      icon: 'fa-box',
      handles: defaultHandles(['left']),
      target: 'external'
    }
  }
  // {
  //   id: 'ext-sequence',
  //   type: 'custom',
  //   label: 'External sequences',
  //   position: { x: 800, y: 700 },
  //   width: 320,
  //   data: {
  //     icon: 'fa-dna',
  //     handles: defaultHandles(['left']),
  //     target: 'external-sequence'
  //   }
  // }
]

const nodes = ref(nodeDefinitions)

const edges: Edge[] = [
  {
    id: 'sampling-biomat',
    source: 'sampling',
    target: 'biomat',
    sourceHandle: 'bot',
    targetHandle: 'top',
    animated: true
  },
  {
    id: 'location-sampling',
    source: 'location',
    target: 'sampling',
    sourceHandle: 'right',
    targetHandle: 'left'
  },
  {
    id: 'program-sampling',
    source: 'program',
    target: 'sampling',
    sourceHandle: 'left',
    targetHandle: 'right'
  },
  {
    id: 'sampling-ext-biomat',
    source: 'sampling',
    target: 'ext-biomat',
    sourceHandle: 'bot',
    targetHandle: 'left',
    animated: true
  },
  {
    id: 'sampling-ext-sequence',
    source: 'sampling',
    target: 'ext-sequence',
    sourceHandle: 'bot',
    targetHandle: 'left',
    animated: true
  },
  {
    id: 'location-abiotic',
    source: 'location',
    target: 'abiotic',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true
  },
  {
    id: 'abiotic-sampling',
    source: 'abiotic',
    target: 'sampling',
    sourceHandle: 'bot',
    targetHandle: 'top'
    // animated: true,
  }
]
</script>
