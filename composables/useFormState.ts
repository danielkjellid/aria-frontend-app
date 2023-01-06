import { ApiError } from '~~/@types/'
import { Ref } from 'vue'
import checkObjectEquality from '~~/utils/checkObjectEquality'
import humps from 'humps'

interface FormState {
  loadingState: 'initial' | 'loading' | 'error' | 'success'
}

const useFormState = (formData: Ref<any> | Ref<any[]>, formDataDefaultValues: any | any[]) => {
  const isArray = Array.isArray(formData.value)

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

  const buildMultipartFormFromObject = (fd: FormData, data: any) => {
    // When appending to form data, it converts available types to string,
    // even undefined or null. Therefore we need to explicitly check if
    // the field has any value before appending it to make error flow good.
    Object.entries(data).forEach(([key, value]) => {
      // Multipart form data does not run through the parser in the backend,
      // so we need to decamelize values here.
      const decamelizedKey = humps.decamelize(key)

      if (value !== undefined && value !== null && value !== '') {
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
  }

  const buildMultipartFormFromArray = (fd: FormData, data: any[]) => {
    data.forEach((d) => buildMultipartFormFromObject(fd, d))
  }

  const buildMultipartForm = () => {
    const fd = new FormData()

    if (isArray) {
      buildMultipartFormFromArray(fd, formData.value)
    } else {
      buildMultipartFormFromObject(fd, formData.value)
    }

    console.log('f', ...fd)

    return fd
  }

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
