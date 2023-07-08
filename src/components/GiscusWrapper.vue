<template>
  <div class="comment-container">
    <Giscus
      id="comments"
      repo="lsdch/darco-platform-design"
      repo-id="R_kgDOJ1DOUg"
      mapping="specific"
      category="General"
      category-id="DIC_kwDOJ1DOUs4CXlZR"
      emit-metadata="0"
      input-position="top"
      theme="light"
      lang="en"
      crossorigin="anonymous"
      reactions-enabled="0"
      :term="term"
    />
  </div>
</template>

<script setup lang="ts">
import Giscus from '@giscus/vue'

defineProps<{ term: string }>()
</script>

<style scoped></style>
