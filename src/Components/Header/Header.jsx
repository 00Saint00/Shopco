import React from "react";
import { useState } from "react";
import logo from "../../assets/logo/SHOP.CO.svg";
import cart from "../../assets/logo/cart.svg";
import userIcon from "../../assets/logo/User.svg";
import { Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="flex justify-between items-center lg:px-[100px] lg:py-[24px] px-[16px] py-[12px]">
      <div className="flex justify-between items-center w-full">
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
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Women
                            </a>
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
          <img src={cart} alt="Logo" className="h-[24px] w-[24px]" />

          {/* <span className="sm:mr-4 mr-2">
            <i className="fas fa-shopping-cart"></i> Cart
          </span> */}
          {/* <span>Login</span> */}
          <img src={userIcon} alt="Logo" className="h-[24px] w-[24px]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
