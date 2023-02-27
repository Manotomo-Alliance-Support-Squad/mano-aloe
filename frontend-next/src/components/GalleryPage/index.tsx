import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  ButtonGroup,
  Center,
  SimpleGrid,
  Skeleton,
  Icon,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import GalleryCard from "./GalleryCard";
import { config } from "../../config";
import { useGetRequest } from "../../services/ApiService";
import { FaGamepad, FaHome } from "react-icons/fa";
import { rspc } from "../../rspc";

export interface GalleryCard {
  artworkID: number;
  artistLink: string;
  artworkLink: string;
  title: string;
  username: string;
}

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
            <NavLink to="/game">
              <Button>
                <Icon as={FaGamepad} />
                <Text padding="1rem">Games</Text>
              </Button>
            </NavLink>
          </ButtonGroup>
        </Center>
      </SimpleGrid>
    </Box>
  );
};

interface GalleryResponse {
  gallery: Array<GalleryCard>;
}

export default function GalleryPage() {
  const {data, isLoading, error} = rspc.useQuery(['gallery.gallery'])
  
  const gallery = data?.gallery;

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

  if (error !== null || !gallery) {
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
      <Wrap spacing="1rem" padding="1rem" justify="center">
        {gallery.map((art) => (
          <GalleryCard key={art.id} 
            id={art.id}
            artistLink={art.artist_link}
            artworkLink={art.art_link}
            title={art.title}
            username={art.username}
          />
        ))}
      </Wrap>
    </>
  );
}
