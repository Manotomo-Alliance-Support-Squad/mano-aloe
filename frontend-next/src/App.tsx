import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  ChakraProvider,
  Link,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import RspcProvider from "./rspc";
import Credits from "./credits";
import Home from "./components/HomePage";
import Games from "./components/GamesPage";
import Gallery from "./components/GalleryPage";
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";
import { theme } from "./theme";
import {
  useLanguageContext,
  LanguageContext,
} from "./contexts/LanguageContext";

const AppShell = () => {
  const FOOTER_HEIGHT = 40;
  return (
    <>
      <Box position="fixed" width="100%" zIndex={100}>
        <Header />
      </Box>
      <Box visibility={"hidden"}>
        <Header />
      </Box>
      <Outlet />
      <Box minHeight={FOOTER_HEIGHT} bgColor="brand.purple.500" >
        <Accordion allowToggle padding={2}>
          <AccordionItem>
            <AccordionButton>
              Attributions
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Text>
                Icons by <Link href="https://fontawesome.com/">FontAwesome</Link> under <Link href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</Link>
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              Contributors
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Credits />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box padding={2}>
          <Text>
            <Link href="https://github.com/Manotomo-Alliance-Support-Squad/mano-aloe"><Icon boxSize={8} as={FaGithub} /></Link>
          </Text>
        </Box>
      </Box>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/game",
        element: <Games />,
      },
      {
        path: "/art",
        element: <Gallery />,
      },
    ],
  },
]);

function App() {
  const languageState = useLanguageContext();

  return (
    <ChakraProvider theme={theme}>
      <RspcProvider>
        <LanguageContext.Provider value={languageState}>
          <RouterProvider router={router} />
        </LanguageContext.Provider>
      </RspcProvider>
    </ChakraProvider>
  );
}

export default App;
