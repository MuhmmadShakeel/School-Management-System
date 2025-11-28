import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "../LanguageContext";

// ✅ Translations
const translations = {
  en: {
    heading: "Complaints by Role",
    teacher: "Teachers",
    student: "Students",
    month: "Month",
    complaints: "Complaints",
  },
  ar: {
    heading: "الشكاوى حسب الدور",
    teacher: "المعلمون",
    student: "الطلاب",
    month: "الشهر",
    complaints: "الشكاوى",
  },
};

// ✅ Example Data (can later be connected with live data)
const data = [
  { month: "Jan", teacher: 4, student: 7 },
  { month: "Feb", teacher: 2, student: 5 },
  { month: "Mar", teacher: 6, student: 9 },
  { month: "Apr", teacher: 3, student: 4 },
  { month: "May", teacher: 5, student: 8 },
];

const ComplaintsGraph2 = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl mt-5 sm:mt-0 shadow-lg p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6 border-b-2 border-orange-600 pb-2">
        {t.heading}
      </h2>

      {/* Responsive Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" label={{ value: t.month, position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: t.complaints, angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />

            {/* Student Line */}
            <Line
              type="monotone"
              dataKey="student"
              name={t.student}
              stroke="#f97316" // orange
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            {/* Teacher Line */}
            <Line
              type="monotone"
              dataKey="teacher"
              name={t.teacher}
              stroke="#2563eb" // blue
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComplaintsGraph2;
