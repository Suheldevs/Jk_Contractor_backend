import express from "express";
import { createGallery, getAllGallery, getGalleryById, updateGallery, deleteGallery } from "../controller/gallery.controller.js";

const router = express.Router();

router.post("/save", createGallery); 
router.get("/getall", getAllGallery); 
router.get("/get/:id", getGalleryById); 
router.put("/update/:id", updateGallery);
router.delete("/delete/:id", deleteGallery); 

export default router;