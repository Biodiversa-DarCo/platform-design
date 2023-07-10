<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainWorkflow from './components/MainWorkflow.vue'

import { useDrawerStore } from './stores/drawer'
const { drawer, toggleDrawer } = useDrawerStore()
</script>

<template>
  <v-app>
    <v-app-bar color="indigo">
      <v-app-bar-nav-icon variant="text" @click="toggleDrawer"></v-app-bar-nav-icon>
      <RouterLink to="/" custom v-slot="{ navigate }">
        <button @click="navigate">
          <v-toolbar-title @click="navigate">DarCo: Platform design</v-toolbar-title>
        </button>
      </RouterLink>
      <v-spacer></v-spacer>
      <v-btn
        icon="fab fa-github"
        size="large"
        href="https://github.com/Biodiversa-DarCo/platform-design"
      ></v-btn>
    </v-app-bar>
    <v-navigation-drawer width="800" v-model="drawer" temporary>
      <MainWorkflow
        :zoom-on-scroll="false"
        :pan-on-drag="false"
        :nodes-draggable="false"
        :style="{ height: '100%' }"
      ></MainWorkflow>
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped lang="less"></style>
