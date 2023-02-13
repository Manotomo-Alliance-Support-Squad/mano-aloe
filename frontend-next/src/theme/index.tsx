import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import brand from "./colors";
import styles from "./styles";

import Skeleton from "./components/Skeleton";
import Button from "./components/Button";
import Heading from "./components/Heading";
import Text from "./components/Text";
import Icon from "./components/Icon";

export const theme = extendTheme(
  {
    colors: {
      brand,
    },
    styles,
    components: {
      Skeleton,
      Button,
      Heading,
      Text,
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);
