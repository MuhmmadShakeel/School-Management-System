// LectureTime.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "../LanguageContext"; // uses your LanguageProvider (en <-> ar)

// Raw class data with both language labels (keep small & clear)
const rawData = [
  { classEn: "6th", classAr: "الصف السادس", syllabus: 40, timeEn: "9:00 AM", timeAr: "٩:٠٠" },
  { classEn: "7th", classAr: "الصف السابع", syllabus: 50, timeEn: "10:00 AM", timeAr: "١٠:٠٠" },
  { classEn: "8th", classAr: "الصف الثامن", syllabus: 55, timeEn: "11:00 AM", timeAr: "١١:٠٠" },
  { classEn: "9th", classAr: "الصف التاسع", syllabus: 50, timeEn: "12:00 PM", timeAr: "١٢:٠٠" },
  { classEn: "10th", classAr: "الصف العاشر", syllabus: 55, timeEn: "1:00 PM", timeAr: "١:٠٠" },
];

const LectureTime = () => {
  const { language } = useLanguage(); // "en" or "ar"

  // small translations object (keeps logic simple)
  const t = {
    en: { title: "Class Syllabus Progress", syllabus: "Syllabus %", classTime: "Class Time" },
    ar: { title: "مستوى تقدم المنهج", syllabus: "٪ المنهج", classTime: "وقت المحاضرة" },
  }[language || "en"];

  // map rawData into chart-ready data depending on selected language
  const data = rawData.map((d, i) => ({
    class: language === "ar" ? d.classAr : d.classEn,
    syllabus: d.syllabus,
    timeLabel: language === "ar" ? d.timeAr : d.timeEn,
    timeIndex: i + 1, // numeric for plotting the second line
  }));

  // minimal/custom tooltip to show both syllabus and actual time label
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    const syllabusPoint = payload.find((p) => p.dataKey === "syllabus");
    const timePoint = payload.find((p) => p.dataKey === "timeIndex");
    const row = payload[0]?.payload || {};
    return (
      <div className="bg-white border rounded-md p-2 shadow-md text-sm">
        <div className="font-semibold text-gray-800 mb-1">{label}</div>
        <div className="text-gray-700">{t.syllabus}: {row.syllabus}</div>
        <div className="text-gray-700">{t.classTime}: {row.timeLabel}</div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200 w-full max-w-lg transition-shadow">
      <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">{t.title}</h3>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 6, right: 16, left: 0, bottom: 6 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
          <XAxis dataKey="class" tick={{ fill: "#4B5563", fontSize: 12 }} />
          <YAxis tick={{ fill: "#4B5563", fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="syllabus"
            name={t.syllabus}
            stroke="#1C398E"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "#fff", stroke: "#1C398E" }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="timeIndex"
            name={t.classTime}
            stroke="#F54A00"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "#fff", stroke: "#F54A00" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LectureTime;
