<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  color?: string
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: '#000',
  size: '20px',
})
const iconName = computed(() => `#icon-${props.name}`)
</script>

<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<style scoped>
.icon {
  width: v-bind(size);
  height: v-bind(size);
  position: relative;
}
</style>
