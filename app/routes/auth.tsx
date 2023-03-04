import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useFetcher } from "@remix-run/react";

import { createServerClient, useSupabase } from "~/lib/supabase";

export async function action({ request }: ActionArgs) {
  //   const formData = Object.fromEntries(await request.formData());
  const response = new Response();
  const supabase = createServerClient(request, response);
  //   await supabase.auth.signInWithOtp({
  //     email: formData.email as string,
  //   });
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return redirect(data.url as string, {
    headers: response.headers,
  });
  //   return json({ session }, { headers: response.headers });
}

export async function loader({ request }: LoaderArgs) {
  const response = new Response();
  const supabase = createServerClient(request, response);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);
  return {};
}

export default function Auth() {
  const fetcher = useFetcher();
  return (
    <div className="max-w-sm mx-auto mt-40 text-center">
      <h1 className="mb-4 text-3xl font-bold text-pink-600 underline decoration-wavy underline-offset-8">
        Bookwurm
      </h1>
      {/* <Form method="post" action=".">
        <input
          type="text"
          aria-required
          required
          name="email"
          id="email"
          className="w-full mb-2 border border-gray-300 rounded-md focus:ring-pink-400 focus-visible:border-pink-300 focus:ring focus:ring-opacity-50"
        />
        <button type="submit">Login</button>
      </Form> */}
      <fetcher.Form method="post" action="/signout">
        <button type="submit">Sign out</button>
      </fetcher.Form>
      <Form method="post" action=".">
        {/* <input
          type="text"
          aria-required
          required
          name="email"
          id="email"
          className="w-full mb-2 border border-gray-300 rounded-md focus:ring-pink-400 focus-visible:border-pink-300 focus:ring focus:ring-opacity-50"
        /> */}
        <button type="submit">Sign in with Github</button>
      </Form>
    </div>
  );
}
