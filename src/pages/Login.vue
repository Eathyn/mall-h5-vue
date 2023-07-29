<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useFocus } from '@vueuse/core'

interface LoginInputs {
  account: string
  password: string
}

const state = reactive<LoginInputs>({
  account: '',
  password: '',
})
const accountInputRef = ref<HTMLInputElement | null>(null)
const passwordInputRef = ref<HTMLInputElement | null>(null)
const { focused: isAccountInputFocused } = useFocus(accountInputRef)
const { focused: isPasswordInputFocused } = useFocus(passwordInputRef)
const passwordToggleIcon = ref<'eye-close' | 'eye'>('eye-close')
const isAgreeClause = ref<boolean>(false)
const agreeIconSize = ref<string>('16px')
const showOverlay = ref<boolean>(false)

const showAccountCleanIcon = computed(() => state.account !== '' && isAccountInputFocused.value)
const showPasswordCleanIcon = computed(() => state.password !== '' && isPasswordInputFocused.value)
const opacity = computed<number>(() => state.account === '' || state.password === '' ? 0.3 : 1)
const agreeIconName = computed<'round' | 'round_check_fill'>(() => isAgreeClause.value ? 'round_check_fill' : 'round')
const passwordInputType = computed<'password' | 'text'>(() => passwordToggleIcon.value === 'eye-close' ? 'password' : 'text')

function cleanLoginInput(type: keyof LoginInputs) {
  state[type] = ''
}

function togglePasswordIcon() {
  passwordToggleIcon.value = passwordToggleIcon.value === 'eye-close' ? 'eye' : 'eye-close'
}

function toggleAgreeIcon() {
  isAgreeClause.value = !isAgreeClause.value
}

function submit() {
  if (state.account === '') {
    return
  }
  if (state.password === '') {
    return
  }
  if (!isAgreeClause.value) {
    showOverlay.value = true
    return
  }
}

function determineAgreement(isAgree: boolean) {
  if (isAgree) {
    isAgreeClause.value = true
    showOverlay.value = false
  } else {
    showOverlay.value = false
  }
}
</script>

<template>
  <div class="container">
    <SvgIcon class="icon" name="close" />

    <div class="title">亲，欢迎登录</div>
    <div class="tip">没有淘宝账号？<a class="register">立即注册</a></div>

    <div class="account">
      <input
        class="account-input"
        v-model="state.account"
        ref="accountInputRef"
        placeholder="请输入账户名"
        type="text"
      >
      <SvgIcon
        color="#ccc"
        name="round_close_fill"
        v-show="showAccountCleanIcon"
        @mousedown="cleanLoginInput('account')"
      />
    </div>
    <div class="line"></div>

    <div class="password">
      <input
        class="password-input"
        v-model="state.password"
        ref="passwordInputRef"
        placeholder="请输入密码"
        :type="passwordInputType"
      >
      <SvgIcon
        class="clean-password-icon"
        color="#ccc"
        name="round_close_fill"
        v-show="showPasswordCleanIcon"
        @mousedown="cleanLoginInput('password')"
      />
      <SvgIcon
        color="#ccc"
        :name="passwordToggleIcon"
        @click="togglePasswordIcon"
      />
    </div>
    <div class="line"></div>

    <button
      class="submit"
      @click="submit"
    >
      登录
    </button>

    <div class="bottom">
      <div class="option-wrapper">
        <div class="alipay">
          <SvgIcon
            class="icon-alipay"
            color="#06b4fc"
            name="alipay"
            size="24px"
          />
          <span>支付宝登录</span>
        </div>
        <div class="vertical-line"></div>
        <div class="more-options">更多选项</div>
      </div>
      <div class="agreement">
        <div class="agree-icon-wrap">
          <SvgIcon
            class="agree-icon"
            :size="agreeIconSize"
            :name="agreeIconName"
            :color="isAgreeClause ? '#fe4a00' : '#999999'"
            @click="toggleAgreeIcon"
          />
        </div>
        <label class="text" for="agree">已阅读并同意<span class="clause">《淘宝平台服务协议》</span><span class="clause">《隐私权政策》</span><span
          class="clause">《支付宝注册相关协议》</span>
          <span class="clause">《中国移动认证服务条款》</span>，未注册的手机号将自动完成账号注册</label>
      </div>
    </div>
  </div>

  <div
    class="overlay"
    v-show="showOverlay"
  >
    <div class="popup">
      <div class="title">服务协议及隐私保护</div>
      <p class="content">为了更好地保障您地合法权益，请您阅读并同意以下协议<span class="clause">《淘宝平台服务协议》</span>
        <span class="clause">《隐私权政策》</span><span class="clause">《支付宝注册相关协议》</span><span class="clause">
          《中国移动认证服务条款》</span>，未注册的手机号将自动完成账号注册</p>
      <div class="btn-wrap">
        <button
          class="button agree"
          @click="determineAgreement(false)"
        >
          不同意
        </button>
        <button
          class="button disagree"
          @click="determineAgreement(true)"
        >
          同意
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/variable.less";
@import "@/styles/mixin.less";

