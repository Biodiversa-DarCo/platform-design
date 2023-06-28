<template>
  <div>
    Sample collection is the starting point of the research workflow. A sampling operation is done
    on a site, whose coordinates and location are kept track of. Other relevant informations are:
    <ul>
      <li>the sampling date</li>
      <li>the participants</li>
      <li>abiotic parameters</li>
    </ul>

    <VueFlow :nodes="nodes" fit-view-on-init>
      <template #node-custom="$props">
        <MultipleHandleNode v-bind="readonly($props)" />
      </template>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { Data } from '@/components/MultipleHandleNode.vue'
import type { Node as FlowNode, Edge } from '@vue-flow/core'

import { ref, readonly } from 'vue'
import { VueFlow, Position, useVueFlow } from '@vue-flow/core'
import MultipleHandleNode from '@/components/MultipleHandleNode.vue'
import LocalityContent from './entities/LocalityContent.vue'
import SiteContent from '@/components/entities/SiteContent.vue'
import SamplingContent from './entities/SamplingContent.vue'
import { markRaw } from 'vue'

useVueFlow({ id: 'sampling' })

interface Node extends FlowNode<Data> {}

const nodeDefinitions: Node[] = [
  {
    id: 'locality',
    type: 'custom',
    label: 'Locality',
    position: { x: 0, y: 0 },
    data: {
      handles: [{ id: 'right', type: 'source', position: Position.Right }],
      icon: 'fa-map',
      content: markRaw(LocalityContent)
    }
  },
  {
    id: 'site',
    type: 'custom',
    label: 'Site',
    position: { x: 300, y: 0 },
    data: { icon: 'fa-location', content: markRaw(SiteContent) }
  },
  {
    id: 'sampling',
    type: 'custom',
    label: 'Sampling',
    position: { x: 600, y: 0 },
    data: {
      icon: 'fa-bucket',
      content: markRaw(SamplingContent)
    }
  }
]

const nodes = ref(nodeDefinitions)
</script>

<style scoped></style>
