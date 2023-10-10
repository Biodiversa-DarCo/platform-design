<template>
  <v-container>
    <WorkflowHeader title="Taxonomy"> </WorkflowHeader>

    <p class="mb-3">
      Taxonomy is modelled as a recursive data structure, where each taxon refers to its direct
      parent, up to the <code>Kingdom</code> rank.
    </p>
    <p class="mb-3">
      This structure is intended to be compatible with the
      <a href="https://www.gbif.org/dataset/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c">
        GBIF backbone taxonomy
      </a>
      and to allow importing part of it as an initial seed for a possibly richer taxonomy.
    </p>

    <DetailWorkflow :nodes="nodes" :edges="edges" v-bind="$attrs" :style="{ height: '400px' }">
    </DetailWorkflow>
    <GiscusWrapper term="Identification"></GiscusWrapper>
  </v-container>
</template>

<script setup lang="ts">
import { Position, type Edge, MarkerType } from '@vue-flow/core'
import type { Node } from '@/components/DetailWorkflow.vue'

import { defaultHandles } from '@/components/MultipleHandleNode.vue'
import DetailWorkflow from '@/components/DetailWorkflow.vue'
import WorkflowHeader from '@/components/WorkflowHeader.vue'
import GiscusWrapper from '@/components/GiscusWrapper.vue'

const nodes: Node[] = [
  {
    id: 'identification',
    type: 'custom',
    label: 'Identification',
    position: { x: 0, y: 126 },
    data: {
      target: 'identification',
      handles: defaultHandles(['right'])
    }
  },
  {
    id: 'taxon',
    type: 'custom',
    label: 'Taxon',
    position: { x: 300, y: 0 },
    data: {
      icon: 'fa-sitemap',
      items: [
        { title: 'Name', content: { text: 'Canonical taxon name, e.g. "Asellus aquaticus"' } },
        {
          title: 'GBIF ID',
          content: { text: 'Original taxon ID in GBIF, if the taxon was imported.' }
        },
        {
          title: 'Code',
          appendIcon: 'fas fa-hashtag',
          content: { text: 'A unique short name to be used when refering to the taxon' }
        },
        { title: 'Rank', content: { text: 'Taxonomic rank, e.g. order, family, genus... ' } },
        {
          title: 'Status',
          content: {
            text: 'Either <code>Accepted</code>, <code>Synonym</code> or <code>Unclassified</code>. The latter signals taxa that are not part of the GBIF backbone taxonomy, e.g. have been manually inserted in the taxonomy.'
          }
        },
        { title: 'Authorship' }
      ],
      // handles: defaultHandles(['top', 'right'])
      handles: [
        {
          id: 'left',
          type: 'target',
          position: Position.Left
        },
        {
          id: 'top-right',
          type: 'source',
          position: Position.Right,
          style: { top: '20%', bottom: 'auto', background: 'none', border: 'none' }
        },
        {
          id: 'bot-right',
          type: 'target',
          position: Position.Right,
          style: { bottom: '20%', top: 'auto' }
        }
      ]
    }
  },
  {
    id: 'parent',
    type: 'custom',
    label: 'parent',
    position: { x: 600, y: 130 },
    data: {
      handles: defaultHandles(['top', 'bot'])
    }
  }
]

const edges: Edge[] = [
  {
    id: 'taxon-parent',
    source: 'taxon',
    target: 'parent',
    sourceHandle: 'bot-right',
    targetHandle: 'bot'
    // label: 'has parent'
    // type: 'self-ref'
  },
  {
    id: 'taxon-parent',
    source: 'parent',
    target: 'taxon',
    sourceHandle: 'top',
    targetHandle: 'top-right',
    markerEnd: { type: MarkerType.ArrowClosed, color: 'dodgerblue' }
    // label: 'has parent'
    // type: 'self-ref'
  },
  {
    id: 'id-taxon',
    source: 'identification',
    target: 'taxon',
    sourceHandle: 'right',
    targetHandle: 'left',
    markerEnd: { type: MarkerType.ArrowClosed, color: 'dodgerblue' }
  }
]
</script>

<style lang="less" scoped></style>
