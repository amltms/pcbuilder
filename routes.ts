import { Router } from "https://deno.land/x/oak/mod.ts";
import { getComponents, getComponent, addComponent, updateComponent, deleteComponent} from './controllers/components.ts';
const router = new Router();
router
  .get("/components", getComponents)
  .get("/components/:id", getComponent)
  .post("/components", addComponent)
  .put("/components/:id", updateComponent)
  .delete("/components/:id", deleteComponent)

export default router;