import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ImdbSearch from "./components/ImdbSearch";

const queryClient = new QueryClient();
const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <ImdbSearch />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
