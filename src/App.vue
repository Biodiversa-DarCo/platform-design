<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
// import HelloWorld from './components/HelloWorld.vue'

let drawer = ref(false)

</script>

<template>
  <v-app>


    <v-navigation-drawer v-model="drawer">
      <v-list nav>
        <v-list-item>
          <template v-slot:prepend>
            <RouterLink to="/">Home</RouterLink>
          </template>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <RouterLink to="/about">Workflow visualisation</RouterLink>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary">
      <v-app-bar-nav-icon variant="text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>DarCo Workflow</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
