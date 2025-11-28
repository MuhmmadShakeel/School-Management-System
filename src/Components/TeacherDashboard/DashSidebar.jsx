import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  BookOpen,
  FileText,
  Users,
  ClipboardList,
  Menu,
  X,
  Globe,
  Megaphone, // ✅ replaced TfiAnnouncement
} from "lucide-react";
import { useLanguage } from "../LanguageContext"; // ✅ Import language context

const DashSidebar = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Texts in both languages
  const t = {
    en: {
      dashboard: "Dashboard",
      syllabus: "Syllabus",
      results: "Results",
      complaints: "Complaints",
      students: "Students",
      announcement: "Announcement",
      teacherPanel: "Teacher",
      panel: "Panel",
      language: "عربي", // show Arabic button text when in English
    },
    ar: {
      dashboard: "لوحة التحكم",
      syllabus: "المنهج",
      results: "النتائج",
      complaints: "الشكاوى",
      students: "الطلاب",
      announcement: "إعلان",
      teacherPanel: "لوحة",
      panel: "المعلم",
      language: "العربية",
    },
  };

  const text = t[language];

  // ✅ Navigation items in a single array
  const navItems = [
    { to: "/teacher-dashboard/dashboard", icon: Home, label: text.dashboard },
    { to: "/teacher-dashboard/syllabus", icon: BookOpen, label: text.syllabus },
    { to: "/teacher-dashboard/results", icon: FileText, label: text.results },
    { to: "/teacher-dashboard/complain1", icon: ClipboardList, label: text.complaints },
    { to: "/teacher-dashboard/student", icon: Users, label: text.students },
    { to: "/teacher-dashboard/announcement", icon: Megaphone, label: text.announcement },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-0 left-0 z-50 bg-blue-900 text-white p-2 rounded-md shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-blue-900 text-white flex flex-col shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center space-x-2 border-b border-blue-700">
          <svg
            className="h-8 w-8 text-orange-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          <span className="text-xl font-bold">
            {text.teacherPanel}
            <span className="text-orange-500">{text.panel}</span>
          </span>
        </div>

        {/* Navigation Links - generated in a loop */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Language Toggle Button */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={toggleLanguage}
            className="w-full flex items-center justify-center space-x-3 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-600 hover:to-orange-700 cursor-pointer rounded-[30px] shadow-lg text-white font-semibold transition transform hover:scale-105"
          >
            <Globe size={20} />
            <span>{text.language}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashSidebar;
