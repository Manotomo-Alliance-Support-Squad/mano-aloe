import { useRouteError } from 'react-router-dom';

interface RouteError {
    statusText: String;
    message: String;
    status: number;
}

export default function ErrorPage() {
  const error: RouteError = useRouteError() as RouteError;

  return (
    <div id="error-page">
      <h1>Shit!</h1>
      <p>An unexpected error has occurred.</p>
      <p>{error.status}</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}