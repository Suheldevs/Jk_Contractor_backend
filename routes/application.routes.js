import express from "express";
import { applyForJob, getAllApplications, deleteApplication } from "../controller/application.controller.js";

const router = express.Router();

router.post("/apply", applyForJob); 
router.get("/getall", getAllApplications); 
router.delete("/delete/:id", deleteApplication); 

export default router;
