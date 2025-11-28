import React, { useState } from "react";
import {
  School,
  Users,
  BookOpen,
  Clock,
  Upload,
  CheckCircle,
  Eye,
  X,
  Download,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";
import ClassesDays from "./ClassesDays";
import LectureTime from "./LectureTime";

// ✅ Initial table data
const initialData = [
  { cls: "6th", students: 40, lectures: 3, timing: "9:00 - 9:45 AM", uploaded: false, uploading: false, file: null },
  { cls: "7th", students: 50, lectures: 3, timing: "10:00 - 10:45 AM", uploaded: false, uploading: false, file: null },
  { cls: "8th", students: 55, lectures: 3, timing: "11:00 - 11:45 AM", uploaded: false, uploading: false, file: null },
  { cls: "9th", students: 50, lectures: 3, timing: "12:00 - 12:45 PM", uploaded: false, uploading: false, file: null },
  { cls: "10th", students: 55, lectures: 3, timing: "1:00 - 1:45 PM", uploaded: false, uploading: false, file: null },
];

const Sllybus = () => {
  const { language } = useLanguage();

  // ✅ Text translations
  const t = {
    en: {
      title: "English Syllabus",
      taughtBy: "Taught by",
      teacher: "Mr. Ali",
      distribution: "English Subject Distribution",
      subject: "English",
      class: "Class",
      students: "Total Students",
      lectures: "Weekly Lectures",
      timing: "Lecture Timing",
      outline: "Syllabus Outline",
      upload: "Upload",
      uploaded: "Uploaded",
      uploading: "Uploading...",
      view: "View",
      close: "Close",
      download: "Download",
      stats: {
        classes: "Classes",
        students: "Students",
        units: "Units",
        lectures: "Lectures",
      },
    },
    ar: {
      title: "المنهج الإنجليزي",
      taughtBy: "يُدرس من قبل",
      teacher: "الأستاذ علي",
      distribution: "توزيع مادة اللغة الإنجليزية",
      subject: "الإنجليزية",
      class: "الصف",
      students: "عدد الطلاب",
      lectures: "المحاضرات الأسبوعية",
      timing: "توقيت المحاضرة",
      outline: "خطة المنهج",
      upload: "رفع",
      uploaded: "تم الرفع",
      uploading: "جارٍ الرفع...",
      view: "عرض",
      close: "إغلاق",
      download: "تنزيل",
      stats: {
        classes: "الصفوف",
        students: "الطلاب",
        units: "الوحدات",
        lectures: "المحاضرات",
      },
    },
  };

  const [rows, setRows] = useState(initialData);
  const [preview, setPreview] = useState({ open: false, index: null });

  const uploadUrl = import.meta.env.VITE_UPLOAD_URL || null;

  const updateRow = (index, changes) =>
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...changes } : r)));

  const handleFileChange = async (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const prevFile = rows[index]?.file;
    if (prevFile?.isLocal && prevFile?.url) {
      try {
        URL.revokeObjectURL(prevFile.url);
      } catch {}
    }

    updateRow(index, { uploading: true });

    try {
      if (uploadUrl) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(uploadUrl, { method: "POST", body: formData });
        if (!res.ok) throw new Error("Upload failed");
        const body = await res.json();
        const remoteUrl = body?.url || null;

        updateRow(index, {
          uploading: false,
          uploaded: true,
          file: { name: file.name, size: file.size, type: file.type, url: remoteUrl, isLocal: false },
        });
      } else {
        const objectUrl = URL.createObjectURL(file);
        updateRow(index, {
          uploading: false,
          uploaded: true,
          file: { name: file.name, size: file.size, type: file.type, url: objectUrl, isLocal: true },
        });
      }
    } catch (err) {
      console.error("Upload error:", err);
      updateRow(index, { uploading: false, uploaded: false, file: null });
      alert("Upload failed. Check console for details.");
    } finally {
      e.target.value = "";
    }
  };

  const openPreview = (index) => setPreview({ open: true, index });
  const closePreview = () => setPreview({ open: false, index: null });

  return (
    <div className="min-h-screen lg:ml-62 flex flex-col items-start sm:items-center px-3 sm:px-6 py-4 bg-gradient-to-br">
      <div className="w-full max-w-6xl rounded-2xl p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#1C398E]">
            {t[language].title}
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-lg">
            {t[language].taughtBy}{" "}
            <span className="font-semibold">{t[language].teacher}</span>
          </p>
        </div>

        {/* Stat Cards (Responsive + Language switch) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10 w-full">
          {[
            { title: t[language].stats.classes, value: 5, color: "bg-[#1C398E]", text: "text-[#1C398E]", icon: <School /> },
            { title: t[language].stats.students, value: 250, color: "bg-orange-600", text: "text-orange-600", icon: <Users /> },
            { title: t[language].stats.units, value: 12, color: "bg-[#1C398E]", text: "text-[#1C398E]", icon: <BookOpen /> },
            { title: t[language].stats.lectures, value: 3, color: "bg-orange-600", text: "text-orange-600", icon: <Clock /> },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl shadow-md text-center overflow-hidden transform hover:scale-105 transition"
            >
              <div className={`h-1.5 w-full ${card.color}`}></div>
              <div className="p-4 flex flex-col items-center">
                <div className={`${card.text} mb-2`}>{card.icon}</div>
                <h3 className={`text-xs sm:text-sm font-semibold ${card.text}`}>{card.title}</h3>
                <p className={`text-base sm:text-lg font-bold mt-1 ${card.text}`}>{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table (Desktop) */}
        <div className="hidden md:block w-full rounded-lg shadow-md overflow-x-auto mb-10">
          <table className="min-w-full table-auto border border-gray-200 text-sm md:text-base">
            <thead>
              <tr className="bg-[#1C398E] text-white">
                <th className="px-3 py-2 border">{t[language].class}</th>
                <th className="px-3 py-2 border">{t[language].subject}</th>
                <th className="px-3 py-2 border">{t[language].students}</th>
                <th className="px-3 py-2 border">{t[language].lectures}</th>
                <th className="px-3 py-2 border">{t[language].timing}</th>
                <th className="px-3 py-2 border">{t[language].outline}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-orange-50 transition">
                  <td className="px-3 py-2 border font-medium">{row.cls}</td>
                  <td className="px-3 py-2 border">{t[language].subject}</td>
                  <td className="px-3 py-2 border">{row.students}</td>
                  <td className="px-3 py-2 border">{row.lectures}</td>
                  <td className="px-3 py-2 border">{row.timing}</td>
                  <td className="px-3 py-2 border">
                    {row.uploading ? (
                      <span className="text-sm text-gray-700">{t[language].uploading}</span>
                    ) : row.uploaded ? (
                      <button
                        onClick={() => openPreview(i)}
                        className="flex items-center gap-2 px-3 py-1 text-green-600 font-medium hover:bg-green-50 rounded-lg"
                      >
                        <CheckCircle size={16} />
                        <span>{t[language].uploaded}</span>
                        <Eye size={14} />
                      </button>
                    ) : (
                      <label className="flex items-center cursor-pointer gap-1 px-3 py-1 bg-gradient-to-r from-[#1C398E] to-[#F54A00] text-white text-xs rounded-lg shadow-md hover:scale-105 transition">
                        <Upload size={14} />
                        {t[language].upload}
                        <input type="file" className="hidden" onChange={(e) => handleFileChange(i, e)} />
                      </label>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view (Mobile) */}
        <div className="md:hidden space-y-4 mb-10">
          {rows.map((row, i) => (
            <div key={i} className="bg-white shadow-md rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-bold text-[#1C398E] mb-2">{row.cls} - {t[language].subject}</h3>
              <p><span className="font-semibold">{t[language].students}:</span> {row.students}</p>
              <p><span className="font-semibold">{t[language].lectures}:</span> {row.lectures}</p>
              <p><span className="font-semibold">{t[language].timing}:</span> {row.timing}</p>
              <div className="mt-2">
                {row.uploading ? (
                  <span className="text-sm text-gray-700">{t[language].uploading}</span>
                ) : row.uploaded ? (
                  <button
                    onClick={() => openPreview(i)}
                    className="flex items-center gap-2 px-3 py-1 text-green-600 font-medium hover:bg-green-50 rounded-lg"
                  >
                    <CheckCircle size={16} />
                    <span>{t[language].uploaded}</span>
                    <Eye size={14} />
                  </button>
                ) : (
                  <label className="flex items-center cursor-pointer gap-1 px-3 py-1 bg-gradient-to-r from-[#1C398E] to-[#F54A00] text-white text-xs rounded-lg shadow-md hover:scale-105 transition">
                    <Upload size={14} />
                    {t[language].upload}
                    <input type="file" className="hidden" onChange={(e) => handleFileChange(i, e)} />
                  </label>
                )}
                {row.file && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">{row.file.name}</p>
                    <embed src={row.file.url} type={row.file.type} className="w-24 h-14 border rounded mt-1" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Graphs */}
      <div className="lg:w-[900px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <ClassesDays />
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <LectureTime />
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {preview.open && preview.index !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {rows[preview.index].file?.name}
              </h3>
              <button onClick={closePreview} className="p-2 rounded-md hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <div className="p-4 flex justify-center items-center">
              {rows[preview.index].file?.type?.startsWith("image/") ? (
                <img
                  src={rows[preview.index].file.url}
                  alt=""
                  className="max-h-80 max-w-[90%] object-contain rounded-md"
                />
              ) : (
                <a
                  href={rows[preview.index].file?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-blue-600 underline"
                >
                  <Download size={16} />
                  {t[language].download}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sllybus;
