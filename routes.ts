import { Router } from "https://deno.land/x/oak/mod.ts";
import { getComponents} from './controllers/components.ts';

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/components", getComponents);

export default router;