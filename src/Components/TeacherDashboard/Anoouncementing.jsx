// Anoouncementing.jsx
import React from "react";
import { Calendar, BookOpen, Plane } from "lucide-react";
import { useLanguage } from "../LanguageContext"; // ✅ import context

const Anoouncementing = () => {
  const { language } = useLanguage(); // ✅ get current language

  // ✅ Translations
  const translations = {
    en: {
      header: "Latest Announcements",
      posted: "Posted Recently",
      announcements: [
        {
          id: 1,
          title: "Upcoming Exams",
          description:
            "Mid-term exams will start from October 15th, 2025. Please check the syllabus and exam schedule.",
          icon: <BookOpen className="w-10 h-10 text-orange-600" />,
        },
        {
          id: 2,
          title: "Winter Vacation",
          description:
            "Winter vacations will begin from December 20th, 2025 and classes will resume on January 5th, 2026.",
          icon: <Plane className="w-10 h-10 text-orange-600" />,
        },
      ],
    },
    ar: {
      header: "أحدث الإعلانات",
      posted: "تم النشر مؤخراً",
      announcements: [
        {
          id: 1,
          title: "الامتحانات القادمة",
          description:
            "ستبدأ امتحانات منتصف الفصل في 15 أكتوبر 2025. يرجى مراجعة المنهج وجدول الامتحانات.",
          icon: <BookOpen className="w-10 h-10 text-orange-600" />,
        },
        {
          id: 2,
          title: "العطلة الشتوية",
          description:
            "ستبدأ العطلة الشتوية من 20 ديسمبر 2025 وستستأنف الفصول الدراسية في 5 يناير 2026.",
          icon: <Plane className="w-10 h-10 text-orange-600" />,
        },
      ],
    },
  };

  const t = translations[language]; // ✅ choose language

  return (
    <div
      className="min-h-screen bg-gradient-to-br lg:ml-62 flex flex-col items-center justify-center p-6"
      dir={language === "ar" ? "rtl" : "ltr"} // ✅ switch text direction
    >
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#1C398E] mb-8">
        {t.header}
      </h1>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 w-full max-w-5xl">
        {t.announcements.map((item) => (
          <div
            key={item.id}
            className="bg-[#1C398E] text-orange-600 shadow-xl rounded-2xl p-6 flex flex-col items-start hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-800 p-3 rounded-full">{item.icon}</div>
              <h2 className="text-xl font-semibold">{item.title}</h2>
            </div>
            <p className="text-base leading-relaxed">{item.description}</p>
            <div className="flex items-center mt-4 text-sm font-medium text-orange-500">
              <Calendar className="w-4 h-4 mr-2" />
              {t.posted}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Anoouncementing;
