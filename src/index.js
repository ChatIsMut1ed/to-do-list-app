import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './stores/auth.store';

// ----------------------------------------------------------------------
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 900000,
    },
    mutations: {
      onSuccess: () => queryClient.invalidateQueries(),
      onError: () => queryClient.invalidateQueries(),
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </HelmetProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
