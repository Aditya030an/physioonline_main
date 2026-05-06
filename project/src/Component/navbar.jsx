import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "./photos/MRlogo1.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/Service" },
  { name: "About", path: "/About" },
  { name: "Blogs", path: "/Blogs" },
];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const hideNavbar = location.pathname.startsWith("/dashboard");

  if (hideNavbar) return null;

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <img src={logo} alt="Movement Rehab Logo" className="h-12 w-auto sm:h-14 lg:h-16" />
        </Link>

        <ul className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide text-gray-800 lg:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`transition hover:text-[#00C4CD] ${
                  location.pathname === link.path ? "text-[#00C4CD]" : "text-gray-800"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/Appointment"
              className="rounded-lg bg-[#003A80] px-5 py-3 text-white transition hover:bg-[#002a5e]"
            >
              Book Online
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg border p-2 text-[#003A80] lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t bg-white px-4 py-4 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wide transition hover:bg-cyan-50 hover:text-[#00C4CD] ${
                  location.pathname === link.path ? "bg-cyan-50 text-[#00C4CD]" : "text-gray-800"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/Appointment"
              onClick={closeMenu}
              className="mt-2 rounded-lg bg-[#003A80] px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#002a5e]"
            >
              Book Online
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
