import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import { useGetRequest } from "../../services/ApiService";
import { config } from "../../config";
import MessageCard from "./MessageCard";
import Header from "../Header";
import BaseCard from "../BaseCard";

export interface Message {
  messageID: number;
  orig_msg: string;
  tl_msg: string;
  username: string;
  country: string;
}

interface MessageResponse {
  messages: Array<Message>;
}

const CARD_WIDTH = "360px";

export default function Home() {
  const { data, fetching, error } = useGetRequest<MessageResponse>({
    url: `${config.backendurl}/api/messages`,
  });
  const { language } = useLanguage();
  const messages = data?.messages;

  if (fetching) {
    return (
      <Box padding="1rem">
        <Skeleton height="500px" rounded="1rem" />
      </Box>
    );
  }

  if (error === undefined) {
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
      <Box padding="1rem" paddingBottom="0">
        <SimpleGrid
          minChildWidth={CARD_WIDTH}
          width="100%"
          gridGap="1rem"
          alignItems="center"
        >
          <Center>
            <Box width={CARD_WIDTH}>
              <BaseCard idx={0} paddingTop="40px">
                <Box width="300px">
                  <CardHeader>
                    <Heading bgColor="#fff4" rounded="1rem">
                      Games
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>Play games made by fans!</Text>
                    <NavLink to="/game">
                      <Button>To Games</Button>
                    </NavLink>
                  </CardBody>
                </Box>
              </BaseCard>
            </Box>
          </Center>
          <Center>
            <Box width={CARD_WIDTH}>
              <BaseCard idx={1} paddingTop="40px">
                <Box width="300px">
                  <CardHeader>
                    <Heading bgColor="#fff4" rounded="1rem">
                      Gallery
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>View Fanart!</Text>
                    <NavLink to="/art">
                      <Button>To Artwork</Button>
                    </NavLink>
                  </CardBody>
                </Box>
              </BaseCard>
            </Box>
          </Center>
        </SimpleGrid>
      </Box>
      <Box padding="1rem" columnGap="1rem" sx={{ columnWidth: CARD_WIDTH }}>
        {messages?.map((message, idx) => (
          <MessageCard
            key={message.messageID}
            idx={idx}
            message={message}
            globalLanguage={language}
          />
        ))}
      </Box>
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
