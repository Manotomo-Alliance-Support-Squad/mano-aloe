import { cssVar } from "@chakra-ui/styled-system";

export default {
  baseStyle: {
    [cssVar("skeleton-start-color").variable]: "brand.pink.100",
    [cssVar("skeleton-end-color").variable]: "brand.purple.50",
  },
};
