import slugify from "slugify";
import Blog from "../model/blog.model.js";
//   Create a new blog
export const createBlog = async (req, res) => {
    try {
        const { title, description, category, postedBy, imageUrl } = req.body;
         
        if (!title || !description || !postedBy || !category || !imageUrl) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const matchtitle = await Blog.findOne({title});
        if(matchtitle){
            return res.status(400).json({message:'Title must be unique for every blog'})
        }
        const slug = slugify(title, {lower: true,strict: true,});

        const newBlog = new Blog({ title,slug,category, description, postedBy, imageUrl });
        await newBlog.save();

        res.status(201).json({ message: "Blog created successfully!", blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
};

//   Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
};

//   Get a single blog by ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
};

//   Update a blog
export const updateBlog = async (req, res) => {
    try {
        const { title, category, description, postedBy, imageUrl } = req.body;

        if (!title || !description || !category  || !postedBy || !imageUrl) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const slug = slugify(title, {lower: true,strict: true,});

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title,slug, category, description, postedBy, imageUrl },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        res.status(200).json({ message: "Blog updated successfully!", blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
};

//   Delete a blog
export const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found." });
        }
        res.status(200).json({ message: "Blog deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
};