import '@ant-design/v5-patch-for-react-19';

import type { FC, PropsWithChildren } from 'react';

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import './app.css';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default function App() {
  return <Outlet />;
}
