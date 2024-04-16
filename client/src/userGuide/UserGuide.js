import React, { useState } from "react";
import conference from "./conference.png";
import flow_chart from "./flowchart.png";
import Footer from "../components_student/Side/Footer";
import { useNavigate, Link } from "react-router-dom";
const UserGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-dark-purple text-white">
        <div className="container mx-auto py-4 px-2 md:flex md:justify-between md:items-center">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
              PhD CGM :: PhD Conference Grant Management Portal
            </Link>
            <button className="md:hidden" onClick={toggleNavbar}>
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className={`md:flex flex-col md:flex-row md:items-center ${
              isOpen ? "" : "hidden"
            } ${isOpen ? "mt-4" : ""}`}
          >
            <div className="flex flex-col md:flex-row md:space-x-2 mr-5">
              <Link
                to="/"
                className="block md:inline-block py-2 px-2 text-white hover:bg-button-hover-blue hover:text-teal-400"
              >
                Home
              </Link>
              <Link
                to="/meetTheTeam"
                className="block md:inline-block py-2 px-2 text-white hover:bg-button-hover-blue hover:text-teal-400"
              >
                Team
              </Link>
              <Link
                to="/userGuide"
                className="block md:inline-block py-2 px-2 text-white hover:bg-button-hover-blue hover:text-teal-400"
              >
                User Guide
              </Link>
              <Link
                to="/researchInfo"
                className="block md:inline-block py-2 px-2 text-white hover:bg-button-hover-blue hover:text-teal-400"
              >
                Research at IIT Ropar
              </Link>
              <Link
                to="/contactUs"
                className="block md:inline-block py-2 px-2 text-white hover:bg-button-hover-blue hover:text-teal-400"
              >
                Contact Us
              </Link>
            </div>
            <div className="mt-4 md:mt-0 ml-2 mr-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
                className="border px-5 py-2 rounded font-bold hover:bg-button-hover-blue hover:text-teal-400"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-white dark:bg-gray-900 px-8 mt-5">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-extrabold mb-4 text-gray-800 dark:text-white">
              PhD Grant Management Portal
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Welcome to the PhD Conference Grant Management Portal. This portal
              simplifies the process of managing conference grant applications.
            </p>
            <div className="flex space-x-3">
              <a
                href="/login"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-lg bg-dark-purple hover:text-teal-400 hover:bg-button-hover-blue transition duration-300"
              >
                Get Started
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-dark-purple border border-dark-purple rounded-lg hover:bg-blue-50 transition duration-300"
              >
                Watch Video
              </a>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <img
              src={conference}
              alt="Conference"
              className="w-full max-w-lg"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={flow_chart}
            alt="Conference"
            className="w-full max-w-lg"
            style={{ width: "100%", maxWidth: "1000px", maxHeight: "1700px" }}
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default UserGuide;
