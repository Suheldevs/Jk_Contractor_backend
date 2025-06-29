import express from "express";
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from "../controller/blog.controller.js";
import { tokenVerify } from "../middleware/checkToken.js";

const router = express.Router();

router.post("/save", tokenVerify, createBlog);
router.get("/getall", getAllBlogs);
router.get("/get/:id", getBlogById);
router.put("/update/:id", tokenVerify, updateBlog);
router.delete("/delete/:id", tokenVerify,deleteBlog);

export default router;