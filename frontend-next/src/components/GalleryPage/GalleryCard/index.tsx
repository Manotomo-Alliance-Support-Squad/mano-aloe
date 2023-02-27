import { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Heading,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { InView } from "react-intersection-observer";

export interface GalleryCardProps {
  id: string;
  artistLink: string | null;
  artworkLink: string;
  title: string;
  username: string;
}

export default function GalleryCard(props: GalleryCardProps) {
  const { title, artworkLink, artistLink, username } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadArt, setLoadArt] = useState(false);
  return (
    <>
      <Card width="360px" backgroundColor="brand.pink.600">
        <CardBody>
          <InView onChange={(inView) => setLoadArt(inView)} triggerOnce>
            {loadArt && (
              <Image
                rounded="1rem"
                onClick={onOpen}
                boxSize="360px"
                objectFit="cover"
                src={artworkLink}
                fallback={<Skeleton height="360px" />}
              />
            )}
          </InView>
        </CardBody>
        <CardBody paddingTop={0}>
          <Heading size="md">{title}</Heading>
          <Text>
            by{" "}
            {artistLink !== "" && artistLink !== null ? (
              <>
                <Link href={artistLink}>{username}</Link>
                <ExternalLinkIcon paddingLeft={1} />
              </>
            ) : (
              username
            )}
          </Text>
        </CardBody>
      </Card>
      <Modal size="xl" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay>
          <ModalContent>
            <Image onClick={onOpen} src={artworkLink} fallback={<Skeleton />} />
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
