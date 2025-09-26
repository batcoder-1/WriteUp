import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import LogoutButton from "./Logoutbtn";
import Container from "./Container";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.Auth.status);

  const navItems = [
    { name: "Home", url: "/", active: true },
    { name: "About", url: "/about", active: true },
    { name: "My Blogs", url: "/my-blogs", active: authStatus },
    { name: "Login", url: "/login", active: !authStatus },
    { name: "Signup", url: "/signup", active: !authStatus },
    { name: "All Posts", url: "/all-posts", active: authStatus },
    { name: "Add Post", url: "/add-post", active: authStatus },
    { name: "Account", url: "/account", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo + Nav Links */}
          <div className="flex items-center gap-10">
            <Link to="/">
              <Logo />
            </Link>

            {/* Navigation */}
            <ul className="hidden md:flex space-x-6">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <Link
                        to={item.url}
                        className="text-gray-700 font-medium hover:text-indigo-600 hover:underline underline-offset-4 transition"
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </div>

          {/* Right Side - Auth Buttons */}
          <div>
            {authStatus ? (
              <LogoutButton />
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
