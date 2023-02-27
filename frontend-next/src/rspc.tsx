import { QueryClient } from "@tanstack/react-query";
import { createReactQueryHooks } from "@rspc/react";
import { FetchTransport, createClient } from "@rspc/client";

import type { Procedures } from "./bindings";
import { config } from "./config";

const client = createClient<Procedures>({
  transport: new FetchTransport(`${config.backendurl}rspc`),
});

const queryClient = new QueryClient();
export const rspc = createReactQueryHooks<Procedures>();

interface rspcProviderProps {
  children: JSX.Element;
}

export default function rspcProvider(props: rspcProviderProps) {
  const { children } = props;
  return (
    <rspc.Provider client={client} queryClient={queryClient}>
      {children}
    </rspc.Provider>
  );
}
