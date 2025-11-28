import React, { useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import AOS from "aos";
import "aos/dist/aos.css";

const tutorsData = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg",
    subject: { en: "Mathematics", ar: "الرياضيات" },
    name: { en: "Dr. Ali Khan", ar: "د. علي خان" },
    desc: {
      en: "Expert in Algebra, Calculus and Geometry.",
      ar: "خبير في الجبر وحساب التفاضل والهندسة.",
    },
    time: { en: "Lecture: Mon & Wed, 10:00 AM", ar: "المحاضرة: الاثنين والأربعاء، 10:00 صباحاً" },
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/5212334/pexels-photo-5212334.jpeg",
    subject: { en: "Physics", ar: "الفيزياء" },
    name: { en: "Prof. Sara Ahmed", ar: "الأستاذة سارة أحمد" },
    desc: {
      en: "Specialist in Mechanics and Thermodynamics.",
      ar: "متخصصة في الميكانيكا والديناميكا الحرارية.",
    },
    time: { en: "Lecture: Tue & Thu, 2:00 PM", ar: "المحاضرة: الثلاثاء والخميس، 2:00 مساءً" },
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg",
    subject: { en: "Chemistry", ar: "الكيمياء" },
    name: { en: "Dr. Imran Malik", ar: "د. عمران مالك" },
    desc: {
      en: "Focused on Organic and Inorganic Chemistry.",
      ar: "متخصص في الكيمياء العضوية وغير العضوية.",
    },
    time: { en: "Lecture: Fri, 11:00 AM", ar: "المحاضرة: الجمعة، 11:00 صباحاً" },
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg",
    subject: { en: "Biology", ar: "الأحياء" },
    name: { en: "Ms. Fatima Noor", ar: "الأستاذة فاطمة نور" },
    desc: {
      en: "Teaches Human Anatomy and Genetics.",
      ar: "تدرس علم التشريح البشري وعلم الوراثة.",
    },
    time: { en: "Lecture: Sat, 9:00 AM", ar: "المحاضرة: السبت، 9:00 صباحاً" },
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
    subject: { en: "Computer Science", ar: "علوم الكمبيوتر" },
    name: { en: "Engr. Ahmed Raza", ar: "المهندس أحمد رضا" },
    desc: {
      en: "Expert in Programming and Data Structures.",
      ar: "خبير في البرمجة وهياكل البيانات.",
    },
    time: { en: "Lecture: Sun, 3:00 PM", ar: "المحاضرة: الأحد، 3:00 مساءً" },
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg",
    subject: { en: "English", ar: "اللغة الإنجليزية" },
    name: { en: "Mr. John Smith", ar: "السيد جون سميث" },
    desc: {
      en: "Teaches Grammar, Vocabulary and Speaking Skills.",
      ar: "يدرس القواعد والمفردات ومهارات التحدث.",
    },
    time: { en: "Lecture: Mon & Fri, 5:00 PM", ar: "المحاضرة: الاثنين والجمعة، 5:00 مساءً" },
  },
];

const Tutors = () => {
  const { language } = useLanguage();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      className="min-h-screen py-12 px-6 flex flex-col items-center"
    >
      <h1
        className="text-3xl md:text-4xl font-extrabold text-center text-[#1C398E] mb-12 tracking-wide"
        data-aos="fade-down"
      >
        {language === "en" ? "Tutors Assigned to You" : "المعلمون المعينون لك"}
      </h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {tutorsData.map((tutor) => (
          <div
            key={tutor.id}
            className="w-80 bg-gradient-to-b from-orange-500 to-orange-600 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:scale-105 transition duration-500 transform"
            data-aos="zoom-in"
          >
            <img
              src={tutor.img}
              alt={tutor.name[language]}
              className="w-full h-48 object-cover rounded-t-3xl"
            />
            <div className="p-6 text-white flex flex-col justify-between h-56">
              <div>
                <h2 className="text-xl font-bold mb-1 text-[#1C398E]">{tutor.subject[language]}</h2>
                <h3 className="text-lg font-semibold mb-2 opacity-90">
                  {tutor.name[language]}
                </h3>
                <p className="text-sm opacity-80">{tutor.desc[language]}</p>
              </div>
              <p className="text-xs font-semibold mt-4 border-t border-white/30 pt-2 text-[#1C398E]">
                {tutor.time[language]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutors;
