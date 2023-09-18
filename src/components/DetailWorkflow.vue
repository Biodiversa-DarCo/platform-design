<template>
  <div ref="flowContainer" id="workflow-container">
    <VueFlow
      :class="isFullscreen ? 'fullscreen' : ''"
      :nodes="nodes"
      :edges="edges"
      :style="style"
      fit-view-on-init
      :defaultEdgeOptions="defaultEdgeOptions"
      :zoom-on-scroll="false"
      :pan-on-drag="false"
      :prevent-scrolling="false"
      :nodes-draggable="false"
      :zoom-on-double-click="false"
      @viewport-change="() => fitView({ padding: 0.15 })"
    >
      <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
      <Panel :position="PanelPosition.TopRight" class="d-flex flex-column">
        <v-btn icon="fa fa-maximize" @click="toggleFullscreen"> </v-btn>
      </Panel>
      <template #node-custom="{ data, label }">
        <MainWorkflowNode
          v-if="data.target"
          v-bind="{ label, ...data, active: false, isFullscreen }"
        />
        <!-- @click="exit" -->
        <DetailWorkflowNode v-else v-bind="{ label, ...data }" />
      </template>
    </VueFlow>
  </div>
</template>

<script lang="ts">
import type { WorkflowNodeData } from './DetailWorkflowNode.vue'
import type { CSSProperties } from 'vue'
export interface Node extends FlowNode<WorkflowNodeData> {}
</script>

<script setup lang="ts">
import type { Edge, Node as FlowNode } from '@vue-flow/core'

import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { VueFlow, useVueFlow, Panel, PanelPosition } from '@vue-flow/core'
import DetailWorkflowNode from './DetailWorkflowNode.vue'
import MainWorkflowNode from './MainWorkflowNode.vue'

const route = useRoute()

const { fitView } = useVueFlow({ id: 'workflow-details' })

const flowContainer = ref(null)
const isFullscreen = ref(route.query.fullscreen === 'true')

async function toggleFullscreen(): Promise<void> {
  isFullscreen.value = !isFullscreen.value
}

defineProps<{
  nodes: Node[]
  edges: Edge[]
  style?: CSSProperties
}>()

const defaultEdgeOptions = {
  type: 'step',
  style: { stroke: 'dodgerblue', strokeWidth: '3px' },
  labelStyle: { fontSize: '16px' }
}
</script>

<style scoped lang="less">
.vue-flow {
  background: white;
  width: 100%;
  height: calc(100vh - 300px);
  &.fullscreen {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
  }
}
</style>
