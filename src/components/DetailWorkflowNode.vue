<template>
  <v-card class="node-card" variant="outlined">
    <v-card-item :prepend-icon="icon ? 'fas ' + icon : undefined">
      <v-card-title class="node-label">
        <span class="text-overline">{{ label }}</span>
      </v-card-title>
    </v-card-item>
    <v-card-text v-if="items">
      <v-list density="compact" v-model:selected="selection">
        <div v-for="(item, i) in items" :key="i">
          <v-divider v-if="item.type === 'divider'"></v-divider>
          <v-list-subheader v-else-if="item.type === 'subheader'">{{
            item.title
          }}</v-list-subheader>
          <v-list-item v-else :value="item.content ? item : undefined">
            <template v-slot:append>
              <v-icon :icon="item.appendIcon"></v-icon>
            </template>
            <v-list-item-title>{{ item.title }} </v-list-item-title>
            <v-menu
              v-if="item.content"
              :offset="30"
              activator="parent"
              :close-on-content-click="false"
              location="end top"
              origin="start top"
              attach="#workflow-container"
            >
              <v-card :elevation="1" :max-width="300">
                <v-card-title primary-title>
                  {{ item.content.title }}
                </v-card-title>
                <v-card-text v-if="typeof item.content.text === 'string'">
                  <span v-html="item.content.text"></span>
                </v-card-text>
                <v-card-text v-else>
                  <p class="mb-1" v-for="(text, key) in item.content.text" :key="key">
                    <span v-html="text"></span>
                  </p>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-list-item>
        </div>
      </v-list>
    </v-card-text>
  </v-card>
  <MultipleHandleNode :handles="handles"></MultipleHandleNode>
</template>

<script setup lang="ts">
import type { HandleSpec } from './MultipleHandleNode.vue'
import MultipleHandleNode from './MultipleHandleNode.vue'
import { ref } from 'vue'
import { VListItem } from 'vuetify/components'

type ItemContent = {
  title?: string
  text?: string | string[]
}
type ItemProp = VListItem['$props'] & { content?: ItemContent; type?: 'subheader' | 'divider' }

export type WorkflowNodeData = {
  icon?: string
  handles?: HandleSpec[]
  items?: ItemProp[]
  target?: string
}

defineProps<WorkflowNodeData & { label: string }>()

const selection = ref([])
</script>

<style scoped lang="less">
.node-card {
  border-color: rgb(30, 71, 104);
}
</style>
