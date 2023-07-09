<template>
  <RouterLink :to="targetRoute" custom v-slot="{ navigate }">
    <v-card
      class="node-card"
      height="100%"
      :color="active ? 'orange' : undefined"
      @click="exitAndNavigate(navigate)"
    >
      <v-card-item :prepend-icon="icon ? 'fas ' + icon : undefined">
        <v-card-title class="node-label text-overline">
          {{ label }}
        </v-card-title>
      </v-card-item>
    </v-card>
  </RouterLink>
  <MultipleHandleNode :handles="handles"></MultipleHandleNode>
</template>

<script setup lang="ts">
import type { Raw } from 'vue'
import type { HandleSpec } from './MultipleHandleNode.vue'
import type { NavigationFailure } from 'vue-router'
import MultipleHandleNode from './MultipleHandleNode.vue'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
// import { inject } from 'vue'

export type WorkflowNodeData = {
  icon?: string
  handles?: HandleSpec[]
  component?: Raw<object>
  target?: string
}

// const exit: Function | undefined = inject('exitFullscreen')
async function exitAndNavigate(
  navigate: (e?: MouseEvent | undefined) => Promise<void | NavigationFailure>
) {
  // if (exit !== undefined) {
  //   await exit()
  // }
  navigate()
}

const props = defineProps<
  WorkflowNodeData & { label: string; active: boolean; isFullscreen: boolean }
>()

const targetRoute = computed(() => {
  let query = props.isFullscreen ? { fullscreen: 'true' } : {}
  return { name: props.target, query }
})
</script>

<style scoped lang="less">
.node-card {
  cursor: pointer;
  border-width: 5px;
  border-color: rgb(55, 116, 116);
  &:hover * {
    color: purple;
  }

  .node-label {
    // font-size: x-large;
    // font-weight: bold;
    display: flex;
    align-items: center;
    hyphens: unset;

    margin: 10px 0px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    width: 100%;
    white-space: break-spaces;
    text-align: center;
    color: black;
    font-weight: bold;
    font-size: x-large;
    text-decoration: none;
  }
}
</style>
