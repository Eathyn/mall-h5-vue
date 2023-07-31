import { computed, reactive, Ref, ref } from 'vue'
import { useFocus } from '@vueuse/core'

interface Params {
  isAgreeClause: Ref<boolean>
  showOverlay: Ref<boolean>
}

interface LoginInputs {
  account: string
  password: string
}

export default function useLoginForm(params: Params){
  const state = reactive<LoginInputs>({
    account: '',
    password: '',
  })

  const accountInputRef = ref<HTMLInputElement | null>(null)
  const passwordInputRef = ref<HTMLInputElement | null>(null)
  const { focused: isAccountInputFocused } = useFocus(accountInputRef)
  const { focused: isPasswordInputFocused } = useFocus(passwordInputRef)
  const passwordToggleIcon = ref<'eye-close' | 'eye'>('eye-close')
  const showAccountCleanIcon = computed(() => state.account !== '' && isAccountInputFocused.value)
  const showPasswordCleanIcon = computed(() => state.password !== '' && isPasswordInputFocused.value)
  const opacity = computed<number>(() => state.account === '' || state.password === '' ? 0.3 : 1)
  const passwordInputType = computed<'password' | 'text'>(() => passwordToggleIcon.value === 'eye-close' ? 'password' : 'text')

  function cleanLoginInput(type: keyof LoginInputs) {
    state[type] = ''
  }

  function togglePasswordIcon() {
    passwordToggleIcon.value = passwordToggleIcon.value === 'eye-close' ? 'eye' : 'eye-close'
  }

  function submit() {
    if (state.account === '') {
      return
    }
    if (state.password === '') {
      return
    }
    if (!params.isAgreeClause.value) {
      params.showOverlay.value = true
      return
    }
  }

  return {
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
    submit,
  }
}
