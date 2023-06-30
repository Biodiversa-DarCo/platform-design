<script setup lang="ts">
import { ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import MainWorkflow from '@/components/MainWorkflow.vue'
import { computed } from 'vue'

const { getSelectedNodes, findNode, addSelectedNodes } = useVueFlow({
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

function goToNode(id: string) {
  const maybeNode = findNode(id)
  switch (maybeNode) {
    case undefined:
      return addSelectedNodes([])
    default:
      return addSelectedNodes([maybeNode])
  }
}
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
                <div class="text-body-1" v-if="selectedNode === undefined">
                  <p class="mb-3">
                    This is a simplified representation of the research workflow as it is modelled
                    in the current implementation of GOTIT, an ecological data management platform
                    that is used at LEHNA to manage the lab research activities on asellids
                    biodiversity.
                  </p>

                  <p class="mb-3">
                    The purpose of this visualisation is to support the design of a data management
                    platform for DarCo, and come up with a solution that suits the specific needs of
                    every DarCo participants, while being generic enough to enable sharing data
                    across laboratories, and focus development efforts on a single common tool.
                  </p>

                  <p class="mb-3">
                    Arrows represent the direction of data flow, starting from the sampling of
                    specimens in their habitat, up to molecular barcoding. Each node represents a
                    main component of the research workflow, and hides most of the complexity in the
                    workflow structure to make the general model more intelligible. Clicking on a
                    node summons a more detailed view of its internal components, and their purpose.
                  </p>
                  <p class="mb-3">
                    Please take the time to explore the workflow graph and check whether it matches
                    the research practices in your lab.
                    <a href="" @click.prevent="goToNode('sampling')">Sampling</a>, as the first step
                    of data production, would be a good starting point. Although there are
                    definitely a lot of convergent needs that are already covered with the current
                    model, it is not likely to be a perfect match for everyone as it is. Besides
                    communicating on the model that we propose as a foundation for the web platform,
                    the main purpose of this visualisation is to identify as many elements as
                    possible that need to be adapted to account for everyone's work practices.
                  </p>
                  <p>
                    As you go through the workflow structure, please note which parts are unfit to
                    your need, or unclear, as well as features that are missing altogether.
                  </p>
                </div>
                <component
                  v-else-if="selectedNode.data.component"
                  :is="selectedNode?.data.component"
                  @goToWorkflow="(id: string) => goToNode(id)"
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
</style>
