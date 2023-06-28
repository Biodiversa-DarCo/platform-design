<script setup lang="ts">
import { ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import MainWorkflow from '@/components/MainWorkflow.vue'
import { computed } from 'vue'

const { getSelectedNodes } = useVueFlow({
  defaultViewport: { zoom: 0.55 },
  maxZoom: 4,
  minZoom: 0.1
  // nodesDraggable: false
})

const tabItems = ref(['Description', 'Other'])
const tab = ref('Description')

const selectedNode = computed(() => {
  const selectedNodes = getSelectedNodes.value
  return selectedNodes.length ? selectedNodes.pop() : undefined
})
</script>

<template>
  <v-container :fluid="true">
    <v-row>
      <v-col cols="6">
        <MainWorkflow></MainWorkflow>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-tabs v-model="tab" align-tabs="title">
            <v-tab v-for="item in tabItems" :key="item" :value="item">
              {{ item }}
            </v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="Description">
                <component
                  v-if="selectedNode !== undefined"
                  :is="selectedNode?.data.component"
                ></component>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';

/* :root {
  --vf-connection-path: green;
} */

.vue-flow {
  background: white;
  width: 100%;
  height: calc(100vh - 100px);
}
</style>
