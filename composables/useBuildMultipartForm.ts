import humps from 'humps'

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

const useBuildMultipartForm = (value: any | any[]) => {
  const fd = new FormData()

  if (Array.isArray(value)) {
    buildMultipartFormFromArray(fd, value)
  } else {
    buildMultipartFormFromObject(fd, value)
  }

  console.log('f', ...fd)

  return fd
}

// eslint-disable-next-line import/prefer-default-export
export { useBuildMultipartForm }
