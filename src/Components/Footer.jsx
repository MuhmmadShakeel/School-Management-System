import React from "react";
import { useLanguage } from "../Components/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      complaints: "Complaints",
    },
    ar: {
      complaints: "الشكاوى",
    },
  };

  const t = translations[language];

  return (
    <footer className="bg-blue-900 text-white shadow-inner lg:h-[200px]">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        {/* ---- Logo ---- */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="relative">
            <svg
              className="h-8 w-8 text-orange-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-orange-500 border border-blue-900"></div>
          </div>
          <span className="text-xl font-bold">
            {language === "en" ? (
              <>
                <span className="text-white">School</span>
                <span className="text-orange-500">Pro</span>
              </>
            ) : (
              <>
                <span className="text-white">نظام</span>
                <span className="text-orange-500">المدرسة</span>
              </>
            )}
          </span>
        </div>

        {/* ---- Complaints ---- */}
        <div>
          <a
            href="#"
            className="text-white hover:text-orange-500 font-medium transition duration-300"
          >
            {t.complaints}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-blue-800 text-center py-3 text-sm text-gray-300">
        © {new Date().getFullYear()} SchoolPro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
