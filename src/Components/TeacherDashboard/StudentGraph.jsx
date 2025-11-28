import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useLanguage } from "../LanguageContext";

// ✅ Sample Data
const data = [
  { class: "6th", attendance: 92 },
  { class: "7th", attendance: 96 },
  { class: "8th", attendance: 88 },
  { class: "9th", attendance: 81 },
  { class: "10th", attendance: 85 },
];

// ✅ Translations
const t = {
  en: {
    title: "Class Attendance Overview",
    class: "Class",
    attendance: "Attendance (%)",
  },
  ar: {
    title: "نظرة عامة على حضور الصف",
    class: "الصف",
    attendance: "الحضور (%)",
  },
};

const StudentGraph = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl rounded-2xl p-6">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-orange-600 mb-8">
          {t[language].title}
        </h2>

        {/* ✅ Responsive Graph */}
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="class"
                tick={{ fill: "#EA580C", fontWeight: "600" }}
                label={{
                  value: t[language].class,
                  position: "insideBottom",
                  offset: -5,
                  fill: "#EA580C",
                  fontWeight: "bold",
                }}
              />
              <YAxis
                tick={{ fill: "#EA580C", fontWeight: "600" }}
                label={{
                  value: t[language].attendance,
                  angle: -90,
                  position: "insideLeft",
                  fill: "#EA580C",
                  fontWeight: "bold",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #1C398E",
                }}
                labelStyle={{ color: "#1C398E", fontWeight: "bold" }}
                itemStyle={{ color: "#EA580C" }}
              />
              <Bar dataKey="attendance" fill="#1C398E" radius={[6, 6, 0, 0]}>
                <LabelList
                  dataKey="attendance"
                  position="top"
                  fill="#EA580C"
                  fontWeight="bold"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StudentGraph;
