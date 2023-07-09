<template>
  <h1 class="text-h4">{{ title }}</h1>
  <v-divider class="my-3"></v-divider>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped></style>
