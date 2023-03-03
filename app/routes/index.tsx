import { ActionArgs, json } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { ReactNode, useEffect, useRef } from "react";
import { z, ZodError } from "zod";
import { addUserToWaitlist } from "~/lib/mailchimp.server";

const waitlistSchema = z.object({
  waitlistMember: z.string().email({
    message: "Seems like your email isn't valid, try re-entering it.",
  }),
});

export async function action({ request }: ActionArgs) {
  await new Promise((res) => setTimeout(res, 1000));
  const formData = Object.fromEntries(await request.formData());
  try {
    const waitlistMember = waitlistSchema.parse(formData);
    await addUserToWaitlist(waitlistMember.waitlistMember);
    return json({ message: "", success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return json(
        { message: JSON.parse(error.message)[0].message, success: false },
        { status: 400 }
      );
    }

    return json(
      {
        message: "You're already subscribed to this newsletter!",
        success: false,
      },
      { status: 400 }
    );
  }
}

export default function Index() {
  const errors = useActionData<typeof action>();
  const transition = useTransition();
  const state: "idle" | "success" | "error" | "submitting" =
    transition.submission
      ? "submitting"
      : errors?.success === true
      ? "success"
      : errors?.success === false
      ? "error"
      : "idle";

  const inputRef = useRef<HTMLInputElement | null>(null);
  const successRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (state === "error") {
      inputRef?.current?.focus();
    }

    if (state === "success") {
      successRef?.current?.focus();
    }
  }, [state]);

  return (
    <div className="text-center">
      <h1 className="mb-4 text-3xl font-bold text-center text-pink-600 underline decoration-wavy underline-offset-8">
        Bookwurm
      </h1>
      <Form
        method="post"
        action="."
        replace
        aria-hidden={state === "success"}
        className="aria-hidden:hidden"
      >
        <label htmlFor="waitlist" className="block mb-2 text-sm font-bold">
          Enter your email to get notified about Bookwurm
        </label>
        <input
          autoFocus
          required
          ref={inputRef}
          aria-required
          type="text"
          name="waitlistMember"
          aria-describedby="error-message"
          id="waitlistMember"
          autoComplete="email"
          className="w-full mb-2 border border-gray-300 rounded-md focus:ring-pink-400 focus-visible:border-pink-300 focus:ring focus:ring-opacity-50"
          placeholder="someone@email.com"
        />
        <button
          type="submit"
          disabled={transition.state === "submitting" || state === "success"}
          className="w-full px-4 py-2 text-sm font-bold text-white duration-150 bg-pink-600 rounded-md outline-none hover:bg-pink-700 focus:ring-pink-400 focus-visible:border-pink-300 focus:ring focus:ring-opacity-50 disabled:bg-pink-300 disabled:hover:cursor-not-allowed"
        >
          Waitlist
        </button>
      </Form>
      {state === "error" && <ErrorMessage>{errors?.message}</ErrorMessage>}
      <div
        className="mt-2 aria-hidden:hidden"
        aria-hidden={state !== "success"}
      >
        <h2 ref={successRef}>Woohoo! You're subscribed!</h2>
        <p className="text-green-600">
          You'll get emails sent to you about updates to Bookwurm.
        </p>
      </div>
    </div>
  );
}

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <span
      className="block max-w-sm mt-2 text-sm text-red-500"
      id="error-message"
    >
      {children}
    </span>
  );
}
