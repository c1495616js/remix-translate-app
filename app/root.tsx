import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import toastStyles from 'react-toastify/dist/ReactToastify.css';

import styles from './styles/tailwind.css';
import appStyles from './styles/app.css';
import Layout from './components/layout';
import { authenticator } from './services/auth.server';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: appStyles },
    { rel: 'stylesheet', href: toastStyles },
  ];
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request);
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
