<script setup lang="ts">
import { GridItemProps } from '@/types/interface.ts'

defineProps<GridItemProps>()
</script>

<template>
  <div
    class="grid-item"
  >
    <SvgIcon
      :name="iconName"
      :color="iconColor"
      :size="iconSize"
    />
    <div class="grid-item__text">{{ text }}</div>
  </div>
</template>

<style scoped lang="less">
.grid-item {
  place-self: center;
  display: grid;
  justify-items: center;

  .grid-item__text {
    font-size: 12px;
    white-space: nowrap;
    color: #626a6c;
  }
}
</style>
