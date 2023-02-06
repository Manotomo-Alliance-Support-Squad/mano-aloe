import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Switch,
  Text,
} from "@chakra-ui/react";
import BaseCard from "../../BaseCard";
import { LANGUAGE } from "../../../contexts/LanguageContext";
import { CARD_STYLES } from "../../../assets/cards";
import { Message } from "../index";

interface MessageCardProps {
  idx: number;
  message: Message;
  globalLanguage: LANGUAGE;
}

export default function MessageCard(props: MessageCardProps) {
  const { message, idx, globalLanguage } = props;
  const [showTL, setShowTL] = useState(false);

  useEffect(() => {
    // this sucks.
    setShowTL(globalLanguage === LANGUAGE.JP);
  }, [globalLanguage, setShowTL]);

  return (
    <BaseCard idx={idx} paddingTop="15%">
      <Box h="15%"/>
      <CardBody bgColor="#fff4" margin="1rem" rounded="10px">
        <Box width={0} float="left">
          <Text
            width="300px"
            visibility={!showTL ? "visible" : "hidden"}
          >
            {message.orig_msg}
          </Text>
        </Box>
        <Box width={0} float="left">
          <Text
            width="300px"
            visibility={showTL ? "visible" : "hidden"}
          >
            {message.tl_msg}
          </Text>
        </Box>
      </CardBody>
      <CardFooter paddingTop="0">
        <Text color="text">GLB</Text>
        <Switch
          isDisabled={message.tl_msg === "" && message.tl_msg === undefined}
          colorScheme="whiteAlpha"
          isChecked={showTL}
          onChange={(e) => setShowTL(e.target.checked)}
        />
        <Text>JP</Text>
        <Flex flexDirection="row-reverse" w="100%">
          <Text>{message.username}</Text>
        </Flex>
      </CardFooter>
    </BaseCard>
  );
}
