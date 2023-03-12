import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = async ({ headers, cacheControl }) => {
  headers.set("X-My-Custom-Header", "Hello World");
  cacheControl({
    maxAge: 600,
    public: true,
    immutable: true,
    staleWhileRevalidate: 600,
  });
};

export default component$(() => {
  return (
    <div>
      <Slot />
    </div>
  );
});
