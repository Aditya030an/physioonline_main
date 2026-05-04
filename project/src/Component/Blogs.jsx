import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "5 Exercises to Relieve Lower Back Pain",
    category: "Physiotherapy Tips",
    image: "/blog1.jpg",
    description:
      "Simple physiotherapy exercises that help reduce lower back pain and improve daily mobility.",
  },
  {
    id: 2,
    title: "How Physiotherapy Helps Stroke Recovery",
    category: "Neuro Rehab",
    image: "/blog2.jpg",
    description:
      "Learn how targeted physiotherapy programs help stroke patients regain movement and independence.",
  },
  {
    id: 3,
    title: "Preventing Common Sports Injuries",
    category: "Sports Rehab",
    image: "/blog3.jpg",
    description:
      "Tips and physiotherapy techniques to reduce sports injuries and maintain peak performance.",
  },
  {
    id: 4,
    title: "Physiotherapy for Knee Pain",
    category: "Orthopedic Rehab",
    image: "/blog4.jpg",
    description:
      "Discover physiotherapy treatments that relieve knee pain and restore joint function.",
  },
  {
    id: 5,
    title: "Posture Correction Exercises",
    category: "Physiotherapy Tips",
    image: "/blog5.jpg",
    description:
      "Correct poor posture with targeted physiotherapy movements and daily habits.",
  },
  {
    id: 6,
    title: "Benefits of Pilates for Rehab",
    category: "Pilates Therapy",
    image: "/blog6.jpg",
    description:
      "Pilates-based physiotherapy exercises that improve flexibility and core strength.",
  },
];

const BlogPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white">

      {/* HERO */}

      <section className="pt-36 pb-24 px-6 lg:px-20 bg-gray-50 text-center">

        <p className="text-[#00C4CD] font-semibold mb-3">
          OUR BLOG
        </p>

        <h1 className="text-5xl font-semibold text-[#003A80] mb-6">
          Physiotherapy Insights & Health Tips
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Expert physiotherapy advice, rehabilitation tips,
          and wellness insights to help you move better and live pain-free.
        </p>

        {/* Search */}

        <div className="mt-10 max-w-xl mx-auto">

          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:border-[#003A80]"
          />

        </div>

      </section>


      {/* FEATURED BLOG */}

      <section className="py-20 px-6 lg:px-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <img
            src={blogs[0].image}
            alt="Featured Blog"
            className="rounded-2xl shadow-lg w-full h-[380px] object-cover"
          />

          <div>

            <p className="text-[#00C4CD] font-medium mb-2">
              Featured Article
            </p>

            <h2 className="text-3xl font-semibold text-[#003A80] mb-4">
              {blogs[0].title}
            </h2>

            <p className="text-gray-600 mb-6">
              {blogs[0].description}
            </p>

            <button className="text-[#003A80] font-medium">
              Read Article →
            </button>

          </div>

        </div>

      </section>


      {/* BLOG GRID */}

      <section className="pb-32 px-6 lg:px-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12">

          {filteredBlogs.map((blog) => (

            <div
              key={blog.id}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >

              <img
                src={blog.image}
                alt="blog"
                className="w-full h-[220px] object-cover"
              />

              <div className="p-6">

                <p className="text-sm text-[#00C4CD] mb-2">
                  {blog.category}
                </p>

                <h3 className="text-xl font-semibold text-[#003A80] mb-3">
                  {blog.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {blog.description}
                </p>

                <button className="text-[#003A80] font-medium">
                  Read More →
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* CTA */}

      <section className="py-24 bg-gray-50 text-center">

        <h2 className="text-4xl font-semibold text-[#003A80] mb-4">
          Need Professional Physiotherapy Advice?
        </h2>

        <p className="text-gray-600 mb-8">
          Book a consultation with our expert physiotherapists today.
        </p>

        <button
          onClick={() => navigate("/Book")}
          className="px-8 py-4 bg-[#003A80] text-white rounded-lg hover:bg-[#002c63] transition"
        >
          Book Consultation
        </button>

      </section>

    </div>
  );
};

export default BlogPage;