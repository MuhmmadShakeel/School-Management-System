import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "../LanguageContext"; // ✅ import language context

// ✅ Colors for chart
const COLORS = ["#f97316", "#2563eb"]; // orange-600 and blue-600

// ✅ Translations
const translations = {
  en: {
    heading: "Complaints Overview",
    pending: "Pending",
    approved: "Fulfilled",
  },
  ar: {
    heading: "نظرة عامة على الشكاوى",
    pending: "قيد الانتظار",
    approved: "تمت المعالجة",
  },
};

// ✅ Dummy Data (you can replace with real data via props later)
const data = [
  { name: "pending", value: 8 },
  { name: "approved", value: 12 },
];

const Complaintsgraph = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Map translations to chart labels
  const localizedData = data.map((item) => ({
    name: t[item.name],
    value: item.value,
  }));

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl   sm:mt-0 shadow-lg p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-6 border-b-2 border-blue-900 pb-2">
        {t.heading}
      </h2>

      {/* Responsive Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={localizedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {localizedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Complaintsgraph;