@container-padding: 26px;

.container {
  padding: 12px @container-padding 30px;

  .icon {
    position: absolute;
    left: 20px;
  }

  .title {
    font-size: 28px;
    margin: 75px 0 13px;
    letter-spacing: 2px;
  }

  .tip {
    color: @Dark-Gray;
    letter-spacing: 1px;
    margin-bottom: 65px;
    font-size: 16px;
    .register {
      color: @Coquelicot;
    }
  }

  .account {
    display: flex;
    align-items: flex-start;
    position: relative;
    .account-input {
      .login-input()
    }
    .account-input::placeholder {
      color: @Chinese-Silver;
    }
  }

  .password {
    display: flex;
    align-items: flex-start;
    .password-input {
      .login-input();
    }
    .password-input::placeholder {
      color: @Chinese-Silver;
    }
    .clean-password-icon {
      margin-right: 10px;
    }
  }

  .line {
    width: 100%;
    border-top: 1px solid @American-Silver;
    margin-bottom: 15px;
  }

  .submit {
    width: 100%;
    color: #fff;
    background: linear-gradient(to right, @American-orange, @International-Orange_Aerospace);
    border: none;
    font-size: 16px;
    padding: 12px 0;
    border-radius: 20px;
    letter-spacing: 2px;
    opacity: v-bind(opacity);
    margin: 35px 0 147px;
  }

  .bottom {
    .option-wrapper {
      .center();
      margin: 0 auto 10px;
      font-size: 12px;
      letter-spacing: 1px;
      color: @Dark-Charcoal;

      .alipay {
        display: flex;
        align-items: center;
        padding-right: 12px;

        .icon-alipay {
          margin-right: 3px;
        }
      }

      .vertical-line {
        border-left: (3px / 2) solid @Light-Gray;
        height: 15px;
      }

      .more-options {
        margin-left: 10px;
      }
    }

    .agreement {
      color: @Spanish-gray;
      display: flex;
      align-items: flex-start;
      column-gap: 5px;

      .agree-icon-wrap {
        width: v-bind(agreeIconSize);
      }

      .text {
        font-size: 24px;
        zoom: 0.5;
        letter-spacing: 2px;
        line-height: 1.6;

        .clause {
          color: @Dark-Charcoal;
        }
      }
    }
  }
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  .center();

  .popup {
    position: fixed;
    width: 80%;
    background: #fff;
    border-radius: 25px;

    .title {
      text-align: center;
      font-size: 20px;
      letter-spacing: 1px;
      font-weight: bold;
      margin: 20px 0;
      color: @Dark-Charcoal;
    }

    .content {
      color: @Quick-Silver;
      font-size: 22px;
      zoom: 0.5;
      letter-spacing: 2px;
      margin: 20px 25px 25px;
      line-height: 1.7;

      .clause {
        color: @Dark-Charcoal;
      }
    }

    .btn-wrap {
      .center();
      column-gap: 7%;
      margin-bottom: 15px;

      .button {
        width: 35%;
        border: none;
        border-radius: 60px;
        font-size: 18px;
        padding: 7px 0;
      }

      .agree {
        border: 1px solid @Medium-Vermilion;
        color: @Medium-Vermilion;
        background: #ffffff;
      }

      .disagree {
        border: 1px solid @Giants-Orange;
        color: #ffffff;
        background: @Giants-Orange;
      }
    }
  }
}
</style>
