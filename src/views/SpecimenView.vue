<template>
  <v-container>
    <WorkflowHeader title="Specimen"></WorkflowHeader>
    <div class="text-body-1">
      <p>
        A specimen is a single individual isolated from a biological material bundle, from which it
        inherits a morphological identification. This identification may be revised at any time, by
        splitting the original biological material bundle in two, so that each bundle has a
        homogeneous content regarding the taxonomy.
      </p>
      <p>
        A specimen might be mounted on a slide for microscope analysis, which is stored separately
        among other specimen slides.
      </p>
    </div>
    <DetailWorkflow :nodes="nodes" :edges="edges" v-bind="$attrs" />
    <GiscusWrapper term="Specimen"></GiscusWrapper>
  </v-container>
</template>

<script setup lang="ts">
import type { WorkflowNodeData } from '@/components/DetailWorkflowNode.vue'
import { Position, type Edge, type Node as FlowNode } from '@vue-flow/core'

import { ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import DetailWorkflow from '@/components/DetailWorkflow.vue'
import { defaultHandles } from '@/components/MultipleHandleNode.vue'
import WorkflowHeader from '@/components/WorkflowHeader.vue'
import GiscusWrapper from '@/components/GiscusWrapper.vue'

useVueFlow({ id: 'biomat' })

interface Node extends FlowNode<WorkflowNodeData> {}

const nodeDefinitions: Node[] = [
  {
    id: 'biomat',
    type: 'custom',
    label: 'Biological material',
    position: { x: 350, y: 0 },
    width: 300,
    data: {
      icon: 'fa-bucket',
      handles: defaultHandles(['bot']),
      target: 'biomat'
    }
  },
  {
    id: 'specimen',
    type: 'custom',
    label: 'Specimen',
    position: { x: 350, y: 200 },
    width: 300,
    data: {
      icon: 'fa-box',
      items: [
        {
          title: 'Morphological Code',
          appendIcon: 'fas fa-hashtag',
          content: {
            text: [
              'A unique identifier generated as <code>{taxname}|{sampling_code}[{tube}]</code>.',
              'This definition is not consistent anymore, with regard to changes in the structure leading to tubes in a biologicial material bundle being explicitly modelled.'
            ]
          }
        },
        {
          title: 'Molecular Code',
          appendIcon: 'fas fa-hashtag',
          content: {
            text: 'An identifier generated as <code>{taxon#}_{sampling#}_{molecular_number}</code>'
          }
        },
        {
          title: 'Molecular number',
          appendIcon: 'fas fa-hashtag',
          content: {
            text: 'An identifier used downstream in the sequencing workflow'
          }
        },
        {
          title: 'Type',
          content: {
            text: 'A category, e.g. male/female, juvenile, fragment...'
          }
        }
      ],
      handles: defaultHandles(['top', 'right', 'bot'])
        .map((handle) =>
          [Position.Right].includes(handle.position)
            ? { ...handle, style: { bottom: '20%', top: 'auto' } }
            : handle
        )
        .concat(
          [
            {
              id: 'traits',
              position: Position.Right
            },
            {
              id: 'slide',
              position: Position.Left
            }
          ].map((protoHandle) => ({
            ...protoHandle,
            type: 'source',
            style: { top: '20%', bottom: 'auto' }
          }))
        )
    }
  },
  {
    id: 'identification',
    type: 'custom',
    label: 'Identification',
    position: { x: 800, y: 400 },
    data: {
      icon: 'fa-sitemap',
      handles: defaultHandles(['left']),
      target: 'identification'
    }
  },
  {
    id: 'storage',
    type: 'custom',
    label: 'Storage',
    position: { x: 0, y: 400 },
    width: 200,
    data: {
      icon: 'fa-boxes',
      handles: defaultHandles(['top']),
      target: 'storage'
    }
  },
  {
    id: 'traits',
    type: 'custom',
    label: 'Functional traits',
    position: { x: 800, y: 100 },
    data: {
      icon: 'fa-list',
      handles: defaultHandles(['left']),
      items: [{ title: 'Work in progress' }]
    }
  },
  {
    id: 'slide',
    type: 'custom',
    label: 'Slide',
    position: { x: 0, y: 100 },
    width: 200,
    data: {
      icon: 'fa-microscope',
      handles: defaultHandles(['right', 'bot']),
      items: [
        { title: 'Label', content: { text: 'The physical label on the slide' } },
        { title: 'Date' }
      ]
    }
  },
  {
    id: 'sequencing',
    type: 'custom',
    label: 'Sequencing',
    position: { x: 350, y: 600 },
    width: 300,
    data: {
      icon: 'fa-dna',
      handles: defaultHandles(['top']),
      target: 'sequencing'
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
    label: 'contains',
    animated: true
  },
  {
    id: 'specimen-id',
    source: 'specimen',
    target: 'identification',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true
  },
  {
    id: 'specimen-traits',
    source: 'specimen',
    target: 'traits',
    sourceHandle: 'traits',
    targetHandle: 'left',
    label: 'has some'
  },
  {
    id: 'specimen-slide',
    source: 'specimen',
    target: 'slide',
    sourceHandle: 'slide',
    targetHandle: 'right',
    label: 'mounted on'
  },
  {
    id: 'slide-storage',
    source: 'slide',
    target: 'storage',
    sourceHandle: 'bot',
    targetHandle: 'top',
    animated: true
  },
  {
    id: 'specimen-sequencing',
    source: 'specimen',
    target: 'sequencing',
    sourceHandle: 'bot',
    targetHandle: 'top',
    animated: true
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
