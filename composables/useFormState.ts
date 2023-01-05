import { ApiError } from '~~/@types/'
import { Ref } from 'vue'
import checkObjectEquality from '~~/utils/checkObjectEquality'

interface FormState {
  loadingState: 'initial' | 'loading' | 'error' | 'success'
}

const useFormState = (formData: Ref<any>, formDataDefaultValues: any) => {
  /**********************
   ** Submission state **
   **********************/

  const submissionState = ref<FormState['loadingState']>('initial')
  const setSubmissionState = (state: FormState['loadingState']) => {
    submissionState.value = state
  }
  const canBeSubmitted = computed(
    () =>
      submissionState.value !== 'loading' &&
      !checkObjectEquality(formData.value, formDataDefaultValues)
  )

  /*****************
   ** Error state **
   *****************/

  const formError = ref<ApiError | null>(null)
  const setFormError = (e: ApiError) => {
    formError.value = e
  }
  const clearFormError = () => {
    if (formError.value) {
      formError.value = null
      submissionState.value = 'initial'
    }
  }

  /*********************
   ** Reset form util **
   *********************/

  const resetForm = () => {
    // eslint-disable-next-line no-param-reassign
    formData.value = { ...formDataDefaultValues }
  }

  /*******************************
   ** Build multipart form util **
   *******************************/

  const buildMultipartForm = () => {
    const fd = new FormData()

    // When appending to form data, it converts available types to string,
    // even undefined or null. Therefore we need to explicitly check if
    // the field has any value before appending it to make error flow good.
    Object.entries(formData.value).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          fd.append(key, value)
        } else if (typeof value === 'boolean') {
          fd.append(key, JSON.stringify(value))
        } else {
          fd.append(key, value.toString())
        }
      }
    })

    return fd
  }

  return {
    submissionState,
    setSubmissionState,
    canBeSubmitted,
    formError,
    setFormError,
    clearFormError,
    resetForm,
    buildMultipartForm,
  }
}

export default useFormState
