<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { HandleType, NodeProps } from '@vue-flow/core';

interface HandleSpec {
  type: HandleType,
  position: Position,
  id: string,
}

type PropType = NodeProps<{ handles: HandleSpec[] }, {}, string> & {
  label: string
}

// interface PropType extends NodeProps {
//   data: { handles: HandleSpec[] }
// }

defineProps<{
  label: string,
  data: { handles: HandleSpec[] }
}>()
// defineProps<(NodeProps<{ handles: HandleSpec[] }, {}, string>)>()

</script>

<template>
  <v-card :title="label" text="content"></v-card>
  <Handle v-for="(spec, key) in data.handles" :key="key" :id="spec.id" :type="spec.type" :position="spec.position" />
</template>