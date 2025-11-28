import React, { useState } from "react";
import {
  Upload,
  Eye,
  CheckCircle,
  Users,
  FileText,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";
import StudentGraph from "./StudentGraph";

// ✅ Sample Student Data
const initialStudents = [
  { class: "6th", strength: 2, attendance: 88 },
  { class: "7th", strength: 1, attendance: 96 },
  { class: "8th", strength: 1, attendance: 88 },
];

// ✅ Translations
const t = {
  en: {
    title: "Student Dashboard",
    sheet: "Student Sheet",
    class: "Class",
    strength: "Strength",
    attendance: "Attendance %",
    upload: "Upload Sheet",
    uploaded: "Uploaded",
    view: "View File",
    totalClasses: "Total Classes",
    totalStudents: "Total Students",
    avgAttendance: "Avg Attendance",
    uploadedSheets: "Uploaded Sheets",
  },
  ar: {
    title: "لوحة الطلاب",
    sheet: "كشف الطلاب",
    class: "الصف",
    strength: "القوة",
    attendance: "٪الحضور",
    upload: "رفع الكشف",
    uploaded: "تم الرفع",
    view: "عرض الملف",
    totalClasses: "إجمالي الصفوف",
    totalStudents: "إجمالي الطلاب",
    avgAttendance: "متوسط الحضور",
    uploadedSheets: "الكشوف المرفوعة",
  },
};

const Student = () => {
  const { language } = useLanguage();
  const [classes, setClasses] = useState(initialStudents);

  // ✅ Upload handler
  const handleUpload = (file, className) => {
    if (!file) return;
    setClasses((prev) =>
      prev.map((cls) =>
        cls.class === className
          ? { ...cls, file, fileUrl: URL.createObjectURL(file) }
          : cls
      )
    );
  };

  // ✅ Stats
  const totalClasses = classes.length;
  const totalStudents = classes.reduce((acc, cls) => acc + cls.strength, 0);
  const avgAttendance = Math.round(
    classes.reduce((acc, cls) => acc + cls.attendance, 0) / totalClasses
  );
  const uploadedSheets = classes.filter((cls) => cls.file).length;

  return (
    <div className="min-h-screen flex flex-col lg:ml-62 items-center px-4 py-10 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-6xl p-6 sm:p-8">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-[#1C398E] mb-10 tracking-wide">
          {t[language].title}
        </h1>

        {/* ✅ Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Classes */}
          <div className="flex items-center p-6 bg-white rounded-2xl shadow-md border-t-4 border-[#1C398E] hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <Users className="w-10 h-10 text-[#1C398E] mr-4" />
            <div>
              <p className="text-sm text-gray-500">{t[language].totalClasses}</p>
              <h3 className="text-xl font-bold text-[#1C398E]">{totalClasses}</h3>
            </div>
          </div>

          {/* Total Students */}
          <div className="flex items-center p-6 bg-white rounded-2xl shadow-md border-t-4 border-orange-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <FileText className="w-10 h-10 text-orange-600 mr-4" />
            <div>
              <p className="text-sm text-gray-500">{t[language].totalStudents}</p>
              <h3 className="text-xl font-bold text-orange-600">{totalStudents}</h3>
            </div>
          </div>

          {/* Avg Attendance */}
          <div className="flex items-center p-6 bg-white rounded-2xl shadow-md border-t-4 border-[#1C398E] hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <BarChart3 className="w-10 h-10 text-[#1C398E] mr-4" />
            <div>
              <p className="text-sm text-gray-500">{t[language].avgAttendance}</p>
              <h3 className="text-xl font-bold text-[#1C398E]">{avgAttendance}%</h3>
            </div>
          </div>

          {/* Uploaded Sheets */}
          <div className="flex items-center p-6 bg-white rounded-2xl shadow-md border-t-4 border-orange-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <ClipboardList className="w-10 h-10 text-orange-600 mr-4" />
            <div>
              <p className="text-sm text-gray-500">{t[language].uploadedSheets}</p>
              <h3 className="text-xl font-bold text-orange-600">{uploadedSheets}</h3>
            </div>
          </div>
        </div>

        {/* ✅ Student Sheet Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#1C398E] mb-6 border-b pb-2">
          {t[language].sheet}
        </h2>

        {/* ✅ Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-orange-600 to-[#1C398E] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  {t[language].class}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  {t[language].strength}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  {t[language].attendance}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  {t[language].upload}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {classes.map((cls, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {cls.class}
                  </td>
                  <td className="px-4 py-3">{cls.strength}</td>
                  <td className="px-4 py-3">{cls.attendance}%</td>
                  <td className="px-4 py-3">
                    {!cls.file ? (
                      <label className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-600 to-[#1C398E] text-white rounded-lg shadow cursor-pointer hover:opacity-90 transition font-medium w-fit">
                        <Upload className="w-4 h-4" />
                        {t[language].upload}
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            handleUpload(e.target.files[0], cls.class)
                          }
                        />
                      </label>
                    ) : (
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-[#1C398E] font-semibold">
                          <CheckCircle className="w-5 h-5 text-[#1C398E]" />
                          {t[language].uploaded}
                        </span>
                        <a
                          href={cls.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#1C398E] hover:underline font-medium"
                        >
                          <Eye className="w-5 h-5" />
                          {t[language].view}
                        </a>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Mobile Cards */}
        <div className="grid gap-4 md:hidden mt-6">
          {classes.map((cls, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl shadow-md p-4 space-y-3 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 border-t-4 border-orange-600"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#1C398E]">{cls.class}</h3>
                <span className="text-sm text-gray-500">
                  {t[language].strength}: {cls.strength}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {t[language].attendance}:{" "}
                <span className="font-semibold">{cls.attendance}%</span>
              </p>

              {!cls.file ? (
                <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-[#1C398E] text-white rounded-lg shadow cursor-pointer hover:opacity-90 transition font-medium w-fit">
                  <Upload className="w-4 h-4" />
                  {t[language].upload}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleUpload(e.target.files[0], cls.class)}
                  />
                </label>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-1 text-[#1C398E] font-semibold">
                    <CheckCircle className="w-5 h-5 text-[#1C398E]" />
                    {t[language].uploaded}
                  </span>
                  <a
                    href={cls.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#1C398E] hover:underline font-medium"
                  >
                    <Eye className="w-5 h-5" />
                    {t[language].view}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Graph Below */}
      <StudentGraph />
    </div>
  );
};

export default Student;
