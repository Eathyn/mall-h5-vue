import { ref } from 'vue'

export default function useOverlay() {
  const showOverlay = ref<boolean>(false)

  return {
    showOverlay,
  }
}
