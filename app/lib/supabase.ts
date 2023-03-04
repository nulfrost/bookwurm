import { Database } from "../../types/supabase";
import { createServerClient as _createServerClient } from "@supabase/auth-helpers-remix";

export function createServerClient(request: Request, response: Response) {
  const supabase = _createServerClient<Database>(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    { request, response }
  );
  return supabase;
}
