import {
  Avatar,
  Button,
  Drawer,
  Flex,
  Spacer,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useLanguage, LANGUAGE } from "../../contexts/LanguageContext";
import SiteIcon from "../../assets/icons/aloe.png";

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        backgroundColor="purple.400"
        padding="1rem"
        gap="1rem"
        alignItems={"center"}
      >
        <Button colorScheme="purple" bgColor="transparent" boxSize={10}>
          <HamburgerIcon boxSize={10} />
        </Button>
        <NavLink to="/home">
          <Flex
            backgroundColor="purple.400"
            gap="1rem"
            alignItems={"center"}
          >
            <Avatar src={SiteIcon} />
            <Text fontSize="3xl">魔の友から、アロエちゃんへ</Text>
          </Flex>
        </NavLink>
        <Spacer />
        <Switch
          colorScheme="whiteAlpha"
          onChange={(e) =>
            setLanguage(e.target.checked ? LANGUAGE.JP : LANGUAGE.ORIGINAL)
          }
        />
        {language}
      </Flex>
    </>
  );
}
