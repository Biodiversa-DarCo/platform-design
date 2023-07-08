import { ref } from 'vue'

export function useDrawerStore() {
  const drawer = ref(false)
  function toggleDrawer() {
    drawer.value = !drawer.value
  }

  return { drawer, toggleDrawer }
}
