import {Router}  from "https://deno.land/x/oak/mod.ts";
import {getComponents, getComponent, addComponent, updateComponent, deleteComponent} from '../controllers/components.ts';

const router = new Router();

  router
    .get("/component", getComponents)
    .post("/component", addComponent)
    .get("/component/:id", getComponent)
    .put("/component/:id", updateComponent)
    .delete("/component/:id", deleteComponent);

export default router;

