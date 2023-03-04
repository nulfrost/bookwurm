import type { V2_MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import styles from "./tailwind.css";
import DMSans from "@fontsource/dm-sans/latin.css";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";

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

export function loader() {
  return {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  };
}

export default function App() {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = useLoaderData<typeof loader>();

  const revalidator = useRevalidator();

  const [supabase] = useState(() =>
    createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      console.log({ event });
      revalidator.revalidate();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, revalidator]);

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full font-sans bg-gray-100">
        <main className="h-full ">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
