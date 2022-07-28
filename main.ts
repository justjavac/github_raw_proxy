import { serve } from "https://deno.land/std@0.149.0/http/server.ts";
import { CSS, render } from "https://deno.land/x/gfm@0.1.22/mod.ts";

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);

  if (pathname === "/") {
    const readme = await Deno.readTextFile("./README.md");
    const body = render(readme);
    const html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>GitHub Raw Proxy</title>
          <style>
            body {
              margin: 0;
              background-color: var(--color-canvas-default);
              color: var(--color-fg-default);
            }
            main {
              max-width: 800px;
              margin: 0 auto;
              padding: 2rem 1rem;
            }
            ${CSS}
          </style>
        </head>
        <body data-color-mode="auto" data-light-theme="light" data-dark-theme="dark">
          <main class="markdown-body">
            ${body}
          </main>
        </body>
      </html>`;
    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=utf-8",
      },
    });
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
