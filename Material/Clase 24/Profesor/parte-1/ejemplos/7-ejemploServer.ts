import { serve } from "https://deno.land/std@0.152.0/http/server.ts";

const port = 8080;

const controller = (request: Request): Response => {
  const body = `Your user-agent is:\n\n${request.headers.get("user-agent") ?? "Unknown"
    }`;

  return new Response(body, { status: 200 });
};

await serve(controller, { port });
