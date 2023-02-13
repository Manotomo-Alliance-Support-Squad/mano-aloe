import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Home from "./components/HomePage";
import Games from "./components/GamesPage";
import Gallery from "./components/GamesPage";
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";
import { theme } from "./theme";
import {
  useLanguageContext,
  LanguageContext,
} from "./contexts/LanguageContext";

const AppShell = () => {
  return (
    <>
      <Box position="fixed" width="100%" zIndex={100}>
        <Header />
      </Box>
      <Box visibility={"hidden"}>
        <Header />
      </Box>
      <Outlet />
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
        element: <Navigate to="/home"/>
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
      <LanguageContext.Provider value={languageState}>
        <RouterProvider router={router} />
      </LanguageContext.Provider>
    </ChakraProvider>
  );
}

export default App;
