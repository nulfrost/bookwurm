import type { V2_MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";
import DMSans from "@fontsource/dm-sans/latin.css";

export const meta: V2_MetaFunction = () => [
  {
    charset: "utf-8",
    title: "Bookwurm | Discover new reading buddies",
    viewport: "width=device-width,initial-scale=1",
  },
];

export const links: LinksFunction = () => [
  { rel: "preload", href: styles, as: "style" },
  { rel: "preload", href: DMSans, as: "style" },
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: DMSans },
];

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full font-sans bg-gray-100">
        <main className="flex items-center justify-center h-full ">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
