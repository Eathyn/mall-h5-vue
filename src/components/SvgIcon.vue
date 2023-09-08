<script setup lang="ts">
import { computed } from 'vue'
import { IconProps } from '@/types/interface.ts'

const props = withDefaults(defineProps<IconProps>(), {
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
