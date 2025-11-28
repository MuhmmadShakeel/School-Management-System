import React, { useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import video1 from "../Components/Images/school.mp4";
import AOS from "aos";
import "aos/dist/aos.css";

function Header() {
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  // Translations
  const translations = {
    en: {
      title: "Online School System",
      subtitle:
        "Streamline operations, enhance communication, and transform education",
      features: [
        { text: "Digital Visitor Management", color: "#F54A00" },
        { text: "Complaint & Feedback System", color: "#0A1E5E" },
        { text: "Document Workflow Automation", color: "#F54A00" },
        { text: "Real-time Analytics & Reporting", color: "#0A1E5E" },
      ],
    },
    ar: {
      title: "النظام المدرسي الإلكتروني",
      subtitle: "تبسيط العمليات، وتعزيز التواصل، وتحويل التعليم",
      features: [
        { text: "إدارة الزوار الرقمية", color: "#F54A00" },
        { text: "نظام الشكاوى والتغذية الراجعة", color: "#0A1E5E" },
        { text: "أتمتة سير عمل المستندات", color: "#F54A00" },
        { text: "التحليلات وإعداد التقارير في الوقت الفعلي", color: "#0A1E5E" },
      ],
      cta: "ابدأ اليوم",
      toggle: "English",
    },
  };

  const t = translations[language];

  return (
    <div className="relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={video1} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-blue-900 opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 py-16 md:py-24 max-w-6xl mx-auto">
        {/* Language Toggle */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6"></div>

        {/* Main Content */}
        <div data-aos="fade-down" className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-5xl text-orange-500 lg:text-6xl font-extrabold mb-4 md:mb-5 bg-gradient-to-r from-white to-orange-300 bg-clip-text">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6 md:mb-8">
            {t.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 max-w-5xl mx-auto"
        >
          {t.features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-xl p-5 md:p-6 flex flex-col items-center text-center shadow-lg border transition-all duration-500 transform hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-orange-400/40 ${
                feature.color === "#F54A00"
                  ? "bg-[#F54A00] border-orange-400/30 hover:bg-orange-600/90"
                  : "bg-blue-900/80 border-blue-700/30 hover:bg-blue-800/90"
              }`}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="bg-white/20 h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-sm md:text-base font-semibold">
                {feature.text}
              </h3>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div data-aos="fade-up" data-aos-delay="400" className="mb-8 md:mb-10">
          {/* You can add a button here if needed */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg
            className="h-6 w-6 text-orange-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
export default Header;
