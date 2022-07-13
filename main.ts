import { serve } from "https://deno.land/std@0.148.0/http/server.ts";

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);

  if (pathname === "/") {
    return new Response(await Deno.readFile("README.md"));
  }

  if (pathname === "/favicon.ico") {
    return new Response(await Deno.readFile("favicon.ico"), {
      headers: {
        "content-type": "image/x-icon",
      },
    });
  }

  return fetch(new URL(pathname, "https://raw.githubusercontent.com"));
}

serve(handleRequest);
