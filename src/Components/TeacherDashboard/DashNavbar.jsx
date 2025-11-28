import React from "react";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useLanguage } from "../LanguageContext"; // ✅ Import context

const DashNavbar = () => {
  const { language } = useLanguage(); // ✅ Get current language
  const profilePic = "https://i.pravatar.cc/40?img=12"; // dummy profile pic

  // ✅ Text translations
  const t = {
    en: {
      dashboard: "Dashboard",
      teacher: "Allah Nawaz",
      logout: "Logout",
    },
    ar: {
      dashboard: "لوحة التحكم",
      teacher: "المعلم",
      logout: "تسجيل خروج",
    },
  };

  return (
    <header
      className="
        sticky top-0 z-30 
        bg-white shadow 
        flex justify-between items-center 
        px-4 sm:px-6 py-2 
        md:ml-64   /* ✅ Only apply sidebar space on medium+ screens */
      "
    >
      {/* Left Section: Dashboard Label */}
      <div className="flex items-center space-x-2">
        <LayoutDashboard className="text-blue-600" size={20} />
        <span className="font-bold text-lg sm:text-xl text-orange-600 truncate">
          {t[language].dashboard}
        </span>
      </div>

      {/* Right Section: Profile & Logout */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Profile */}
        <div className="flex items-center space-x-2">
          <img
            src={profilePic}
            alt="Profile"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-blue-600 shadow"
          />
          {/* Hide teacher name on very small screens */}
          <span className="hidden sm:inline font-medium text-gray-700 text-sm sm:text-base truncate">
            {t[language].teacher}
          </span>
        </div>

        {/* Logout */}
        <button
          className="
            flex items-center space-x-1 sm:space-x-2 
            px-2 sm:px-4 py-1.5 
            bg-orange-600 text-white text-xs sm:text-sm md:text-base 
            rounded-md hover:bg-orange-700 transition
          "
        >
          <LogOut size={16} />
          <span className="cursor-pointer">{t[language].logout}</span>
        </button>
      </div>
    </header>
  );
};

export default DashNavbar;
