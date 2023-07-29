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
  <svg class="icon-class" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<style lang="less" scoped>
.icon-class {
  position: relative;
  width: v-bind(size);
  height: v-bind(size);
}
</style>
