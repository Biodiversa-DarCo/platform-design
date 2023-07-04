<template>
  <div class="d-flex justify-space-between">
    <h1 class="text-h4">{{ title }}</h1>
    <a :href="githubURL(discussion)">
      <v-btn variant="outlined" color="blue">Discussion</v-btn>
    </a>
  </div>
  <v-divider class="my-3"></v-divider>
</template>

<script setup lang="ts">

defineProps<{ discussion: string; title: string }>()

function githubURL(target: string) {
  return `https://github.com/lsdch/darco-platform-design/discussions/categories/${target}`
}
</script>

<style scoped></style>
