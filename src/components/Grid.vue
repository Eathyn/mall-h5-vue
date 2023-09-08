<script setup lang="ts">
import { GridProps } from '@/types/interface.ts'

defineProps<GridProps>()
</script>

<template>
  <div class="grid">
    <slot />
  </div>
</template>

<style scoped lang="less">
.grid {
  display: grid;
  grid-template-columns: repeat(v-bind(column), 1fr);
  grid-template-rows: repeat(v-bind(row), 1fr);
  row-gap: 10px;
  overflow-y: auto;
}

.grid::-webkit-scrollbar {
  height: 3px;
}

.grid::-webkit-scrollbar-track-piece {
  border-radius: 3px;
}

.grid::-webkit-scrollbar-thumb {
  background: #ff511e;
  border-radius: 3px;
}

.grid::-webkit-scrollbar-button:start:increment {
  width: 45%;
  display: block;
  background: transparent;
}

.grid::-webkit-scrollbar-button:end:increment {
  width: 45%;
  display: block;
  background: transparent;
}

.grid::-webkit-scrollbar-track-piece {
  background: #d4d7df;
}
</style>
