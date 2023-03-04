import { ActionArgs, json } from "@remix-run/node";
import { createServerClient } from "~/lib/supabase";

export async function action({ request }: ActionArgs) {
  const response = new Response();
  const supabase = createServerClient(request, response);
  await supabase.auth.signOut();
  return json(null, { headers: response.headers });
}
