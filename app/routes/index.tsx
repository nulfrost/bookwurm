import { ActionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("waitlist") as string;
  if (!email || !email.includes("@")) {
    return json(
      {
        message:
          "There's an error with your e-mail address. Please double check and make sure it's correct!",
      },
      { status: 400 }
    );
  }
  return json(
    {
      message:
        "Congratulations! You've successfully signed up for the waitlist.",
    },
    { status: 201 }
  );
}

export default function Index() {
  return (
    <div className="text-center">
      <h1 className="mb-4 text-3xl font-bold text-pink-600 underline decoration-wavy underline-offset-8">
        Bookwurm
      </h1>
      <Form method="post" action="." replace>
        <label htmlFor="waitlist" className="block mb-2 text-sm font-bold">
          Enter your email to get notified about Bookwurm
        </label>
        <input
          autoFocus
          required
          aria-required
          type="email"
          name="waitlist"
          id="waitlist"
          autoComplete="email"
          className="w-full mb-2 mr-2 border border-gray-300 rounded-md focus:ring-pink-400 focus-visible:border-pink-300 focus:ring focus:ring-opacity-50"
          placeholder="someone@email.com"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-bold text-white duration-150 bg-pink-600 rounded-md outline-none hover:bg-pink-700 focus:ring-pink-400 focus-visible:border-pink-300 focus:ring focus:ring-opacity-50 disabled:bg-pink-300 disabled:hover:cursor-not-allowed"
        >
          Waitlist
        </button>
      </Form>
    </div>
  );
}
