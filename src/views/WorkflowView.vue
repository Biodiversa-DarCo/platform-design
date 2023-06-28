<script setup lang="ts">
import { ref } from "vue"
import { VueFlow, Position } from '@vue-flow/core'
import MultipleHandleNode from "@/components/MultipleHandleNode.vue";

const X_OFFSET = 200


function defaultHandles() {
  return [
    { type: "target", position: Position.Top, id: "top" },
    { type: "source", position: Position.Left, id: "left" },
    { type: "source", position: Position.Right, id: "right" },
    { type: "source", position: Position.Bottom, id: "bot" }
  ]
}

const nodes = ref([
  // Nodes
  // An input node, specified by using `type: 'input'`
  {
    id: 'sampling', type: 'custom', label: 'Sampling', position: { x: 250, y: 5 },
    data: {
      handles: [{ id: "bot", type: "source", position: Position.Bottom }]
    }
  },
  // { id: 'location', parentNode: "sampling", label: 'location' },

  // Default nodes, you can omit `type: 'default'`
  {
    id: 'biomat', type: "custom", label: 'Biological material', position: { x: 250, y: 100 },
    data: {
      handles: defaultHandles()
    }
  },
  {
    id: 'sequencing', type: "custom", label: 'Sequencing', position: { x: 250, y: 300 },
    data: {
      handles: defaultHandles()
    }
  },
  {
    id: 'identification', label: 'Identification', type: "output", position: { x: 500, y: 300 },
    targetPosition: Position.Left
  },
  {
    id: 'sp-hypotheses', label: 'Species hypotheses', type: "output", position: { x: 500, y: 400 },
    targetPosition: Position.Left
  },
  {
    id: 'storage', label: 'Storage', type: "output", position: { x: 50, y: 300 },
    targetPosition: Position.Right
  },
  {
    id: "specimen", label: "Specimen", type: "custom", position: { x: 250, y: 200 },
    data: { handles: defaultHandles() }
  }
].map(({ position: { x, y }, ...rest }) => {
  return {
    ...rest, position: { x: x + X_OFFSET, y }
  }
}))

const edges = ([
  { id: 'sampling-biomat', source: 'sampling', target: 'biomat', animated: true },
  { id: 'biomat-specimen', source: 'biomat', target: 'specimen', sourceHandle: "bot", targetHandle: "top", animated: true },
  { id: 'specimen-seq', source: 'specimen', sourceHandle: "bot", target: 'sequencing', animated: true },
  { id: 'id-biomat', type: "step", source: 'biomat', target: 'identification', sourceHandle: "right", animated: true },
  { id: 'id-specimen', type: "step", source: 'specimen', sourceHandle: 'right', target: 'identification', animated: true },
  { id: 'id-seq', type: "step", source: 'sequencing', target: 'identification', sourceHandle: "right", animated: true },
  { id: 'seq-motu', type: "step", source: 'sequencing', target: 'sp-hypotheses', sourceHandle: "bot", animated: true },
  { id: 'dna-storage', type: "step", source: 'sequencing', target: 'storage', animated: true },
  { id: 'specimen-storage', type: "step", source: 'specimen', target: 'storage', animated: true },
  { id: 'biomat-storage', type: "step", source: 'biomat', target: 'storage', animated: true },
])
</script>
<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <template #node-custom="$props">
      <MultipleHandleNode v-bind="$props" />
    </template>
  </VueFlow>
  <MultipleHandleNode label="kanar" :data="{ handles: [] }" />
</template>

<style>
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';

.vue-flow {
  background: white;
  width: 100vw;
  height: 100vh;
}
</style>
