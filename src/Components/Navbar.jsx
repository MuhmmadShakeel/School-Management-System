import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../Components/LanguageContext";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ Reusable NavItem
const NavItem = ({ to, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block text-white hover:bg-orange-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
  >
    {text}
  </Link>
);

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ Dropdown state
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current); // cancel hide
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 2000); // ⏱ stays open 2s after mouse leaves
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const translations = {
    en: {
      home: "Home",
      complaints: "Complaints",
      visitors: "Visitors",
      dashboard: "Dashboards",
      profile: "Profile",
      logout: "Logout",
      syllabus: "Syllabus",
      results: "Results",
      fee: "Fee Voucher",
      tutors: "Tutors",
      announcements: "Announcements",
    },
    ar: {
      home: "الرئيسية",
      complaints: "الشكاوى",
      visitors: "الزوار",
      dashboard: "لوحة التحكم",
      profile: "الملف الشخصي",
      logout: "تسجيل الخروج",
      syllabus: "المنهج الدراسي",
      results: "النتائج",
      fee: "قسيمة الرسوم",
      tutors: "المعلمون",
      announcements: "الإعلانات",
    },
  };

  const t = translations[language];
  const handleClose = () => setShowProfile(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-900 text-white shadow-lg sticky z-20 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <svg
                className="h-8 w-8 text-orange-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span className="text-xl font-bold">
                {language === "en" ? (
                  <>
                  <div>

            
                    <span to="/home" className="text-white">School</span>
           
                    <span className="text-orange-500">Pro</span>
      </div>
                  </>
                ) : (
                  <>
                  <div>

              
                    <span to="/home" className="text-white">نظام</span>

                    <span className="text-orange-500">المدرسة</span>

                        </div>
                  </>
                )}
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 items-center">
              <NavItem to="/home" text={t.home} />
              <NavItem to="/complain" text={t.complaints} />

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="bg-blue-800 hover:bg-blue-700 px-3  cursor-pointer py-2 text-orange-600 rounded-md text-sm font-medium transition duration-300"
              >
                {language === "en" ? "العربية" : "English"}
              </button>

              {/* Dashboard Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-white px-3 py-2 rounded-md text-sm cursor-pointer font-medium hover:bg-orange-500 transition duration-300">
                  {t.dashboard}
                </button>

                {isOpen && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg transition duration-500">
                    <li>
                      <Link
                        to="/teacher-dashboard"
                        className="block px-4 py-2 hover:bg-orange-100"
                      >
                        Teacher Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin-dashboard"
                        className="block px-4 py-2 hover:bg-orange-100"
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Profile Picture */}
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="profile"
                onClick={() => setShowProfile(true)}
                className="h-10 w-10 rounded-full cursor-pointer border-2 border-orange-500 hover:opacity-90 transition"
              />
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white focus:outline-none"
              >
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-blue-800 px-4 py-3 space-y-2">
            <NavItem
              to="/home"
              text={t.home}
              onClick={() => setMobileMenuOpen(false)}
            />
            <NavItem
              to="/complain"
              text={t.complaints}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Dashboard Links */}
            <div className="bg-blue-700 rounded-md">
              <Link
                to="/teacher-dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-white hover:bg-orange-500"
              >
                Teacher Dashboard
              </Link>
              <Link
                to="/admin-dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-white hover:bg-orange-500"
              >
                Admin Dashboard
              </Link>
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="block w-full text-left bg-blue-700 hover:bg-blue-600 px-3 py-2 text-orange-400 rounded-md text-sm font-medium transition duration-300"
            >
              {language === "en" ? "العربية" : "English"}
            </button>

            {/* Mobile Profile */}
            <button
              onClick={() => {
                setShowProfile(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 bg-orange-500 text-white rounded-md"
            >
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="profile"
                className="h-8 w-8 rounded-full border-2 border-white"
              />
              <span>{t.profile}</span>
            </button>
          </div>
        )}
      </nav>

      {/* Profile Sidebar */}
      {showProfile && (
        <div className="fixed inset-0 z-30 flex justify-end">
          <div
            className="absolute inset-0 bg-blue-900 opacity-70"
            onClick={handleClose}
          ></div>
          <div
            className="relative bg-white h-full w-80 sm:w-96 shadow-2xl p-6 flex flex-col justify-between"
            data-aos="fade-left"
          >
            {/* Logout */}
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-red-100 rounded-lg text-red-600 font-semibold hover:bg-red-200 transition"
              >
                {t.logout}
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col items-center space-y-2 mt-2">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="profile"
                className="h-20 w-20 rounded-full border-4 border-orange-500"
                data-aos="zoom-in"
              />
              <p className="text-lg font-semibold">Muhammad Shakeel</p>
              <p className="text-sm text-gray-500">(Student)</p>
              <button
                onClick={toggleLanguage}
                className="mt-1 bg-blue-100 hover:bg-blue-200 px-3 py-1 text-sm rounded-lg text-blue-900 transition"
              >
                {language === "en"
                  ? "Switch to Arabic"
                  : "التبديل إلى الإنجليزية"}
              </button>
            </div>

            {/* Buttons Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Link
                to="/complaints"
                onClick={handleClose}
                className="px-4 py-2 bg-orange-200 rounded-lg text-orange-900 font-medium hover:bg-orange-300 transition text-center"
              >
                {t.complaints}
              </Link>
              <Link
                to="/syllabus"
                onClick={handleClose}
                className="px-4 py-2 bg-blue-100 rounded-lg text-blue-900 font-medium hover:bg-blue-200 transition text-center"
              >
                {t.syllabus}
              </Link>
              <Link
                to="/results"
                onClick={handleClose}
                className="px-4 py-2 bg-orange-200 rounded-lg text-orange-900 font-medium hover:bg-orange-300 transition text-center"
              >
                {t.results}
              </Link>
              <Link
                to="/fee"
                onClick={handleClose}
                className="px-4 py-2 bg-blue-100 rounded-lg text-blue-900 font-medium hover:bg-blue-200 transition text-center"
              >
                {t.fee}
              </Link>
              <Link
                to="/tutors"
                onClick={handleClose}
                className="px-4 py-2 bg-orange-200 rounded-lg text-orange-900 font-medium hover:bg-orange-300 transition text-center"
              >
                {t.tutors}
              </Link>
              <Link
                to="/announcements"
                onClick={handleClose}
                className="px-4 py-2 bg-blue-100 rounded-lg text-blue-900 font-medium hover:bg-blue-200 transition text-center"
              >
                {t.announcements}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
