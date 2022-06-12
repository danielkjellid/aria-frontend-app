const replaceWithDefaults = (defaultObjStructure: Object, instance: any) => {
  if (instance) {
    // If the passed instance is an array, we need to loop through all elements
    // and replace the appropriate values.
    if (Array.isArray(instance)) {
      const modifiedInstances = []

      instance.forEach((element) => {
        const defaultObj = { ...defaultObjStructure }

        Object.keys(defaultObjStructure).forEach((key) => {
          if (element[key]) {
            defaultObj[key] = element[key]
          }
        })

        modifiedInstances.push(defaultObj)
      })

      return modifiedInstances
    }

    // If the instance is a single element, modify it and return it.
    const defaultObj = { ...defaultObjStructure }

    Object.keys(defaultObjStructure).forEach((key) => {
      if (instance[key]) {
        defaultObj[key] = instance[key]
      }
    })

    return defaultObj
  }

  return defaultObjStructure
}

export default replaceWithDefaults
