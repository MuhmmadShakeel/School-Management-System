import React, { useState } from "react";
import { Calendar, CheckCircle, Clock, Eye, X } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const Results = () => {
  const { language } = useLanguage();
  const [selectedResult, setSelectedResult] = useState(null);

  const student = {
    name: { en: "Ahmed Ali", ar: "أحمد علي" },
    classes: [
      {
        className: { en: "Class 6", ar: "الصف السادس" },
        year: "2022",
        examDate: "2022-03-15",
        status: "Announced",
        percentage: "85%",
        resultImg:
          "https://thecityschoolnnbc.weebly.com/uploads/3/8/0/9/38098029/remedial-classes-time-table-2nd-term-002_orig.png",
      },
      {
        className: { en: "Class 7", ar: "الصف السابع" },
        year: "2023",
        examDate: "2023-03-20",
        status: "Announced",
        percentage: "88%",
        resultImg:
          "https://thecityschoolnnbc.weebly.com/uploads/3/8/0/9/38098029/remedial-class-schedual-8-001_orig.jpg",
      },
      {
        className: { en: "Class 8", ar: "الصف الثامن" },
        year: "2024",
        examDate: "2024-04-10",
        status: "Announced",
        percentage: "90%",
        resultImg:
          "https://thecityschoolnnbc.weebly.com/uploads/3/8/0/9/38098029/remedial-classes-time-table-2nd-term-002_orig.png",
      },
      {
        className: { en: "Class 9", ar: "الصف التاسع" },
        year: "2025",
        examDate: "2025-04-15",
        status: "Pending",
        percentage: null,
      },
      {
        className: { en: "Class 10", ar: "الصف العاشر" },
        year: "Upcoming",
        examDate: "Pending",
        status: "Pending",
        percentage: null,
      },
    ],
  };

  return (
    <div className="mt-16 mb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-orange-600">
        {language === "en"
          ? `Exam Results of ${student.name.en}`
          : `نتائج الامتحانات لـ ${student.name.ar}`}
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden bg-white shadow-lg rounded-2xl border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-[#1C398E] text-white">
            <tr>
              <th className="px-6 py-4 font-semibold">
                {language === "en" ? "Class" : "الصف"}
              </th>
              <th className="px-6 py-4 font-semibold">
                {language === "en" ? "Year" : "السنة"}
              </th>
              <th className="px-6 py-4 font-semibold">
                {language === "en" ? "Exam Date" : "تاريخ الامتحان"}
              </th>
              <th className="px-6 py-4 font-semibold">
                {language === "en" ? "Status & %" : "الحالة و النسبة"}
              </th>
              <th className="px-6 py-4 font-semibold text-center">
                {language === "en" ? "Result" : "النتيجة"}
              </th>
            </tr>
          </thead>

          <tbody>
            {student.classes.map((cls, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 font-semibold text-[#1C398E]">
                  {cls.className[language]}
                </td>
                <td className="px-6 py-4">{cls.year}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Calendar size={16} className="text-[#F54A00]" />
                  {cls.examDate}
                </td>

                {/* Status + Percentage */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {cls.status === "Announced" ? (
                      <CheckCircle className="text-blue-700" size={18} />
                    ) : (
                      <Clock className="text-orange-600" size={18} />
                    )}
                    <span
                      className={
                        cls.status === "Announced"
                          ? "text-blue-700 font-semibold"
                          : "text-orange-600 font-semibold"
                      }
                    >
                      {language === "en"
                        ? cls.status
                        : cls.status === "Announced"
                        ? "تم الإعلان"
                        : "قيد الانتظار"}
                    </span>
                  </div>
                  {cls.percentage && (
                    <p className="text-gray-600 text-sm mt-1">
                       {cls.percentage}
                    </p>
                  )}
                </td>

                {/* View Button */}
                <td className="px-6 py-4 text-center">
                  {cls.status === "Announced" ? (
                    <button
                      onClick={() => setSelectedResult(cls)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-orange-600 text-white font-semibold shadow hover:bg-orange-700 transition"
                    >
                      <Eye size={18} />
                      <span>{language === "en" ? "View" : "عرض"}</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold cursor-not-allowed"
                    >
                      {language === "en" ? "Coming Soon" : "قريباً"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-6 md:hidden">
        {student.classes.map((cls, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-2xl border border-gray-200 p-5"
          >
            <h2 className="text-lg font-bold text-[#1C398E] mb-2">
              {cls.className[language]} ({cls.year})
            </h2>
            <p className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} className="text-[#F54A00]" />
              {cls.examDate}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {cls.status === "Announced" ? (
                <CheckCircle className="text-blue-700" size={18} />
              ) : (
                <Clock className="text-orange-600" size={18} />
              )}
              <span
                className={
                  cls.status === "Announced"
                    ? "text-blue-700 font-semibold"
                    : "text-orange-600 font-semibold"
                }
              >
                {language === "en"
                  ? cls.status
                  : cls.status === "Announced"
                  ? "تم الإعلان"
                  : "قيد الانتظار"}
              </span>
            </div>
            {cls.percentage && (
              <p className="text-gray-600 text-sm mt-1">
                🎯 {cls.percentage}
              </p>
            )}

            <div className="mt-4">
              {cls.status === "Announced" ? (
                <button
                  onClick={() => setSelectedResult(cls)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold shadow hover:bg-orange-700 transition"
                >
                  <Eye size={18} />
                  <span>{language === "en" ? "View Result" : "عرض النتيجة"}</span>
                </button>
              ) : (
                <button
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold cursor-not-allowed"
                >
                  {language === "en" ? "Coming Soon" : "قريباً"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedResult && (
        <div className="fixed inset-0 top-16 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-[#1C398E]">
                {selectedResult.className[language]} - {selectedResult.year}
              </h2>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-gray-500 hover:text-orange-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 flex justify-center">
              <img
                src={selectedResult.resultImg}
                alt="Result Document"
                className="rounded-xl shadow-lg w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
