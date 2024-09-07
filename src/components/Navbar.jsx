import { HiMiniBars3BottomRight } from "react-icons/hi2";
import Button from "./ui/Button";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function Navbar({ isFormOpen, setIsFormOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-[#F2F7FF] bg-opacity-80 p-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        <a href="/">
          <img
            className="h-[50px] object-contain sm:w-[146px]"
            src="https://www.itcdistributorships.in/images/logo.png"
            alt="Logo"
          />
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          <li>
            <a
              className="text-primary-start hover:text-primary-start hover:opacity-100"
              href="#"
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="text-para opacity-80 hover:text-primary-start hover:opacity-100"
              href="#about"
            >
              About
            </a>
          </li>
          <li>
            <a
              className="text-para opacity-80 hover:text-primary-start hover:opacity-100"
              href="#brand"
            >
              Itc Brand
            </a>
          </li>
          <li>
            <a
              className="text-para opacity-80 hover:text-primary-start hover:opacity-100"
              href="#contact"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              className="text-para opacity-80 hover:text-primary-start hover:opacity-100"
              href="/check-status"
            >
              Check Status
            </a>
          </li>
        </ul>
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="hidden md:flex"
        />
        {/* Mobile Screen */}
        <div className="relative md:hidden">
          {isOpen ? (
            <div className="flex items-center gap-x-20">
              <img
                onClick={() => setIsFormOpen(!isFormOpen)}
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnl6MGQwcXUxN2V4MjVjN3c1aGxzZTFpeTlyaXR0ZGgxa2NrNDUxYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/i8cYLHptr8q1nwyvyp/giphy.webp"
                alt=""
                className="h-[50px] w-[200px]"
                srcset=""
              />

              <IoMdClose
                onClick={() => setIsOpen(false)}
                className="size-7 cursor-pointer text-primary-end"
              />
            </div>
          ) : (
            <div className="flex items-center gap-x-20">
              <a
                className=" p-1   rounded bg-indigo-600 text-center  text-[19px] ml-4 text-white opacity-80 hover:text-primary-start hover:opacity-100"
                href="/check-status"
              >
                Check Status
              </a>
              
              <HiMiniBars3BottomRight
                onClick={() => setIsOpen(true)}
                className="size-7 cursor-pointer text-primary-end"
              />
            </div>
          )}
          {isOpen && (
            <div className="absolute right-2 top-8 min-w-[220px] rounded-2xl border bg-white p-4 shadow-lg">
              <ul className="mb-8 flex flex-col items-center gap-6">
                <li>
                  <a
                    className="text-primary-start hover:text-primary-start hover:opacity-100"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-para opacity-80 hover:text-primary-start hover:opacity-100"
                    href="#about"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    className="text-para opacity-80 hover:text-primary-start hover:opacity-100"
                    href="#brand"
                  >
                    Itc Brand
                  </a>
                </li>
                <li>
                  <a
                    className="text-para opacity-80 hover:text-primary-start hover:opacity-100"
                    href="#contact"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    className="text-para opacity-80 hover:text-primary-start hover:opacity-100"
                    href="/check-status"
                  >
                    Check Status
                  </a>
                </li>
              </ul>
              <Button
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
