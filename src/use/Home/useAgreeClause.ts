import { computed, Ref, ref } from 'vue'

interface Params {
  showOverlay: Ref<boolean>
}

export default function useAgreeClause(params: Params) {
  const isAgreeClause = ref<boolean>(false)
  const agreeIconName = computed<'round' | 'round_check_fill'>(() => isAgreeClause.value ? 'round_check_fill' : 'round')
  const agreeIconSize = ref<string>('16px')

  function toggleAgreeIcon() {
    isAgreeClause.value = !isAgreeClause.value
  }

  function determineAgreement(isAgree: boolean) {
    if (isAgree) {
      isAgreeClause.value = true
      params.showOverlay.value = false
    } else {
      params.showOverlay.value = false
    }
  }

  return {
    isAgreeClause,
    agreeIconName,
    agreeIconSize,
    toggleAgreeIcon,
    determineAgreement,
  }
}
