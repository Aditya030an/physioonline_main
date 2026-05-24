import React, { useState } from "react";
import axios from "axios";
import { defaultBlogs } from "../data/defaultBlogs";

const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL", API_URL);

const AdminBlogUpload = () => {
  const [ownerKey, setOwnerKey] = useState(
    localStorage.getItem("owner_key") || "",
  );

  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("owner_key"));

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    sections: [{ heading: "", paragraphs: [""] }],
  });
  const [loading, setLoading] = useState(false);

  const handleOwnerLogin = () => {
    if (!ownerKey.trim()) {
      alert("Please enter owner secret key");
      return;
    }

    localStorage.setItem("owner_key", ownerKey);
    setIsAdmin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("owner_key");
    setOwnerKey("");
    setIsAdmin(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSectionHeading = (sectionIndex, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].heading = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleParagraph = (sectionIndex, paragraphIndex, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].paragraphs[paragraphIndex] = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { heading: "", paragraphs: [""] }],
    });
  };

  const removeSection = (sectionIndex) => {
    const updatedSections = formData.sections.filter(
      (_, index) => index !== sectionIndex,
    );

    setFormData({ ...formData, sections: updatedSections });
  };

  const addParagraph = (sectionIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].paragraphs.push("");
    setFormData({ ...formData, sections: updatedSections });
  };

  const removeParagraph = (sectionIndex, paragraphIndex) => {
    const updatedSections = [...formData.sections];

    updatedSections[sectionIndex].paragraphs = updatedSections[
      sectionIndex
    ].paragraphs.filter((_, index) => index !== paragraphIndex);

    setFormData({ ...formData, sections: updatedSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/blogs`, formData, {
        headers: {
          "x-owner-key": localStorage.getItem("owner_key"),
        },
      });

      console.log("res", res);

      alert("Blog uploaded successfully");

      setFormData({
        title: "",
        category: "",
        description: "",
        sections: [{ heading: "", paragraphs: [""] }],
      });
    } catch (error) {
      alert(error.response?.data?.message || "Blog upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkUpload = async () => {
    try {
      const ownerKey = localStorage.getItem("owner_key");

      if (!ownerKey) {
        alert("Owner key missing");
        return;
      }

      const cleanedBlogs = defaultBlogs.map(({ id, ...blog }) => blog);
      console.log("cleanedBlogs" , cleanedBlogs);
      await axios.post(
        `${API_URL}/api/blogs/bulk-upload`,
        { blogs: cleanedBlogs },
        {
          headers: {
            "x-owner-key": ownerKey,
          },
        },
      );

      alert("All blogs uploaded successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Bulk upload failed");
    }
  };

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 pt-32">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-2xl font-semibold text-[#003A80]">
            Owner Access
          </h1>

          <input
            type="password"
            placeholder="Enter owner secret key"
            value={ownerKey}
            onChange={(e) => setOwnerKey(e.target.value)}
            className="mb-4 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
          />

          <button
            onClick={handleOwnerLogin}
            className="w-full rounded-xl bg-[#003A80] px-6 py-3 font-medium text-white"
          >
            Continue
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-28">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-lg sm:p-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-[#00C4CD]">Admin Panel</p>
            <h1 className="text-3xl font-semibold text-[#003A80]">
              Upload Blog
            </h1>
          </div>

          {/* <button
            type="button"
            onClick={handleBulkUpload}
            className="rounded-xl bg-[#00C4CD] px-5 py-3 text-sm font-medium text-white hover:bg-[#00aab2]"
          >
            Upload All Default Blogs
          </button> */}

          <button
            onClick={handleLogout}
            className="rounded-xl border px-5 py-2 text-sm text-[#003A80]"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Blog title"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
            required
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Blog category"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short blog description"
            rows="4"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
            required
          />

          {formData.sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="rounded-2xl border bg-gray-50 p-5"
            >
              <div className="mb-4 flex justify-between">
                <h2 className="font-semibold text-[#003A80]">
                  Section {sectionIndex + 1}
                </h2>

                {formData.sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(sectionIndex)}
                    className="text-sm text-red-500"
                  >
                    Remove Section
                  </button>
                )}
              </div>

              <input
                value={section.heading}
                onChange={(e) =>
                  handleSectionHeading(sectionIndex, e.target.value)
                }
                placeholder="Section heading"
                className="mb-4 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
                required
              />

              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <div key={paragraphIndex} className="mb-3">
                  <textarea
                    value={paragraph}
                    onChange={(e) =>
                      handleParagraph(
                        sectionIndex,
                        paragraphIndex,
                        e.target.value,
                      )
                    }
                    placeholder={`Paragraph ${paragraphIndex + 1}`}
                    rows="4"
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
                    required
                  />

                  {section.paragraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeParagraph(sectionIndex, paragraphIndex)
                      }
                      className="mt-1 text-sm text-red-500"
                    >
                      Remove Paragraph
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => addParagraph(sectionIndex)}
                className="rounded-xl border border-[#003A80] px-4 py-2 text-sm text-[#003A80]"
              >
                + Add Paragraph
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="rounded-xl border border-[#00C4CD] px-5 py-3 font-medium text-[#003A80]"
          >
            + Add Section
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#003A80] px-6 py-4 font-medium text-white"
          >
            {loading ? "Uploading..." : "Upload Blog"}
            {/* Upload Blog */}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminBlogUpload;
