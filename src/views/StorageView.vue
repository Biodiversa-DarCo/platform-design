<template>
  <v-container>
    <WorkflowHeader title="Storage"></WorkflowHeader>
    <div class="text-body-1">
      <p class="mb-3">
        Storage is organized in collections. A collection is a set of storage containers that target
        a taxonomic group, and is maintained by some people in the lab.
      </p>
      <p class="mb-3">
        Storage containers in a collection are of three kinds: biological material, specimen slides
        and DNA samples. Even though they belong to the same collection, they may be physically
        stored in different places, with different conditions. Collections may include several
        containers of the same kind.
      </p>
      <p class="mb-3">
        A storage container may contain a mix of elements from several collection. E.g. a specimen
        slide storage could contain specimen slides identified as different taxa, thus belonging to
        different collections.
      </p>
    </div>
    <DetailWorkflow :nodes="nodes" :edges="edges" v-bind="$attrs" />
    <GiscusWrapper term="Storage"></GiscusWrapper>
  </v-container>
</template>

<script setup lang="ts">
import type { WorkflowNodeData } from '@/components/DetailWorkflowNode.vue'
import { useVueFlow, type Edge, type Node as FlowNode } from '@vue-flow/core'

import { ref } from 'vue'
import DetailWorkflow from '@/components/DetailWorkflow.vue'
import { defaultHandles } from '@/components/MultipleHandleNode.vue'
import WorkflowHeader from '@/components/WorkflowHeader.vue'
import GiscusWrapper from '@/components/GiscusWrapper.vue'

useVueFlow({ id: 'biomat' })

interface Node extends FlowNode<WorkflowNodeData> {}

const nodeDefinitions: Node[] = [
  {
    id: 'collection',
    type: 'custom',
    label: 'Collection',
    position: { x: 0, y: 200 },
    data: {
      icon: 'fa-boxes',
      handles: defaultHandles(['right']),
      items: [
        { title: 'Label', content: { text: 'The name of the collection' } },
        {
          title: 'Maintainers',
          appendIcon: 'fas fa-users',
          content: {
            text: 'People responsible for the collection'
          }
        },
        {
          title: 'Taxonomic group',
          appendIcon: 'fas fa-sitemap',
          content: {
            text: 'Target taxonomic group of the collection'
          }
        }
      ]
    }
  },
  {
    id: 'biomat-store',
    type: 'custom',
    label: 'Biological material storage',
    position: { x: 400, y: 0 },
    data: {
      icon: 'fa-box',
      handles: defaultHandles(['left', 'right']),
      items: [
        { title: 'Label', content: { text: 'The physical label of the storage container' } },
        { title: 'Description' }
      ]
    }
  },
  {
    id: 'slide-store',
    type: 'custom',
    label: 'Slides storage',
    position: { x: 400, y: 200 },
    data: {
      icon: 'fa-box',
      handles: defaultHandles(['left', 'right']),
      items: [
        { title: 'Label', content: { text: 'The physical label of the storage container' } },
        { title: 'Description' }
      ]
    }
  },
  {
    id: 'dna-store',
    type: 'custom',
    label: 'DNA storage',
    position: { x: 400, y: 400 },
    data: {
      icon: 'fa-box',
      handles: defaultHandles(['left', 'right']),
      items: [
        { title: 'Label', content: { text: 'The physical label of the storage container' } },
        { title: 'Description' }
      ]
    }
  },
  {
    id: 'biomat',
    type: 'custom',
    label: 'Biological Material',
    position: { x: 900, y: 45 },
    width: 300,
    data: {
      icon: 'fa-box',
      handles: defaultHandles(['left']),
      target: 'biomat'
    }
  },
  {
    id: 'specimen',
    type: 'custom',
    label: 'Specimen (slides)',
    position: { x: 900, y: 245 },
    width: 300,
    data: {
      icon: 'fa-microscope',
      handles: defaultHandles(['left']),
      target: 'biomat'
    }
  },
  {
    id: 'dna',
    type: 'custom',
    label: 'Sequencing [DNA]',
    position: { x: 900, y: 445 },
    width: 300,
    data: {
      icon: 'fa-dna',
      handles: defaultHandles(['left']),
      target: 'sequencing'
    }
  }
]

const nodes = ref(nodeDefinitions)

const edges: Edge[] = [
  {
    id: 'collection-biomat',
    source: 'collection',
    target: 'biomat-store',
    sourceHandle: 'right',
    targetHandle: 'left'
  },
  {
    id: 'collection-dna',
    source: 'collection',
    target: 'dna-store',
    sourceHandle: 'right',
    targetHandle: 'left'
  },
  {
    id: 'collection-slides',
    source: 'collection',
    target: 'slide-store',
    sourceHandle: 'right',
    targetHandle: 'left',
    label: 'contains'
  },
  {
    id: 'sequencing-dna',
    source: 'dna',
    target: 'dna-store',
    sourceHandle: 'left',
    targetHandle: 'right',
    animated: true,
    type: 'bezier'
  },
  {
    id: 'specimen-slides',
    source: 'specimen',
    target: 'slide-store',
    sourceHandle: 'left',
    targetHandle: 'right',
    animated: true,
    type: 'bezier'
  },
  {
    id: 'biomat-biomat',
    source: 'biomat',
    target: 'biomat-store',
    sourceHandle: 'left',
    targetHandle: 'right',
    animated: true,
    type: 'bezier'
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
