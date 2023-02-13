import { useRouteError } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Center,
  Heading,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

interface RouteError {
  statusText: String;
  message: String;
  status: number;
}

export default function ErrorPage() {
  const error: RouteError = useRouteError() as RouteError;

  return (
    <Center height="100vh">
      <Alert variant="subtle" status="error" flexDir="column">
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle>Watame did (borderline) nothing wrong!</AlertTitle>
        <AlertDescription>An unexpected error has occurred.</AlertDescription>
        <p>{error.status}</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <NavLink to="/home">Go Home</NavLink>
      </Alert>
    </Center>
  );
}
