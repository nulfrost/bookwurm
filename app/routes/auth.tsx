import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { createServerClient } from "~/lib/supabase";

// server side validation here for email
export async function action({ request }: ActionArgs) {
  const formData = Object.fromEntries(await request.formData());
  const method = formData.method;
  const response = new Response();
  const supabase = createServerClient(request, response);
  switch (method) {
    case "email":
      await supabase.auth.signInWithOtp({
        email: formData.email as string,
      });
      return json(null, { headers: response.headers });
    case "github":
      const { data } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
      return redirect(data.url as string, {
        headers: response.headers,
      });
    default: {
      throw new Error("Unexpected action");
    }
  }
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
  return (
    <div className="pt-80">
      <div className="max-w-sm px-4 py-10 mx-auto text-center bg-white border border-gray-200 rounded-md shadow-sm">
        <h1 className="mb-4 text-3xl font-bold text-pink-600 underline decoration-wavy underline-offset-8">
          Bookwurm
        </h1>
        <Form method="post" action="." className="space-y-2">
          <fieldset>
            <input
              type="text"
              aria-required
              required
              name="email"
              id="email"
              placeholder="someone@email.com"
              className="w-full mb-2 border border-gray-300 rounded-md focus:ring-pink-400 focus-visible:border-pink-300 focus:ring focus:ring-opacity-50"
            />
            <button
              name="method"
              value="email"
              type="submit"
              className="w-full px-4 py-2 text-sm font-bold text-white duration-150 bg-pink-600 rounded-md outline-none hover:bg-pink-700 focus:ring-pink-400 focus-visible:border-pink-300 focus:ring focus:ring-opacity-50 disabled:bg-pink-300 disabled:hover:cursor-not-allowed"
            >
              Continue with Email (Magic Link)
            </button>
          </fieldset>
        </Form>
        <div className="flex items-center before:content-[''] before:flex-1 before:mr-3 before:border-t before:border-gray-300 after:content-[''] after:flex-1 after:ml-3 after:border-t after:border-gray-300 text-sm text-gray-500 my-2">
          Or sign in with a provider
        </div>
        <Form method="post" action=".">
          <button
            name="method"
            value="github"
            type="submit"
            className="w-full py-2 text-sm font-bold text-white duration-150 bg-red-600 rounded-md hover:bg-red-700"
          >
            Continue with Google
          </button>
        </Form>
      </div>
    </div>
  );
}
