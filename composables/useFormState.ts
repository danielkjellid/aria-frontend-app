import { ApiError } from '~~/@types/'
import { Ref } from 'vue'
import checkObjectEquality from '~~/utils/checkObjectEquality'

interface FormState {
  loadingState: 'initial' | 'loading' | 'error' | 'success'
}

const useFormState = (formData: Ref<any>, formDataDefaultValues: any) => {
  // submission state
  const submissionState = ref<FormState['loadingState']>('initial')
  const setSubmissionState = (state: FormState['loadingState']) => {
    submissionState.value = state
  }
  const canBeSubmitted = computed(
    () =>
      submissionState.value !== 'loading' && !checkObjectEquality(formData, formDataDefaultValues)
  )

  // error state
  const error = ref<ApiError | null>(null)
  const setError = (e: ApiError) => {
    error.value = e
  }
  const clearError = () => {
    if (error.value) {
      error.value = null
      submissionState.value = 'initial'
    }
  }

  // reset form util
  const resetForm = () => {
    // eslint-disable-next-line no-param-reassign
    formData.value = { ...formDataDefaultValues }
  }

  // buildMultipartForm
  const buildMultipartForm = () => {
    const fd = new FormData()

    // When appending to form data, it converts available types to string,
    // even undefined or null. Therefore we need to explicitly check if
    // the field has any value before appending it to make error flow good.
    Object.entries(formData.value).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          fd.append(key, value)
        } else {
          fd.append(key, JSON.stringify(value))
        }
      }
    })

    return fd
  }

  return {
    submissionState,
    setSubmissionState,
    canBeSubmitted,
    error,
    setError,
    clearError,
    resetForm,
    buildMultipartForm,
  }
}

export default useFormState
