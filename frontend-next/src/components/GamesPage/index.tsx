import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  ButtonGroup,
  Center,
  Icon,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import GameCard from "./GamesCard";
import { FaImages, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useGetRequest } from "../../services/ApiService";
import { config } from "../../config";
import { rspc } from "../../rspc";

const NavButtons = () => {
  return (
    <Box padding="1rem" paddingBottom="0">
      <SimpleGrid
        minChildWidth="360px"
        width="100%"
        gridGap="1rem"
        alignItems="center"
      >
        <Center>
          <ButtonGroup spacing={16}>
            <NavLink to="/home">
              <Button>
                <Icon as={FaHome} />
                <Text padding="1rem">Home</Text>
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
  );
};


export default function GamesPage() {
  const { data, isLoading, error } = rspc.useQuery(['games.games']);
  const games = data?.games;
  if (isLoading) {
    return (
      <>
        <NavButtons />
        <Box padding="1rem">
          <Skeleton height="500px" rounded="1rem" />
        </Box>
      </>
    );
  }

  if (error !== null || !games) {
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
      <NavButtons />
      <VStack spacing="1rem" padding="1rem" align="stretch">
        {games.map((game) => (
          <GameCard key={game.id} 
            id={game.id}
            title={game.title}
            description={game.game_description}
            gameLink={game.game_link}
            gitLink={game.git_link}
          />
        ))}
      </VStack>
    </>
  );
}
