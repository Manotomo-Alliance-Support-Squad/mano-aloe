import React, { useState } from "react";
import { Box, CardFooter, Flex, SlideFade, Text } from "@chakra-ui/react";
import { InView } from "react-intersection-observer";
import BaseCard from "../../BaseCard";
import { LANGUAGE } from "../../../contexts/LanguageContext";

const SlideInOnVisible = React.memo(
  ({ children }: { children: JSX.Element }) => {
    const [loaded, setLoaded] = useState(false);
    return (
      <InView as="div" delay={100} onChange={(inView) => setLoaded(inView)} triggerOnce>
        <SlideFade in={loaded} offsetY="200px">
          {children}
        </SlideFade>
      </InView>
    );
  }
);

const MessageFooter = React.memo(({ username }: { username: string }) => {
  return (
    <CardFooter paddingTop="0">
      <Flex flexDirection="row-reverse" w="100%">
        <Text>{username}</Text>
      </Flex>
    </CardFooter>
  );
});

const Padding = React.memo(() => <Box h="15%" />);

const CustomCardBody = React.memo(({ children }: { children: JSX.Element }) => (
  <div
    style={{
      backgroundColor: "#fff4",
      margin: "1rem",
      padding: "1rem",
      borderRadius: "10px",
    }}
  >
    {children}
  </div>
));

export interface Message {
  id: string;
  orig_msg: string;
  tl_msg: string | null;
  username: string;
  country: string | null;
}

interface MessageCardProps {
  idx: number;
  message: Message;
  globalLanguage: LANGUAGE;
}

export default function MessageCard(props: MessageCardProps) {
  const { message, idx, globalLanguage } = props;

  const showTL = globalLanguage === LANGUAGE.JP;

  return (
    <SlideInOnVisible>
      <BaseCard idx={idx} paddingTop="15%">
        <Padding />
        <CustomCardBody>
          <div style={{ display: "flex" }}>
            <div
              style={{
                float: "left",
                width: 0,
                height: "100%",
                opacity: !showTL ? 1 : 0,
                zIndex: !showTL ? 1 : 0,
                userSelect: !showTL ? "auto" : "none",
                transition: "opacity 0.4s ease",
              }}
            >
              <p style={{ width: "300px", color: "#fff" }}>
                {message.orig_msg}
              </p>
            </div>
            <div
              style={{
                float: "left",
                width: 0,
                height: "100%",
                opacity: showTL ? 1 : 0,
                zIndex: showTL ? 1 : 0,
                userSelect: showTL ? "auto" : "none",
                transition: "opacity 0.4s ease",
              }}
            >
              <p style={{ width: "300px", color: "#fff" }}>{message.tl_msg}</p>
            </div>
          </div>
        </CustomCardBody>
        <MessageFooter username={message.username} />
      </BaseCard>
    </SlideInOnVisible>
  );
}
