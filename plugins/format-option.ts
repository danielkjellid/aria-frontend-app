/* eslint-disable arrow-body-style */
import { ProductOption } from '~~/components/Form/ProductOption/types'
import useProductAttributesStore from '~~/store/product-attributes'

export default defineNuxtPlugin(() => {
  const attributesStore = useProductAttributesStore()

  return {
    provide: {
      formatOptionName: (option: ProductOption) => {
        const variant = attributesStore.getVariantInternal(option.variantId)

        let compressedSize
        const sizeCircumference = option.size.circumference
        const sizeWidth = option.size.width
        const sizeHeight = option.size.height
        const sizeDepth = option.size.depth

        if (sizeDepth && sizeWidth && sizeHeight && !sizeCircumference) {
          compressedSize = `B${sizeWidth} x H${sizeHeight} x D${sizeDepth}`
        } else if (sizeCircumference && !sizeWidth && !sizeDepth && !sizeHeight) {
          compressedSize = `Ø${sizeCircumference}`
        } else {
          compressedSize = `B${sizeWidth} x H${sizeHeight}`
        }

        if (variant && !compressedSize) {
          return `${variant.name}`
        }

        if (!variant && compressedSize) {
          return `${compressedSize}`
        }

        return `${variant.name} - ${compressedSize}`
      },
    },
  }
})
