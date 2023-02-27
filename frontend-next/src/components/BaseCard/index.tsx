import React from "react";
import { Card, Center } from "@chakra-ui/react";
import { CARD_STYLES } from "../../assets/cards";

interface BaseCardProps {
  idx: number;
  children: React.ReactNode;
  paddingTop?: string;
}

export default React.memo(function BaseCard<T>(props: T & BaseCardProps) {
  const { idx, paddingTop, children } = props;
  return (
    <Card
      minW="360px"
      bgColor={CARD_STYLES[idx % CARD_STYLES.length].backgroundColor}
      bgImg={CARD_STYLES[idx % CARD_STYLES.length].header}
      bgSize="100%"
      backgroundPosition="top center"
      backgroundRepeat="no-repeat"
      paddingTop={paddingTop}
      overflow="auto" // required for ensuring cards don't clip over onto the next column
      marginBottom="1rem"
    >
      {children}
    </Card>
  );
});
