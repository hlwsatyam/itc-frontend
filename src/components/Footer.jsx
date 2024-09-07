// Footer.js
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* About Section */}
          <div className="mb-6 w-full md:mb-0 md:w-1/4">
            <h5 className="mb-4 text-2xl font-semibold">About Us</h5>
            <p className="mb-4 text-sm leading-relaxed">
              We are dedicated to excellence, offering top-tier products and
              services. Our goal is to exceed expectations and build lasting
              relationships.
            </p>
            {/* <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-blue-500"
              >
                <FaFacebookF className="text-lg" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-blue-400"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-blue-700"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-pink-500"
              >
                <FaInstagram className="text-lg" />
              </a>
            </div> */}
          </div>

          {/* Quick Links Section */}
          <div className="mb-6 w-full md:mb-0 md:w-1/4">
            <h5 className="mb-4 text-2xl font-semibold">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="transition-colors hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="transition-colors hover:text-gray-400"
                >
                  about
                </a>
              </li>
              <li>
                <a
                  href="#brand"
                  className="transition-colors hover:text-gray-400"
                >
                  Brand
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="transition-colors hover:text-gray-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="mb-6 w-full md:mb-0 md:w-1/4">
            <h5 className="mb-4 text-2xl font-semibold">Contact Us</h5>
            <p className="text-sm leading-relaxed">
              <a
                href="mailto:"
                className="transition-colors hover:text-gray-400"
              >
                <IoLocation className="inline" /> Virginia House, 37, J.L. Nehru
                Road Kolkata - 700071, India
              </a>
              <br />
              <a
                href="mailto:contactus@itcportals.com"
                className="transition-colors hover:text-gray-400"
              >
                <FaEnvelope className="inline" /> contactus@itcportals.com
              </a>{" "}
              <br />
            </p>
          </div>

          {/* Newsletter Signup Section */}
          {/* <div className="w-full md:w-1/4">
            <h5 className="mb-4 text-2xl font-semibold">Newsletter</h5>
            <p className="mb-4 text-sm leading-relaxed">
              Subscribe to receive updates and special offers. Stay informed and
              connected!
            </p>
            <form className="flex flex-col md:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="mb-3 rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:ring-2 focus:ring-blue-500 md:mb-0 md:mr-2"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div> */}
        </div>
      </div>

      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} itc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
