import { useLayoutEffect, useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SimpleGrid,
  Text,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import { FaGamepad, FaImages } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { rspc } from "../../rspc";
import { useLanguage } from "../../contexts/LanguageContext";
import { useGetRequest } from "../../services/ApiService";
import { config } from "../../config";
import MessageCard from "./MessageCard";
import Header from "../Header";
import BaseCard from "../BaseCard";

import HeaderBackground from "../../assets/background/header_background.png";
import HeaderBackgroundBirthday from "../../assets/background/header_background_birthday.png";
import ManotomoCake from "../../assets/sprites/manotomo_cake.png";

const CARD_WIDTH = 360;
const CARD_PADDING = 16;

const CommunityMessageCard = () => (
  <Box maxW="600px">
    <BaseCard idx={1} paddingTop="15%">
      <CardHeader>
        <Heading>A Community Message for Aloe</Heading>
      </CardHeader>
      <CardBody>
        <Text fontSize="xl" paddingBottom="1rem">
          Dear Aloe, thank you for everything. While it may have been but for a
          short while, we appreciate every little thing you've given us. We wish
          you the best of luck going forward.
        </Text>
        <Text fontSize="xl">
          親愛なるアロエ様。短い間ではありましたが、一緒に過ごした時間に心より感謝しております。本当にありがとうございました。アロエ様のご健勝とご多幸をお祈り申し上げます。
        </Text>
      </CardBody>
    </BaseCard>
  </Box>
);

const FeaturedSection = () => {
  const today = new Date();
  const isBirthday = today.getDate() === 28 && today.getMonth() === 9;
  return (
    <>
      {isBirthday ? (
        <Image src={HeaderBackgroundBirthday} />
      ) : (
        <Box
          padding="2rem"
          bgImg={HeaderBackground}
          style={{
            backgroundSize: "auto 100%",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <CommunityMessageCard />
        </Box>
      )}
      <Box width="100%" height="2rem" bgColor="brand.purple.500" />
      <Box padding="1rem" paddingBottom="0">
        <SimpleGrid
          minChildWidth={CARD_WIDTH}
          width="100%"
          gridGap="1rem"
          alignItems="center"
        >
          <Center>
            <ButtonGroup spacing={16}>
              <NavLink to="/game">
                <Button>
                  <Icon as={FaGamepad} />
                  <Text padding="1rem">Games</Text>
                </Button>
              </NavLink>
              <NavLink to="/art">
                <Button>
                  <Icon as={FaImages} />
                  <Text padding="1rem">Gallery</Text>
                </Button>
              </NavLink>
            </ButtonGroup>
          </Center>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default function Home() {
  const { data, isLoading, error } = rspc.useQuery(['messages.messages']);
  const { language } = useLanguage();
  const messages = data?.messages;
  const ref = useRef<null | HTMLDivElement>(null);

  const [columnCount, setColumnCount] = useState(1);
  const innerWidth =
    columnCount * CARD_WIDTH + CARD_PADDING + columnCount * CARD_PADDING;

  useLayoutEffect(() => {
    const handleResize = () => {
      if (ref.current !== null) {
        const { width } = ref.current.getBoundingClientRect();
        if (width >= 5 * CARD_WIDTH + 6 * CARD_PADDING) {
          setColumnCount(5);
        } else if (width >= 4 * CARD_WIDTH + 5 * CARD_PADDING) {
          setColumnCount(4);
        } else if (width >= 3 * CARD_WIDTH + 4 * CARD_PADDING) {
          setColumnCount(3);
        } else if (width >= 2 * CARD_WIDTH + 3 * CARD_PADDING) {
          setColumnCount(2);
        } else {
          setColumnCount(1);
        }
      } else {
        // fallback to window width
        const width = window.innerWidth;
        if (width >= 5 * CARD_WIDTH + 6 * CARD_PADDING) {
          setColumnCount(5);
        } else if (width >= 4 * CARD_WIDTH + 5 * CARD_PADDING) {
          setColumnCount(4);
        } else if (width >= 3 * CARD_WIDTH + 4 * CARD_PADDING) {
          setColumnCount(3);
        } else if (width >= 2 * CARD_WIDTH + 3 * CARD_PADDING) {
          setColumnCount(2);
        } else {
          setColumnCount(1);
        }
      }
    };
    // first render needs to check if we can fit more columns
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [ref.current]);

  if (isLoading && !messages) {
    return (
      <>
        <FeaturedSection />
        <Box padding="1rem">
          <Skeleton height="500px" rounded="1rem" />
        </Box>
      </>
    );
  }

  if (error !== null|| !messages) {
    return (
      <Alert status="error" variant="solid">
        <AlertIcon />
        <AlertTitle>An error occurred while fetching resources</AlertTitle>
        <AlertDescription>Please try reloading the page</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <FeaturedSection />
      <Flex width="100%" ref={ref} justifyContent="center">
        <Box
          padding="1rem"
          width={innerWidth}
          columnGap="1rem"
          sx={{ columnCount: columnCount, columnWidth: CARD_WIDTH }}
        >
          {messages.map((message, idx) => (
            <MessageCard
              key={message.id}
              idx={idx}
              message={message}
              globalLanguage={language}
            />
          ))}
        </Box>
      </Flex>
      <Box padding="1rem" paddingTop="0">
        <Center>
          <ButtonGroup>
            <LinkBox>
              <LinkOverlay href="https://manoaloe.jetri.co/">
                <Button>
                  View More at DragonJet's Site
                  <ExternalLinkIcon />
                </Button>
              </LinkOverlay>
            </LinkBox>
          </ButtonGroup>
        </Center>
      </Box>
    </>
  );
}
