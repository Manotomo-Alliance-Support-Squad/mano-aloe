import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    borderColor: 'brand.purple.400',
    bg: 'brand.purple.800', // change the backgroundColor of the container
    color: "brand.text",
  },
})

export default {
  baseStyle
};
