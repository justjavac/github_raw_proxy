import { serve } from "https://deno.land/std@0.148.0/http/server.ts";

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);

  if (pathname === "/") {
    const usage = await Deno.readFile("README.md");
    return new Response(usage, {
      headers: {
        "content-type": "text/plain",
      },
    });
  }

  return fetch(new URL(pathname, "https://raw.githubusercontent.com"));
}

serve(handleRequest);
