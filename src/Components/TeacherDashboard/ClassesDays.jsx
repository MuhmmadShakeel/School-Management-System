import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "../LanguageContext";

const ClassesDays = () => {
  const { language } = useLanguage();

  // ✅ Translations
  const t = {
    en: {
      title: "Classes & Student Strength",
      class6: "Class 6",
      class7: "Class 7",
      class8: "Class 8",
      class9: "Class 9",
      class10: "Class 10",
    },
    ar: {
      title: "الفصول وعدد الطلاب",
      class6: "الصف السادس",
      class7: "الصف السابع",
      class8: "الصف الثامن",
      class9: "الصف التاسع",
      class10: "الصف العاشر",
    },
  };

  // ✅ Sample data: Student strength for different classes
  const data = [
    { name: t[language].class6, value: 40 },
    { name: t[language].class7, value: 50 },
    { name: t[language].class8, value: 55 },
    { name: t[language].class9, value: 50 },
    { name: t[language].class10, value: 60 },
  ];

  // ✅ Professional colors
  const COLORS = ["#1e3a8a", "#D43A00", "#2563eb", "#D43A00", "#0f172a"];

  return (
    <div className="w-full flex justify-center items-center py-6 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-200 p-4">
        <h2 className="text-lg sm:text-xl font-semibold text-center text-blue-900 mb-4">
          {t[language].title}
        </h2>

        {/* ✅ Responsive Chart */}
        <div className="flex justify-center items-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ClassesDays;
