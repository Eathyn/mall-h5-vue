<script lang="ts" setup>
import useOverlay from '@/use/Home/useOverlay.ts'
import useAgreeClause from '@/use/Home/useAgreeClause.ts'
import useLoginForm from '@/use/Home/useLoginForm.ts'

const { showOverlay } = useOverlay()

const {
  isAgreeClause,
  agreeIconName,
  agreeIconSize,
  toggleAgreeIcon,
  determineAgreement,
} = useAgreeClause({ showOverlay })

const {
  state,
  accountInputRef,
  passwordInputRef,
  passwordToggleIcon,
  showAccountCleanIcon,
  showPasswordCleanIcon,
  opacity,
  passwordInputType,
  cleanLoginInput,
  togglePasswordIcon,
  submit
} = useLoginForm({ isAgreeClause, showOverlay })
</script>

<template>
  <div class="container">
    <SvgIcon class="icon-close" name="close" />

    <div class="greet">亲，欢迎登录</div>

    <div class="register">没有淘宝账号？<a class="register__btn">立即注册</a></div>

    <div class="account">
      <input
        class="account__input"
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

    <div class="password">
      <input
        class="password__input"
        v-model="state.password"
        ref="passwordInputRef"
        placeholder="请输入密码"
        :type="passwordInputType"
      >
      <SvgIcon
        class="password__clean-icon"
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

    <button
      class="submit-button"
      :disabled="isAgreeClause"
      @click="submit"
    >
      登录
    </button>

    <div class="login-option">
      <div class="login-option__alipay">
        <SvgIcon
          class="icon-alipay"
          color="#06b4fc"
          name="alipay"
          size="24px"
        />
        <span>支付宝登录</span>
      </div>
      <div class="vertical-line"></div>
      <div class="login-option__more">更多选项</div>
    </div>

    <div class="agreement">
      <div class="agreement__icon-wrap">
        <SvgIcon
          class="agree-icon"
          :size="agreeIconSize"
          :name="agreeIconName"
          :color="isAgreeClause ? '#fe4a00' : '#999999'"
          @click="toggleAgreeIcon"
        />
      </div>
      <p class="agreement__text" for="agree">已阅读并同意<span class="agreement__text-clause">《淘宝平台服务协议》</span>
        <span class="agreement__text-clause">《隐私权政策》</span><span class="agreement__text-clause">《支付宝注册相关协议》
        </span><span class="agreement__text-clause">《中国移动认证服务条款》</span>，未注册的手机号将自动完成账号注册</p>
    </div>
  </div>

  <div
    class="overlay"
    v-show="showOverlay"
  >
    <div class="popup">
      <div class="popup__title">服务协议及隐私保护</div>
      <p class="popup__content">为了更好地保障您地合法权益，请您阅读并同意以下协议<span class="popup__content-clause">《淘宝平台服务
        协议》</span><span class="popup__content-clause">《隐私权政策》</span><span class="popup__content-clause">《支付宝注册相关协议》
      </span><span class="popup__content-clause">《中国移动认证服务条款》</span>，未注册的手机号将自动完成账号注册</p>
      <div class="popup__button-wrap">
        <button
          class="popup__button popup__button--disagree"
          @click="determineAgreement(false)"
        >
          不同意
        </button>
        <button
          class="popup__button popup__button--agree"
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

.container {
  padding: 12px 26px 30px;
}

.icon-close {
  position: absolute;
  left: 20px;
}

.greet {
  font-size: 28px;
  margin: 75px 0 13px;
  letter-spacing: 2px;
}

.register {
  color: @Dark-Gray;
  letter-spacing: 1px;
  margin-bottom: 65px;
  font-size: 16px;
  .register__btn {
    color: @Coquelicot;
  }
}

.account {
  display: flex;
  align-items: flex-start;
  position: relative;
  border-bottom: 1px solid @American-Silver;
  margin-bottom: 15px;
  .account__input {
    .login-input()
  }
  .account__input::placeholder {
    color: @Chinese-Silver;
  }
}

.password {
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid @American-Silver;
  margin-bottom: 15px;
  .password__input {
    .login-input();
  }
  .password__input::placeholder {
    color: @Chinese-Silver;
  }
  .password__clean-icon {
    margin-right: 10px;
  }
}

.submit-button {
  display: block;
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
  -webkit-tap-highlight-color: transparent;
}

.login-option {
  .center();
  margin: 0 auto 10px;
  font-size: 12px;
  letter-spacing: 1px;
  color: @Dark-Charcoal;

  .login-option__alipay {
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

  .login-option__more {
    margin-left: 10px;
  }
}

.agreement {
  color: @Spanish-gray;
  display: flex;
  align-items: flex-start;
  column-gap: 5px;

  .agreement__icon-wrap {
    width: v-bind(agreeIconSize);
  }

  .agreement__text {
    font-size: 24px;
    zoom: 0.5;
    letter-spacing: 2px;
    line-height: 1.6;
    margin: 0;

    .agreement__text-clause {
      color: @Dark-Charcoal;
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
}

.popup {
  position: fixed;
  width: 80%;
  background: #fff;
  border-radius: 25px;

  .popup__title {
    text-align: center;
    font-size: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    margin: 20px 0;
    color: @Dark-Charcoal;
  }

  .popup__content {
    color: @Quick-Silver;
    font-size: 22px;
    zoom: 0.5;
    letter-spacing: 2px;
    margin: 20px 25px 25px;
    line-height: 1.7;

    .popup__content-clause {
      color: @Dark-Charcoal;
    }
  }

  .popup__button-wrap {
    .center();
    column-gap: 7%;
    margin-bottom: 15px;

    .popup__button {
      width: 35%;
      border: none;
      border-radius: 60px;
      font-size: 18px;
      padding: 7px 0;
    }

    .popup__button--disagree {
      border: 1px solid @Medium-Vermilion;
      color: @Medium-Vermilion;
      background: #ffffff;
    }

    .popup__button--agree {
      border: 1px solid @Giants-Orange;
      color: #ffffff;
      background: @Giants-Orange;
    }
  }
}
</style>
