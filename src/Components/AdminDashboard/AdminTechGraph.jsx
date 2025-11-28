import React from "react";
import { useLanguage } from "../LanguageContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminTechGraph = () => {
  const { language } = useLanguage();

  const t = {
    en: {
      title: "Teachers Performance Graph",
      xAxis: "Teachers",
      yAxis: "Performance",
    },
    ar: {
      title: "مخطط أداء المعلمين",
      xAxis: "المعلمين",
      yAxis: "الأداء",
    },
  };

  const text = t[language];

  const data = [
    { name: "John", performance: 85 },
    { name: "Mary", performance: 92 },
    { name: "Ali", performance: 75 },
    { name: "Sara", performance: 88 },
    { name: "Ahmed", performance: 95 },
  ];

  return (
    <div className="lg:w-[950px]">
    <div className="mt-8 p-4 md:p-6 rounded-2xl shadow-xl">
      <h1 className="text-xl md:text-2xl font-extrabold text-[#1C398E] mb-4 text-center">
        {text.title}
      </h1>
      <div className="h-72 md:h-96 bg-white shadow-lg rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: text.xAxis,
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              label={{
                value: text.yAxis,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="performance" fill="#2563eb" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
};

export default AdminTechGraph;
