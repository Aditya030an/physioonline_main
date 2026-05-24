import Blog from "../models/blog.model.js";

export const createBlog = async (req, res) => {
  try {
    const { title, category, description, sections } = req.body;

    // console.log("req body" , req.body);

    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, category and description are required",
      });
    }

    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one section is required",
      });
    }

    const blog = await Blog.create(req.body);

    // console.log("blog upload " , blog);

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const bulkUploadBlogs = async (req, res) => {
  try {
    const { blogs } = req.body;

    // console.log("blogs" , req.body);

    if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Blogs array is required",
      });
    }

    const uploadedBlogs = await Blog.insertMany(blogs);

    res.status(201).json({
      success: true,
      message: "Blogs uploaded successfully",
      count: uploadedBlogs.length,
      blogs: uploadedBlogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};