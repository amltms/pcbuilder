import {bold,cyan,green} from "https://deno.land/std@0.84.0/fmt/colors.ts";
import {Application, isHttpError}  from "https://deno.land/x/oak/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

import router from './routes/components.ts';
const port = Deno.env.get("PORT") || 4000;
const app = new Application();

// Logger
app.use(async (context, next) => {
    await next();
    const rt = context.response.headers.get("X-Response-Time");
    console.log(
        `${green(context.request.method)} ${
        cyan(decodeURIComponent(context.request.url.pathname))
        } - ${
        bold(
            String(rt),
        )
        }`,
    );
});
  
// Response Time
app.use(async (context, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    context.response.headers.set("X-Response-Time", `${ms}ms`);
});
  
// Error handler
app.use(async (context, next) => {
    try {
        await next();
    } catch (err) {
        if (isHttpError(err)) {
        context.response.status = err.status;
        const { message, status, stack } = err;
        if (context.request.accepts("json")) {
            context.response.body = { message, status, stack };
            context.response.type = "json";
        } else {
            context.response.body = `${status} ${message}\n\n${stack ?? ""}`;
            context.response.type = "text/plain";
        }
        } else {
        console.log(err);
        throw err;
        }
        
    }
});

  // Use the router
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: +port });