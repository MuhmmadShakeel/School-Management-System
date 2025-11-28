import React, { useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Anouncement = () => {
  const { language } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen  text-white py-12 px-6">
      {/* Heading */}
      <h1
        className="text-4xl md:text-5xl text-orange-600 font-extrabold text-center mb-12"
        data-aos="fade-down"
      >
        {language === "en" ? "Announcements Page" : " صفحة الإعلانات"}
      </h1>

      {/* Container */}
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Exam Announcement */}
        <div
          className="border-l-8 border-orange-600 pl-6 py-6 bg-[#243D91] rounded-r-2xl shadow-xl hover:-translate-y-2 transition-transform duration-1000 ease-in-out"
          data-aos="fade-right"
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-2">
            {language === "en" ? "Final Exam Schedule" : "جدول الامتحان النهائي"}
          </h2>
          <p className="text-lg leading-relaxed">
            {language === "en"
              ? "The final exams will begin on Monday, October 20th, 2025. Students are advised to check the timetable and prepare accordingly."
              : "ستبدأ الامتحانات النهائية يوم الاثنين، 20 أكتوبر 2025. يُنصح الطلاب بمراجعة الجدول الزمني والاستعداد وفقًا لذلك."}
          </p>
          <p className="text-sm text-orange-600 mt-3 italic">
            {language === "en"
              ? "Note: Bring your admit card and arrive 30 minutes early."
              : "ملاحظة: أحضر بطاقة الدخول الخاصة بك وتعال قبل 30 دقيقة."}
          </p>
        </div>

        {/* Papers Announcement */}
        <div
          className="border-r-8 border-orange-600 pr-6 py-6 bg-[#243D91] rounded-l-2xl shadow-xl text-right hover:-translate-y-2 transition-transform duration-1000 ease-in-out"
          data-aos="fade-left"
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-2">
            {language === "en" ? "Midterm Papers Released" : "إصدار أوراق منتصف الفصل"}
          </h2>
          <p className="text-lg leading-relaxed">
            {language === "en"
              ? "Midterm exam papers are now available in the portal. Students can log in to view their results and download the answer sheets."
              : "أوراق امتحانات منتصف الفصل متاحة الآن في البوابة. يمكن للطلاب تسجيل الدخول لعرض نتائجهم وتنزيل أوراق الإجابة."}
          </p>
          <p className="text-sm  mt-3 italic text-orange-600">
            {language === "en"
              ? "Contact the exam branch for any queries."
              : "اتصل بقسم الامتحانات في حالة وجود أي استفسارات."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Anouncement;
