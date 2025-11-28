import React, { useState } from "react";
import { Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const books = [
  {
    title: { en: "Computer Science Fundamentals", ar: "أساسيات علوم الحاسوب" },
    desc: {
      en: "Introduction to algorithms, data structures, and programming concepts.",
      ar: "مقدمة في الخوارزميات وهياكل البيانات ومفاهيم البرمجة.",
    },
    img: "https://templatelab.com/wp-content/uploads/2019/06/sylabus-template-16.jpg",
  },
  {
    title: { en: "Advanced Mathematics", ar: "الرياضيات المتقدمة" },
    desc: {
      en: "Covers calculus, linear algebra, and differential equations.",
      ar: "يغطي التفاضل والتكامل، الجبر الخطي والمعادلات التفاضلية.",
    },
    img: "https://img.yumpu.com/34479621/1/500x640/course-outline-1-description-2-objectives-3-lectures-labs-tutorials.jpg",
  },
  {
    title: { en: "Modern Physics", ar: "الفيزياء الحديثة" },
    desc: {
      en: "Exploring quantum mechanics, relativity, and atomic structure.",
      ar: "استكشاف ميكانيكا الكم والنسبية وبنية الذرة.",
    },
    img: "https://img.yumpu.com/52739807/1/500x640/course-outline.jpg",
  },
  {
    title: { en: "Chemistry Essentials", ar: "أساسيات الكيمياء" },
    desc: {
      en: "Organic, inorganic, and physical chemistry concepts for higher studies.",
      ar: "مفاهيم الكيمياء العضوية وغير العضوية والفيزيائية للدراسات العليا.",
    },
    img: "https://templatelab.com/wp-content/uploads/2019/06/sylabus-template-47.jpg",
  },
  {
    title: { en: "English Literature", ar: "الأدب الإنجليزي" },
    desc: {
      en: "Exploring prose, poetry, and drama with critical analysis.",
      ar: "استكشاف النثر والشعر والمسرح مع التحليل النقدي.",
    },
    img: "https://marketplace.canva.com/EAGLvyDoWzw/2/0/1237w/canva-term-planner-doc-rC-bdlZNUts.jpg",
  },
  {
    title: { en: "History & Civilization", ar: "التاريخ والحضارة" },
    desc: {
      en: "Understanding ancient to modern world history and cultures.",
      ar: "فهم تاريخ العالم من العصور القديمة إلى الحديثة والثقافات.",
    },
    img: "https://templatelab.com/wp-content/uploads/2019/06/sylabus-template-48.jpg",
  },
];

const Slybus = () => {
  const { language } = useLanguage();
  const [selectedImg, setSelectedImg] = useState(null);
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title[language].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
      <h1 className="text-3xl font-bold text-[#1C398E] mb-6 text-center">
        {language === "en" ? "Course Syllabus" : "المناهج الدراسية"}
      </h1>

      <input
        type="text"
        placeholder={language === "en" ? "Search syllabus..." : "ابحث في المناهج..."}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-10 px-4 py-2 w-72 h-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-[#1C398E] mb-2">
                  {book.title[language]}
                </h2>
                <p className="text-gray-600 mb-4">{book.desc[language]}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-orange-600 font-medium">
                  {language === "en"
                    ? "View Syllabus Outline"
                    : "عرض تفاصيل المنهج"}
                </span>
                <button
                  onClick={() => setSelectedImg(book.img)}
                  className="p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition"
                >
                  <Eye className="text-[#1C398E] cursor-pointer w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            {language === "en" ? "No syllabus found." : "لم يتم العثور على منهج."}
          </p>
        )}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 bg-[#1C398E] bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-lg overflow-hidden shadow-2xl max-w-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <img
                src={selectedImg}
                alt="Syllabus"
                className="w-full max-h-[500px] object-contain"
              />
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-3 right-3 bg-[#1C398E] text-white p-2 rounded-full hover:bg-red-500 transition"
              >
                <X className="w-5 h-5 font-bold" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Slybus;
