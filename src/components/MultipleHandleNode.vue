<script lang="ts">
import type { HandleType } from '@vue-flow/core'
import type { CSSProperties } from 'vue'
export type HandleSpec = {
  type: HandleType
  position: Position
  id: string
  style?: CSSProperties
}
export type Data = {
  handles?: HandleSpec[]
}

export function defaultHandles(): HandleSpec[] {
  return [
    { type: 'target', position: Position.Top, id: 'top' },
    { type: 'source', position: Position.Left, id: 'left' },
    { type: 'source', position: Position.Right, id: 'right' },
    { type: 'source', position: Position.Bottom, id: 'bot' }
  ]
}
</script>
<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { computed } from 'vue'

const props = defineProps<Data>()

const handles = computed((): HandleSpec[] => {
  return props.handles ? props.handles : defaultHandles()
})
</script>

<template>
  <slot></slot>
  <Handle
    v-for="(spec, key) in handles"
    :key="key"
    :id="spec.id"
    :type="spec.type"
    :position="spec.position"
    :style="spec.style"
  />
</template>
