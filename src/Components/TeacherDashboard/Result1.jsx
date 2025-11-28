import React, { useState } from "react";
import {
  Upload,
  Eye,
  X,
  Download,
  CheckCircle,
  Users,
  BookOpen,
  School,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";
import Ressultgaph from "./Ressultgaph";

// ✅ Data in Single Array
const initialData = [
  {
    class: "6th",
    students: 40,
    syllabus: { en: "English", ar: "الإنجليزية" },
    conductedDate: "2024-03-10",
    resultDate: "2024-03-15",
    uploaded: false,
    file: null,
  },
  {
    class: "7th",
    students: 50,
    syllabus: { en: "English", ar: "الإنجليزية" },
    conductedDate: "2024-03-12",
    resultDate: "2024-03-16",
    uploaded: false,
    file: null,
  },
  {
    class: "8th",
    students: 55,
    syllabus: { en: "English", ar: "الإنجليزية" },
    conductedDate: "2024-03-13",
    resultDate: "2024-03-17",
    uploaded: false,
    file: null,
  },
  {
    class: "9th",
    students: 55,
    syllabus: { en: "English", ar: "الإنجليزية" },
    conductedDate: "2024-03-13",
    resultDate: "2024-03-17",
    uploaded: false,
    file: null,
  },
  {
    class: "10th",
    students: 55,
    syllabus: { en: "English", ar: "الإنجليزية" },
    conductedDate: "2024-03-13",
    resultDate: "2024-03-17",
    uploaded: false,
    file: null,
  },
];

// ✅ Translations
const t = {
  en: {
    title: "Exam Results Dashboard",
    class: "Class",
    syllabus: "Syllabus",
    students: "Students",
    conducted: "Conducted Date",
    result: "Result Date",
    report: "Report",
    upload: "Upload",
    uploaded: "Uploaded",
    view: "View",
    close: "Close",
    download: "Download",
    totalClasses: "Total Classes",
    totalStudents: "Total Students",
    totalExams: "Exams Conducted",
    totalReports: "Reports Uploaded",
  },
  ar: {
    title: "لوحة نتائج الامتحانات",
    class: "الصف",
    syllabus: "المنهج",
    students: "الطلاب",
    conducted: "تاريخ عقد الامتحان",
    result: "تاريخ النتيجة",
    report: "تقرير",
    upload: "رفع",
    uploaded: "تم الرفع",
    view: "عرض",
    close: "إغلاق",
    download: "تنزيل",
    totalClasses: "إجمالي الصفوف",
    totalStudents: "إجمالي الطلاب",
    totalExams: "الامتحانات المنعقدة",
    totalReports: "التقارير المرفوعة",
  },
};

const Result1 = () => {
  const { language } = useLanguage();
  const [rows, setRows] = useState(initialData);
  const [preview, setPreview] = useState(null);

  // ✅ Update Row
  const updateRow = (i, changes) =>
    setRows((prev) =>
      prev.map((r, idx) => (i === idx ? { ...r, ...changes } : r))
    );

  // ✅ File Upload
  const handleFileChange = (i, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateRow(i, {
      uploaded: true,
      file: { name: file.name, url, type: file.type },
    });
  };

  // ✅ Stats (Dynamic with correct keys)
  const stats = [
    {
      label: t[language].totalClasses,
      value: rows.length,
      color: "bg-[#1C398E]",
      text: "text-[#1C398E]",
      icon: <School />,
    },
    {
      label: t[language].totalStudents,
      value: rows.reduce((a, b) => a + b.students, 0),
      color: "bg-orange-600",
      text: "text-orange-600",
      icon: <Users />,
    },
    {
      label: t[language].totalExams,
      value: rows.length,
      color: "bg-[#1C398E]",
      text: "text-[#1C398E]",
      icon: <BookOpen />,
    },
    {
      label: t[language].totalReports,
      value: rows.filter((r) => r.uploaded).length,
      color: "bg-orange-600",
      text: "text-orange-600",
      icon: <CheckCircle />,
    },
  ];

  return (
    <div className="lg:ml-62">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-[#1C398E] mb-10 tracking-wide">
        {t[language].title}
      </h1>

      {/* ✅ Top Four Cards with dynamic data */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10 w-full">
        {stats.map((card, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl shadow-md text-center overflow-hidden transform hover:scale-105 transition"
          >
            <div className={`h-1.5 w-full ${card.color}`}></div>
            <div className="p-4 flex flex-col items-center">
              <div className={`${card.text} mb-2`}>{card.icon}</div>
              <h3 className={`text-xs sm:text-sm font-semibold ${card.text}`}>
                {card.label}
              </h3>
              <p
                className={`text-base sm:text-lg font-bold mt-1 ${card.text}`}
              >
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Ressultgaph />

      {/* ✅ Table Section */}
      <div className="min-h-screen flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-6xl rounded-2xl p-6 sm:p-8">
          {/* ✅ Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-orange-600 to-[#1C398E] text-white">
                <tr>
                  {[
                    t[language].class,
                    t[language].syllabus,
                    t[language].students,
                    t[language].conducted,
                    t[language].result,
                    t[language].report,
                  ].map((head, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 text-left text-sm font-semibold"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {row.class}
                    </td>
                    <td className="px-4 py-3">{row.syllabus[language]}</td>
                    <td className="px-4 py-3">{row.students}</td>
                    <td className="px-4 py-3">{row.conductedDate}</td>
                    <td className="px-4 py-3">{row.resultDate}</td>
                    <td className="px-4 py-3">
                      {row.uploaded ? (
                        <button
                          onClick={() => setPreview(i)}
                          className="flex items-center gap-2 text-green-600 font-medium hover:underline"
                        >
                          <CheckCircle size={16} /> {t[language].uploaded}
                          <Eye size={14} />
                        </button>
                      ) : (
                        <label className="flex items-center gap-2 cursor-pointer px-3 py-1 bg-gradient-to-r from-orange-600 to-[#1C398E] text-white rounded-lg shadow-md hover:opacity-90 text-xs font-medium">
                          <Upload size={14} /> {t[language].upload}
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(i, e)}
                          />
                        </label>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {rows.map((row, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl shadow-md p-4 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-[#1C398E]">
                    {row.class}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {row.syllabus[language]}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {t[language].students}:{" "}
                  <span className="font-semibold">{row.students}</span>
                </p>
                <p className="text-sm text-gray-600">
                  {t[language].conducted}:{" "}
                  <span className="font-semibold">{row.conductedDate}</span>
                </p>
                <p className="text-sm text-gray-600">
                  {t[language].result}:{" "}
                  <span className="font-semibold">{row.resultDate}</span>
                </p>
                <div className="mt-3">
                  {row.uploaded ? (
                    <button
                      onClick={() => setPreview(i)}
                      className="flex items-center gap-2 text-green-600 font-medium hover:underline"
                    >
                      <CheckCircle size={16} /> {t[language].uploaded}
                      <Eye size={14} />
                    </button>
                  ) : (
                    <label className="flex items-center gap-2 cursor-pointer px-3 py-1 bg-gradient-to-r from-orange-600 to-[#1C398E] text-white rounded-lg shadow-md hover:opacity-90 text-xs font-medium">
                      <Upload size={14} /> {t[language].upload}
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(i, e)}
                      />
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Preview Modal */}
        {preview !== null && rows[preview]?.file && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
              <button
                onClick={() => setPreview(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                <X size={20} />
              </button>
              <h2 className="font-semibold mb-3 text-lg">
                {rows[preview].file.name}
              </h2>
              {rows[preview].file.type.startsWith("image/") ? (
                <img
                  src={rows[preview].file.url}
                  alt=""
                  className="max-h-72 mx-auto rounded shadow"
                />
              ) : (
                <a
                  href={rows[preview].file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-blue-600 underline"
                >
                  <Download size={16} /> {t[language].download}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result1;
 