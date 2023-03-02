import { z } from "zod";

const envVariables = z.object({
  MAILCHIMP_API_KEY: z.string(),
  MAILCHIMP_SERVER_PREFIX: z.string(),
  MAILCHIMP_AUDIENCE_ID: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
