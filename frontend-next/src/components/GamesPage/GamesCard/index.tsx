import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Image,
  Heading,
  Link,
  Skeleton,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import ManotomoHeart from "../../../assets/sprites/manotomo_heart.png";
import ManotomoBlob from "../../../assets/sprites/manotomo_blob.png";

const IMG_HEIGHT = 360;

export interface GamesCardProps {
  id: string;
  title: string;
  description: string;
  gameLink: string;
  gitLink: string | null;
}

export default function GamesCard(props: GamesCardProps) {
  const { title, description, gameLink, gitLink } = props;
  return (
    <>
      <Card
        height={{ md: IMG_HEIGHT + 36, base: "100%" }}
        direction={{ base: "column", md: "row" }}
        overflow="hidden"
        backgroundColor="brand.pink.600"
      >
        <CardBody>
          <Image
            rounded="1rem"
            boxSize={IMG_HEIGHT}
            objectFit="cover"
            src={undefined}
            fallback={<Skeleton height={IMG_HEIGHT} />}
          />
        </CardBody>
        <Stack maxWidth={{ base: "100%", md: "50%" }}>
          <CardBody maxHeight="75%">
            <Heading>
              <Link href={gameLink}>
                {title}
                <ExternalLinkIcon paddingLeft="1rem" />
              </Link>
            </Heading>
            <Text paddingTop="1rem">{description}</Text>
          </CardBody>
          <CardFooter paddingTop={0}>
            <Flex width="100%">
              <Image src={ManotomoHeart} height="100px" />
              <Spacer />
              <Image src={ManotomoBlob} height="75px" marginTop="25px" />
            </Flex>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}
