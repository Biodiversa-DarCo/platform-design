<script setup lang="ts">
import type { Raw } from 'vue'
import type { HandleType, NodeProps } from '@vue-flow/core'
import { Handle, Position } from '@vue-flow/core'
import { computed } from 'vue'

export type HandleSpec = {
  type: HandleType
  position: Position
  id: string
}

export type Data = {
  handles?: HandleSpec[]
  icon?: string
  component?: Raw<object>
  content?: Raw<object>
  selectable?: boolean
}

export type NodePropType = NodeProps<Data, {}, string>

defineEmits(['updateNodeInternals'])

const props = defineProps<NodePropType>()

const handles = computed((): HandleSpec[] => {
  return props.data.handles
    ? props.data.handles
    : [
        { type: 'target', position: Position.Top, id: 'top' },
        { type: 'source', position: Position.Left, id: 'left' },
        { type: 'source', position: Position.Right, id: 'right' },
        { type: 'source', position: Position.Bottom, id: 'bot' }
      ]
})
</script>

<template>
  <v-card
    class="node-card"
    height="100%"
    :color="data.selectable && selected ? 'orange' : undefined"
  >
    <v-card-item>
      <v-card-title class="node-label">
        <v-icon v-if="data.icon"> fas {{ data.icon }}</v-icon>
        <span>{{ label }}</span>
      </v-card-title>
    </v-card-item>
    <v-divider v-if="data.content !== undefined"></v-divider>
    <component v-if="data.content !== undefined" :is="data.content"></component>
  </v-card>
  <Handle
    v-for="(spec, key) in handles"
    :key="key"
    :id="spec.id"
    :type="spec.type"
    :position="spec.position"
  />
</template>

<style scoped lang="less">
.node-card {
  cursor: pointer;
  border-width: 5px;
  border-color: rgb(55, 116, 116);
  padding: 20px 0px;
  &.selected {
    border-color: black;
  }
  .node-label {
    // font-size: x-large;
    // font-weight: bold;
    display: flex;
    align-items: center;
    hyphens: unset;

    i {
      width: 70px;
    }
    span {
      word-wrap: break-word;
      overflow-wrap: break-word;
      width: 100%;
      white-space: break-spaces;
      text-align: center;
    }
  }
}
</style>
