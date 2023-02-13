import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  Hide,
  Icon,
  Text,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { FaGamepad, FaImages, FaHome, FaLanguage } from "react-icons/fa";
import { useLanguage, LANGUAGE } from "../../contexts/LanguageContext";
import SiteIcon from "../../assets/icons/aloe.png";

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  return (
    <>
      <Flex
        backgroundColor="brand.purple.650"
        padding="1rem"
        gap="1rem"
        alignItems={"center"}
      >
        <NavLink to="/home">
          <Flex gap="1rem" alignItems={"center"}>
            <Avatar src={SiteIcon} />
            <Hide breakpoint="(max-width: 800px)">
              <Text fontSize="3xl">魔の友から、アロエちゃんへ</Text>
            </Hide>
          </Flex>
        </NavLink>
        <Spacer />
        <ButtonGroup>
          <NavLink to="/home">
            <Button>
              <Icon
                color={
                  location.pathname === "/home"
                    ? "brand.navIcon.active"
                    : "brand.navIcon.inactive"
                }
                boxSize={6}
                as={FaHome}
              />
            </Button>
          </NavLink>
          <NavLink to="/game">
            <Button>
              <Icon
                color={
                  location.pathname === "/game"
                    ? "brand.navIcon.active"
                    : "brand.navIcon.inactive"
                }
                boxSize={6}
                as={FaGamepad}
              />
            </Button>
          </NavLink>
          <NavLink to="/art">
            <Button>
              <Icon
                color={
                  location.pathname === "/art"
                    ? "brand.navIcon.active"
                    : "brand.navIcon.inactive"
                }
                boxSize={6}
                as={FaImages}
              />
            </Button>
          </NavLink>
          <Button
            onClick={() => {
              setLanguage((lang) =>
                lang === LANGUAGE.ORIGINAL ? LANGUAGE.JP : LANGUAGE.ORIGINAL
              );
            }}
          >
            <Icon
              color={
                language === LANGUAGE.JP
                  ? "brand.navIcon.active"
                  : "brand.navIcon.inactive"
              }
              boxSize={8}
              as={FaLanguage}
            />
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
}
