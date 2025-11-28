import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useLanguage } from "../LanguageContext";

const Ressultgaph = () => {
  const { language, toggleLanguage } = useLanguage();

  // ✅ Sample Data (Class + Date + Result)
  const data = [
    {
      class: "6th",
      date: "2024-03-12",
      result: 85,
      subject: { en: "Math", ar: "الرياضيات" },
    },
    {
      class: "7th",
      date: "2024-03-14",
      result: 72,
      subject: { en: "Science", ar: "العلوم" },
    },
    {
      class: "8th",
      date: "2024-03-16",
      result: 90,
      subject: { en: "English", ar: "الإنجليزية" },
    },
    {
      class: "9th",
      date: "2024-03-18",
      result: 65,
      subject: { en: "History", ar: "التاريخ" },
    },
    {
      class: "10th",
      date: "2024-03-20",
      result: 95,
      subject: { en: "Computer", ar: "الحاسوب" },
    },
  ];

  return (
    <div className="lg:w-[900px] lg:ml-10 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-orange-600">
              {language === "en" ? "Results Timeline" : "الجدول الزمني للنتائج"}
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-1">
              {language === "en"
                ? "Performance tracking by class and date"
                : "تتبع الأداء حسب الصف والتاريخ"}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-[300px] sm:h-[380px] md:h-[460px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#fb923c"
                tick={{ fontSize: 13, fontWeight: "bold" }}
              />
              <YAxis
                stroke="#fb923c"
                tick={{ fontSize: 13, fontWeight: "bold" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e3a8a",
                  borderRadius: "8px",
                  color: "white",
                  border: "none",
                }}
                formatter={(value, name, props) => [
                  `${value}`,
                  language === "en" ? "Score" : "الدرجة",
                ]}
                labelFormatter={(label, payload) => {
                  const item = payload?.[0]?.payload;
                  return item
                    ? `${language === "en" ? item.class : "الصف"}: ${
                        item.class
                      } | ${language === "en" ? item.subject.en : item.subject.ar
                      }`
                    : label;
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={() =>
                  language === "en" ? "Result Score" : "نتيجة الدرجة"
                }
              />
              {/* ✅ Blue line */}
              <Line
                type="monotone"
                dataKey="result"
                stroke="#1e3a8a"
                strokeWidth={3}
                dot={{ r: 6, fill: "#fb923c", strokeWidth: 2 }}
                activeDot={{ r: 8, fill: "#fb923c" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Ressultgaph;
