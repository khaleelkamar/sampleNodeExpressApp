import * as express from "express";

import userController from "./user.controller";

import companyController from "./company.controller";

import { verifyToken } from "../middlewares/auth.controller";

//app controller and routes
export default express
  .Router()
  .post("/createUser", userController.createUser)
  .post("/userLogin", userController.userLogin)
  .post("/createCompany", verifyToken, companyController.createCompany)
  .get("/getUserCompany", verifyToken, companyController.getUserCompany)
  .get("/getUser", verifyToken, userController.getUser)

  .put("/updateCompanyData", verifyToken, companyController.updateCompanyData)
  .put("/updateUserData", verifyToken, userController.updateUserData)

  .post("/deleteCompanyData", verifyToken, companyController.deleteCompanyData);
