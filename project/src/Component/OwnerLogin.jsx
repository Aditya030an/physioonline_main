import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OwnerLogin = () => {
  const navigate = useNavigate();
  const [ownerKey, setOwnerKey] = useState("");

  const handleLogin = () => {
    if (!ownerKey.trim()) {
      alert("Please enter owner key");
      return;
    }

    localStorage.setItem("owner_key", ownerKey);
    navigate("/admin/blog-upload");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 pt-32">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-semibold text-[#003A80]">
          Owner Login
        </h1>

        <input
          type="password"
          placeholder="Enter owner secret key"
          value={ownerKey}
          onChange={(e) => setOwnerKey(e.target.value)}
          className="mb-4 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
        />

        <button
          onClick={handleLogin}
          className="w-full rounded-xl bg-[#003A80] px-6 py-3 font-medium text-white"
        >
          Login
        </button>
      </div>
    </main>
  );
};

export default OwnerLogin;