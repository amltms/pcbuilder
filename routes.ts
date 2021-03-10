import {Router}  from "https://deno.land/x/oak/mod.ts";
import { home, getComponents, addComponent, getComponent} from './controllers/components.ts';

const router = new Router();
  router
    .get("/", home)
    .get("/component", getComponents)
    .post("/component", addComponent)
    .get("/component/:id", getComponent);

export default router;