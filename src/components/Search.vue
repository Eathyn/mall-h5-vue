<script setup lang="ts">
import { useSlots } from 'vue'

interface Props {
  modelValue?: string,
  hasBorder?: boolean
  hasSearchButton?: boolean
  hasCloseIcon?: boolean
  inputPlaceholder?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  hasBorder: false,
  hasSearchButton: false,
  hasCloseIcon: false,
  inputPlaceholder: '搜索',
})

const emits = defineEmits<{
  'update:modelValue': [value: string],
}>()

const slots = useSlots()

function handleInput(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}

function clearInput() {
  emits('update:modelValue', '')
}
</script>

<template>
  <div class="search">
    <div
      class="search__left-icon"
      v-show="slots['left-icon']"
    >
      <slot name="left-icon" />
    </div>

    <input
      class="search__input"
      :value="modelValue"
      :placeholder="inputPlaceholder"
      @input="handleInput"
    />

    <div
      class="search__clear"
      @click="clearInput"
      v-show="modelValue !== ''"
    >
      <SvgIcon
        name="round_close_fill"
        size="15px"
        color="#bfbfbf"
      />
    </div>

    <div
      v-show="slots['right-icon']"
      class="search__right-icon"
    >
      <slot name="right-icon" />
    </div>

    <div
      class="search__button"
      v-if="hasSearchButton"
    >
      <div class="search__button__text">搜索</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.search {
  display: flex;
  align-items: center;
  padding: 1.5px;
  border: 1.5px solid #ff511e;
  border-radius: 999px;

  .search__left-icon,
  .search__clear,
  .search__right-icon {
    display: flex;
    align-items: center;
  }

  .search__left-icon {
    padding: 0 10px;
    border-right: 1.5px solid #ededed;
  }

  .search__input {
    flex: 1;
    font-size: 13px;
    padding: 0 25px 0 10px;
    border: 0;
    outline: none;
  }

  .search__clear {
    margin-right: 12px;
  }

  .search__right-icon {
    margin-right: 8px;
  }

  .search__button {
    color: #ffffff;
    padding: 0 1px;
    border-radius: 999px;
    background: linear-gradient(90deg, #ff8814, #fd5500);

    .search__button__text {
      letter-spacing: 2px;
      font-size: 22px;
      transform: scale(0.5);
      transform-origin: center;
      white-space: nowrap;
    }
  }
}
</style>
