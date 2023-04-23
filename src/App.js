import React from 'react';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import Router from './shared/Router';

function App() {
  const queryClient = new QueryClient({ defaultOptions : {

    queries : {
      refetchOnWindowFocus : false
    }

  } })
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
