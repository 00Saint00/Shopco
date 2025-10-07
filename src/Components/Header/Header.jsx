import React from "react";
import { useState, useEffect } from "react";
import logo from "../../assets/logo/SHOP.CO.svg";
import cart from "../../assets/logo/cart.svg";
import userIcon from "../../assets/logo/User.svg";
import { Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { Button } from "@headlessui/react";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [user, setUser] = useState();

  // useEffect(() => {
  //   // Load user from localStorage
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser(); // run on mount

    // listen for custom login/register updates
    window.addEventListener("storageUpdate", loadUser);

    return () => {
      window.removeEventListener("storageUpdate", loadUser);
    };
  }, []);

  return (
    <header className="flex justify-between items-center lg:px-[100px]  px-[16px] ">
      <div className="flex justify-between items-center w-full lg:py-[24px] py-[12px] border-b border-black border-opacity-10">
        <div className="sm:hidden flex items-center">
          <button onClick={() => setNavOpen(!navOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[24px] w-[24px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-[40px]">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-[22px] w-[160px]"
              loading="eager"
            />
          </Link>
          <nav
            className={`${
              navOpen ? "block" : "hidden"
            } sm:block w-full sm:w-auto bg-red-500 sm:bg-transparent py-[13px]`}
          >
            <ul className="flex flex-col sm:flex-row items-center list-none gap-[24px]">
              <Menu as="li" className="relative">
                {({ open }) => (
                  <>
                    <Menu.Button className="flex items-center gap-2">
                      <span>Shop</span>
                      {open ? (
                        <ChevronUpIcon className="h-[16px] w-[16px] fill-current text-black transition duration-400 ease-in-out" />
                      ) : (
                        <ChevronDownIcon className="h-[16px] w-[16px] fill-current text-black transition duration-400 ease-in-out" />
                      )}
                    </Menu.Button>
                    {open && (
                      <Menu.Items className="absolute bg-white shadow-md py-2 min-w-[400px]">
                        <div className="grid grid-cols-2 gap-2">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/category/men"
                                className={`block px-4 py-2 ${
                                  active ? "bg-gray-100" : ""
                                }`}
                              >
                                Men
                              </Link>
                            )}
                            {/* <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Men
                            </a> */}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/category/women"
                                className={`block px-4 py-2 ${
                                  active ? "bg-gray-100" : ""
                                }`}
                              >
                                Women
                              </Link>
                            )}
                            {/* <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Women
                            </a> */}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    )}
                  </>
                )}
              </Menu>
              <li className="">On sale</li>
              <li className="">New Arrival</li>
              <li className="">Brands</li>
            </ul>
          </nav>
        </div>
        <div className="hidden lg:flex items-center border-0 rounded-[62px] px-[16px] py-[12px] bg-[#f0f0f0] w-[577px] h-[48px]">
          <MagnifyingGlassIcon className="h-[24px] w-[24px] text-gray-400" />
          <input
            type="text"
            placeholder="Search for products..."
            className="px-4 py-2 flex-1 focus:outline-none bg-transparent"
          />
        </div>
        <MagnifyingGlassIcon className="h-[24px] w-[24px] text-black lg:hidden" />

        <div className="flex items-center gap-[14px]">
          <Link to="/cart">
            <img src={cart} alt="Logo" className="h-[24px] w-[24px]" />
          </Link>

          {/* <span className="sm:mr-4 mr-2">
            <i className="fas fa-shopping-cart"></i> Cart
          </span> */}
          {/* <span>Login</span> */}

          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center gap-2 focus:outline-none">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-[32px] w-[32px] rounded-full"
                />
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                <div className="px-3 py-2 border-b">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`${
                        active ? "bg-gray-100" : ""
                      } flex items-center w-full px-4 py-2 text-sm text-gray-800`}
                    >
                      <UserIcon className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                  )}
                </Menu.Item>

                {user.role === "admin" ? (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/dashboard"
                        className={`${
                          active ? "bg-gray-100" : ""
                        } flex items-center w-full px-4 py-2 text-sm text-gray-800`}
                      >
                        <ClipboardDocumentCheckIcon className="h-4 w-4 mr-2" />
                        DashBoard
                      </Link>
                    )}
                  </Menu.Item>
                ) : null}

                <Menu.Item>
                  {({ active }) => (
                    <Button
                      onClick={() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");

                        // 🔔 Tell the app about it
                        window.dispatchEvent(new Event("storageUpdate"));
                      }}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } flex items-center w-full px-4 py-2 text-sm text-red-600`}
                    >
                      <ArrowLeftStartOnRectangleIcon className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link to="/login" className="sm:mr-4 mr-2">
              <img src={userIcon} alt="Logo" className="h-[24px] w-[24px]" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
