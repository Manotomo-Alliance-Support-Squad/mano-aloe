import { extendTheme } from "@chakra-ui/react";
import { cssVar } from "@chakra-ui/styled-system";
import DiamondTile from "./assets/tiles/diamonds.svg";

const colors = {
  text: "#ffffff",
  purple: {
    50: "#eee7f0",
    100: "#d6c2dc",
    200: "#bc9cc5",
    300: "#a178ad",
    400: "#8e5f9b",
    500: "#7d4b8a",
    600: "#724683", // Card 1 Primary
    700: "#633f78",
    800: "#55396d",
    900: "#3e2e55",
  },
  pink: {
    50: "#fde9f7",
    100: "#fcc8ed",
    200: "#fd418d", // Card 2 Primary
    300: "#ff7fd2",
    400: "#ff63c2",
    500: "#ff4cb2",
    600: "#fa48ab",
    700: "#e145a1",
    800: "#c9429a",
    900: "#9f3c8b",
  },
  purple2: {
    50: "#f0e7f1",
    100: "#dac4de",
    200: "#c39ec9",
    300: "#ab7ab2",
    400: "#9a61a1",
    500: "#894d91",
    600: "#7d478a",
    700: "#6e4080", // Card 3 Primary
    800: "#603a75",
    900: "#47305f",
  },
};

export const theme = extendTheme({
  colors: {
    ...colors,
  },
  components: {
    Skeleton: {
      baseStyle: {
        [cssVar("skeleton-start-color").variable]: "colors.pink.100",
        [cssVar("skeleton-end-color").variable]: "colors.purple.50",
      },
    },
    Button: {
      defaultProps: {
        colorScheme: "purple",
      },
    },
    Heading: {
      baseStyle: {
        color: "text",
      },
    },
    Text: {
      baseStyle: {
        color: "text",
      },
    },
  },
  styles: {
    global: {
      body: {
        color: "text",
        backgroundColor: "#ffa4e0",
        backgroundImage: DiamondTile,
      },
    },
  },
});
