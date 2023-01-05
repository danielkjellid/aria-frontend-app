import { ApiError } from '~~/@types/'
import { Ref } from 'vue'
import checkObjectEquality from '~~/utils/checkObjectEquality'
import humps from 'humps'

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
      // Multipart form data does not run through the parser in the backend,
      // so we need to decamelize values here.
      const decamelizedKey = humps.decamelize(key)

      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((val) => {
            if (val instanceof File) {
              fd.append(`${decamelizedKey}[]`, val)
            } else {
              fd.append(decamelizedKey, JSON.stringify(val))
            }
          })
        } else if (value instanceof File) {
          fd.append(decamelizedKey, value)
        } else if (typeof value === 'boolean') {
          fd.append(decamelizedKey, JSON.stringify(value))
        } else {
          fd.append(decamelizedKey, value.toString())
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
