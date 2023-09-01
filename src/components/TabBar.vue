<script setup lang="ts">
import { ref } from 'vue'

type TabType = 'home' | 'video' | 'message' | 'cart' | 'me'

import { useRouter } from 'vue-router'

const router = useRouter()
const active = ref<TabType | null>(null)

function handleIconClick(tab: TabType) {
  active.value = tab
  router.push({ name: `${tab.charAt(0).toUpperCase()}${tab.slice(1)}` })
}
</script>

<template>
  <div class="container">
    <div
      class="home"
      @click="handleIconClick('home')"
    >
      <SvgIcon
        name="home"
        size="24px"
        :color="active === 'home' ? '#fd3a00' : '#000'"
      />
      <div
        class="home__text"
        :style="{ color: active === 'home' ? '#fd3a00' : '#000' }"
      >
        首页
      </div>
    </div>

    <div
      class="video"
      @click="handleIconClick('video')"
    >
      <SvgIcon
        name="video"
        size="24px"
        :color="active === 'video' ? '#fd3a00' : '#000'"
      />
      <div
        class="video__text"
        :style="{ color: active === 'video' ? '#fd3a00' : '#000' }"
      >
        逛逛
      </div>
    </div>

    <div
      class="message"
      @click="handleIconClick('message')"
    >
      <SvgIcon
        name="message"
        size="24px"
        :color="active === 'message' ? '#fd3a00' : '#000'"
      />
      <div
        class="message__text"
        :style="{ color: active === 'message' ? '#fd3a00' : '#000' }"
      >
        消息
      </div>
    </div>

    <div
      class="cart"
      @click="handleIconClick('cart')"
    >
      <SvgIcon
        name="cart"
        size="24px"
        :color="active === 'cart' ? '#fd3a00' : '#000'"
      />
      <div
        class="cart__text"
        :style="{ color: active === 'cart' ? '#fd3a00' : '#000' }"
      >
        购物车
      </div>
    </div>

    <div
      class="me"
      @click="handleIconClick('me')"
    >
      <SvgIcon
        name="me"
        size="24px"
        :color="active === 'me' ? '#fd3a00' : '#000'"
      />
      <div
        class="me__text"
        :style="{ color: active === 'me' ? '#fd3a00' : '#000' }"
      >
        我的淘宝
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5px 18px 4px;
  border-top: 1px solid #afafaf;
}

.home,
.video,
.message,
.cart,
.me {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 3px;

  &__text {
    font-size: 20px;
    zoom: 0.5;
  }
}
</style>
