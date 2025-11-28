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
  Megaphone,
} from "lucide-react";
import { useLanguage } from "../LanguageContext"; 
import { useTranslation } from "react-i18next"; // ✅ i18n hook

const AdminDashssidebar = () => {
  const { language, toggleLanguage } = useLanguage();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // texts
  const t = {
    en: {
      dashboard: "Dashboard",
      syllabus: "Syllabus",
      results: "Results",
      complaints: "Complaints",
      students: "Students",
      teacher: "Teacher",
      announcement: "Announcement",
      teacherPanel: "Teacher",
      panel: "Panel",
      language: "عربي",
    },
    ar: {
      dashboard: "لوحة التحكم",
      syllabus: "المنهج",
      results: "النتائج",
      complaints: "الشكاوى",
      students: "الطلاب",
      teacher: "معلم",
      announcement: "إعلان",
      teacherPanel: "لوحة",
      panel: "المعلم",
      language: "EN",
    },
  };

  const text = t[language];

  // ✅ New language handler
  const handleLanguageChange = () => {
    const newLang = language === "en" ? "ar" : "en";
    toggleLanguage(); // updates context (your old state)
    i18n.changeLanguage(newLang); // updates i18n translations
  };

  const navItems = [
    { to: "/admin-dashboard/dashboard", icon: Home, label: text.dashboard },
    { to: "/admin-dashboard/syllabus2", icon: BookOpen, label: text.syllabus },
    { to: "/admin-dashboard/results2", icon: FileText, label: text.results },
    { to: "/admin-dashboard/complaint2", icon: ClipboardList, label: text.complaints },
    { to: "/admin-dashboard/AdminTeacher", icon: ClipboardList, label: text.teacher },
    { to: "/admin-dashboard/student", icon: Users, label: text.students },
    { to: "/admin-dashboard/announcement", icon: Megaphone, label: text.announcement },
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

        {/* Nav Links */}
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
            onClick={handleLanguageChange}
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

export default AdminDashssidebar;
