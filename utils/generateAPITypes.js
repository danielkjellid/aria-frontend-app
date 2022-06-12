/* eslint-disable */
const OpenAPI = require('openapi-typescript-codegen')
const humps = require('humps')
const yargs = require('yargs')
const fs = require('fs')
const path = require('path')
// const { exit, stderr } = require('process')

const outputArgument = yargs.option('output', {
  alias: 'out',
  description: 'Path where the generated files will be added.',
  type: 'string',
}).argv.output

// Set default output path to @types/generated/dist unless output is specified.
const outputPath = outputArgument || '@types/generated/dist'

const convertSchema = (schemas) => {
  return Object.fromEntries(
    Object.entries(schemas).map(([k, schema]) => {
      const properties = schema.properties
      if (!properties) return [k, schema]

      const camelizedProperties = Object.fromEntries(
        Object.entries(properties).map(([propertyName, value]) => {
          const camelizedProperty = humps.camelize(propertyName)

          // There is currently a problem with the naming of image files, once this is fixed, the
          // code bellow can be uncommented.
          // if (humps.decamelize(camelizedProperty) !== propertyName) {
          //   stderr.write(
          //     `property !== decamelize(camelize(property)). Aborting because this risks converting keys wrongly in runtime. ${propertyName} !== ${humps.decamelize(
          //       camelizedProperty
          //     )}\n`
          //   )
          //   exit(1)
          // }
          return [camelizedProperty, value]
        })
      )

      const camelizedRequired = schema.required && schema.required.map((key) => humps.camelize(key))

      return [
        k,
        {
          ...schema,
          required: camelizedRequired,
          properties: camelizedProperties,
        },
      ]
    })
  )
}

const convertSpec = (spec) => {
  // Only need to convert the .components.schemas part of the spec as this is
  // the only modules we care about for now, can be changed later.
  return {
    ...spec,
    components: {
      ...spec.components,
      schemas: convertSchema(spec.components.schemas),
    },
  }
}

const generateTypesFromSchema = () => {
  fs.readFile(path.join(__dirname, '../@types/schema.json'), (err, file) => {
    OpenAPI.generate({
      input: convertSpec(JSON.parse(file)),
      output: outputPath,
      exportCore: false,
      useOptions: true,
    })
  })
}

if (require.main === module) {
  generateTypesFromSchema()
}

module.exports = {
  generateTypesFromSchema,
}
