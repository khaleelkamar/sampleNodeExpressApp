import * as express from "express";
import userController from "./user.controller";
import contactController from "./contatct.controller.js";

import { verifyToken } from "../middlewares/auth.controller";

//app controller and routes
export default express
  .Router()
  .post("/createUser", userController.createUser)
  .post("/userLogin", userController.userLogin)
  .post("/contacts", verifyToken, contactController.createContact)
  .get("/contacts", verifyToken, contactController.getContatctList)
  .get("/contacts/:id", verifyToken, contactController.getContatctByid)
  .put("/contacts/:id", verifyToken, contactController.updateContatctByid)
  .delete("/contacts/:id", verifyToken, contactController.deleteContatctByid)
 
