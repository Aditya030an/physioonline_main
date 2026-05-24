import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editBlog, setEditBlog] = useState(null);

  const isAdmin = !!localStorage.getItem("owner_key");

  const API_URL = import.meta.env.VITE_API_URL;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs`);
        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.log("Blog fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/blogs/${blogId}`, {
        headers: {
          "x-owner-key": localStorage.getItem("owner_key"),
        },
      });

      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
      alert("Blog deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Blog delete failed");
    }
  };

  const handleEditClick = (blog) => {
    setEditBlog({
      ...blog,
      sections: blog.sections || [],
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${API_URL}/api/blogs/${editBlog._id}`,
        editBlog,
        {
          headers: {
            "x-owner-key": localStorage.getItem("owner_key"),
          },
        },
      );

      setBlogs((prev) =>
        prev.map((blog) => (blog._id === editBlog._id ? res.data.blog : blog)),
      );

      setEditBlog(null);
      alert("Blog updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Blog update failed");
    }
  };

  const filteredBlogs = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];

    const query = search
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ");

    // When search is empty, show all blogs
    if (!query) return blogs;

    const keywords = query.split(" ").filter(Boolean);

    return blogs
      .map((blog) => {
        const searchableText = [
          blog.title || "",
          blog.category || "",
          blog.description || "",
          ...(blog.sections || []).flatMap((section) => [
            section.heading || "",
            ...(section.paragraphs || []),
          ]),
        ]
          .join(" ")
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, " ")
          .replace(/\s+/g, " ");

        const title = (blog.title || "").toLowerCase();
        const category = (blog.category || "").toLowerCase();
        const description = (blog.description || "").toLowerCase();

        let score = 0;

        keywords.forEach((word) => {
          if (title.includes(word)) score += 5;
          if (category.includes(word)) score += 3;
          if (description.includes(word)) score += 2;
          if (searchableText.includes(word)) score += 1;
        });

        if (title.includes(query)) score += 10;
        if (category.includes(query)) score += 6;
        if (searchableText.includes(query)) score += 4;

        return { ...blog, searchScore: score };
      })
      .filter((blog) => blog.searchScore > 0)
      .sort((a, b) => b.searchScore - a.searchScore);
  }, [search, blogs]);

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeBlog = () => {
    setSelectedBlog(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  console.log("all blogs", blogs);
  console.log("all Filtered blog", filteredBlogs);

  if (editBlog) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-28">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-lg sm:p-10">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-[#00C4CD]">Admin Panel</p>
              <h1 className="text-3xl font-semibold text-[#003A80]">
                Update Blog
              </h1>
            </div>

            <button
              onClick={() => setEditBlog(null)}
              className="rounded-xl border px-5 py-2 text-sm text-[#003A80]"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleUpdateBlog} className="space-y-6">
            <input
              value={editBlog.title}
              onChange={(e) =>
                setEditBlog({ ...editBlog, title: e.target.value })
              }
              placeholder="Blog title"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
              required
            />

            <input
              value={editBlog.category}
              onChange={(e) =>
                setEditBlog({ ...editBlog, category: e.target.value })
              }
              placeholder="Blog category"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
              required
            />

            <textarea
              value={editBlog.description}
              onChange={(e) =>
                setEditBlog({ ...editBlog, description: e.target.value })
              }
              placeholder="Short description"
              rows="4"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
              required
            />

            {editBlog.sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-[#003A80]">
                    Section {sectionIndex + 1}
                  </h2>

                  {editBlog.sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updatedSections = editBlog.sections.filter(
                          (_, index) => index !== sectionIndex,
                        );
                        setEditBlog({ ...editBlog, sections: updatedSections });
                      }}
                      className="text-sm text-red-500"
                    >
                      Remove Section
                    </button>
                  )}
                </div>

                <input
                  value={section.heading}
                  onChange={(e) => {
                    const updatedSections = [...editBlog.sections];
                    updatedSections[sectionIndex].heading = e.target.value;
                    setEditBlog({ ...editBlog, sections: updatedSections });
                  }}
                  placeholder="Section heading"
                  className="mb-4 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
                  required
                />

                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <div key={paragraphIndex} className="mb-3">
                    <textarea
                      value={paragraph}
                      onChange={(e) => {
                        const updatedSections = [...editBlog.sections];
                        updatedSections[sectionIndex].paragraphs[
                          paragraphIndex
                        ] = e.target.value;

                        setEditBlog({
                          ...editBlog,
                          sections: updatedSections,
                        });
                      }}
                      placeholder={`Paragraph ${paragraphIndex + 1}`}
                      rows="4"
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
                      required
                    />

                    {section.paragraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updatedSections = [...editBlog.sections];

                          updatedSections[sectionIndex].paragraphs =
                            updatedSections[sectionIndex].paragraphs.filter(
                              (_, index) => index !== paragraphIndex,
                            );

                          setEditBlog({
                            ...editBlog,
                            sections: updatedSections,
                          });
                        }}
                        className="mt-1 text-sm text-red-500"
                      >
                        Remove Paragraph
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const updatedSections = [...editBlog.sections];
                    updatedSections[sectionIndex].paragraphs.push("");

                    setEditBlog({
                      ...editBlog,
                      sections: updatedSections,
                    });
                  }}
                  className="rounded-xl border border-[#003A80] px-4 py-2 text-sm text-[#003A80]"
                >
                  + Add Paragraph
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setEditBlog({
                  ...editBlog,
                  sections: [
                    ...editBlog.sections,
                    { heading: "", paragraphs: [""] },
                  ],
                })
              }
              className="rounded-xl border border-[#00C4CD] px-5 py-3 font-medium text-[#003A80]"
            >
              + Add Section
            </button>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#003A80] px-6 py-4 font-medium text-white"
            >
              Update Blog
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (selectedBlog) {
    return (
      <main className="bg-white pt-24 sm:pt-28 lg:pt-32">
        <section className="px-4 sm:px-6 lg:px-20 pb-14">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={closeBlog}
              className="mb-6 inline-flex items-center rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-[#003A80] hover:bg-gray-50"
            >
              ← Back to Blogs
            </button>

            <div className="rounded-3xl bg-gray-50 p-5 shadow-sm sm:p-8 lg:p-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#00C4CD]">
                {selectedBlog?.category}
              </p>

              <h1 className="text-3xl font-semibold leading-tight text-[#003A80] sm:text-4xl lg:text-5xl">
                {selectedBlog?.title}
              </h1>

              <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
                {selectedBlog?.description}
              </p>
            </div>

            <article className="mt-10 space-y-9 rounded-3xl bg-white text-gray-700">
              {selectedBlog?.sections.map((section, index) => (
                <section
                  key={`${selectedBlog._id}-${index}`}
                  className="border-b border-gray-100 pb-8 last:border-b-0"
                >
                  <h2 className="mb-4 text-2xl font-semibold text-[#003A80]">
                    {section?.heading}
                  </h2>

                  <div className="space-y-4">
                    {section?.paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        className="text-[15px] leading-8 text-gray-700 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </article>

            <div className="mt-12 rounded-3xl bg-gray-50 p-6 text-center sm:p-10">
              <h3 className="text-2xl font-semibold text-[#003A80]">
                Need Professional Physiotherapy Advice?
              </h3>

              <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                Book a consultation with Movement Rehab for patient-centered
                physiotherapy and rehabilitation guidance.
              </p>

              <button
                onClick={() => navigate("/Appointment")}
                className="mt-6 rounded-xl bg-[#003A80] px-8 py-4 font-medium text-white transition hover:bg-[#002c63]"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="bg-gray-50 px-4 pb-14 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-32 lg:px-20 lg:pb-24 lg:pt-36">
        <p className="mb-3 font-semibold text-[#00C4CD]">OUR BLOG</p>

        <h1 className="mx-auto mb-6 max-w-4xl text-3xl font-semibold text-[#003A80] sm:text-4xl lg:text-5xl">
          Physiotherapy Insights & Patient Awareness
        </h1>

        <p className="mx-auto max-w-2xl text-gray-600">
          Evidence-based rehabilitation guidance, patient safety awareness, and
          wellness education from Movement Rehab.
        </p>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="flex flex-col gap-3 rounded-2xl bg-white shadow-sm sm:flex-row">
            <input
              type="text"
              placeholder="Search by topic, condition, pain, stroke, home care..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-5 py-3 outline-none focus:border-[#003A80]"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-[#003A80] hover:bg-gray-50"
              >
                Clear
              </button>
            )}
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Search works across blog title, category, headings, and full article
            content.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8 lg:p-12">
          <div className="max-w-4xl">
            <p className="mb-2 font-medium text-[#00C4CD]">Featured Article</p>

            <h2 className="mb-4 text-2xl font-semibold leading-tight text-[#003A80] sm:text-3xl lg:text-4xl">
              {blogs[0]?.title}
            </h2>

            <p className="mb-6 leading-7 text-gray-600">
              {blogs[0]?.description}
            </p>

            <button
              onClick={() => openBlog(blogs[0])}
              className="rounded-xl bg-[#003A80] px-6 py-3 font-medium text-white transition hover:bg-[#002c63]"
            >
              Read Article →
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-20 lg:pb-32">
        <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between gap-4">
          <div>
            <p className="font-medium text-[#00C4CD]">Latest Articles</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#003A80] sm:text-3xl">
              Read Health & Rehabilitation Blogs
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={() => navigate("/admin/blog-upload")}
                className="rounded-xl bg-[#003A80] px-5 py-3 text-sm font-medium text-white hover:bg-[#002c63]"
              >
                Upload Blog
              </button>
            )}

            <p className="hidden text-sm text-gray-500 sm:block">
              {filteredBlogs?.length} article
              {filteredBlogs.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {filteredBlogs?.length === 0 ? (
          <div className="mx-auto max-w-7xl rounded-2xl border border-dashed border-gray-300 p-10 text-center">
            <h3 className="text-xl font-semibold text-[#003A80]">
              No blogs found
            </h3>
            <p className="mt-2 text-gray-500">
              Try searching with another keyword.
            </p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {filteredBlogs?.map((blog) => (
              <article
                key={blog?._id}
                className="group rounded-3xl border border-gray-100 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="p-6">
                  <p className="mb-2 text-sm font-medium text-[#00C4CD]">
                    {blog?.category}
                  </p>

                  <h3 className="mb-3 line-clamp-2 text-xl font-semibold leading-snug text-[#003A80]">
                    {blog?.title}
                  </h3>

                  <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {blog?.description}
                  </p>

                  {/* <button
                    onClick={() => openBlog(blog)}
                    className="font-medium text-[#003A80] transition hover:text-[#00C4CD]"
                  >
                    Read More →
                  </button> */}

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      onClick={() => openBlog(blog)}
                      className="font-medium text-[#003A80] transition hover:text-[#00C4CD]"
                    >
                      Read More →
                    </button>

                    {isAdmin && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(blog)}
                          className="rounded-lg border border-[#003A80] px-3 py-2 text-xs font-medium text-[#003A80]"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="bg-gray-50 px-4 py-16 text-center sm:px-6 sm:py-24">
        <h2 className="mb-4 text-3xl font-semibold text-[#003A80] sm:text-4xl">
          Need Professional Physiotherapy Advice?
        </h2>

        <p className="mb-8 text-gray-600">
          Book a consultation with our expert physiotherapists today.
        </p>

        <button
          onClick={() => navigate("/Appointment")}
          className="rounded-xl bg-[#003A80] px-8 py-4 text-white transition hover:bg-[#002c63]"
        >
          Book Consultation
        </button>
      </section>
    </main>
  );
};

export default BlogPage;
