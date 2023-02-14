import { ApiError } from '~~/@types/'
import { Ref } from 'vue'
import checkObjectEquality from '~~/utils/checkObjectEquality'
import { useBuildMultipartForm } from './useBuildMultipartForm'

interface FormState {
  loadingState: 'initial' | 'loading' | 'error' | 'success'
}

const useFormState = (formData: Ref<any> | Ref<any[]>, formDataDefaultValues: any | any[]) => {
  const isArray = Array.isArray(formData)

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
      (isArray
        ? JSON.stringify(formData.value) === JSON.stringify(formDataDefaultValues)
        : !checkObjectEquality(formData.value, formDataDefaultValues))
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

  const formKey = ref<string>(Date.now().toString())

  const resetForm = () => {
    // eslint-disable-next-line no-param-reassign
    formData.value = isArray ? [...formDataDefaultValues] : { ...formDataDefaultValues }
    setTimeout(() => {
      formKey.value = Date.now().toString()
    }, 100)
  }

  /*******************************
   ** Build multipart form util **
   *******************************/

  const buildMultipartForm = () => useBuildMultipartForm(formData.value)

  return {
    submissionState,
    setSubmissionState,
    canBeSubmitted,
    formError,
    setFormError,
    clearFormError,
    formKey,
    resetForm,
    buildMultipartForm,
  }
}

export default useFormState
