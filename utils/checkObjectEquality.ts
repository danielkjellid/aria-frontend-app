const isObject = (obj) =>
  obj !== null && obj !== undefined && !Array.isArray(obj) && typeof obj === 'object'

const checkObjectEquality = (obj1, obj2): boolean => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (let i = 0; i < keys1.length; i += 1) {
    const val1 = obj1[keys1[i]]
    const val2 = obj2[keys1[i]]

    const areObjects = isObject(val1) && isObject(val2)
    if ((areObjects && !checkObjectEquality(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false
    }
  }

  return true
}

export default checkObjectEquality
