import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "../LanguageContext";

const AdminDash = () => {
  const { language } = useLanguage();

  // Labels based on selected language
  const t = {
    en: {
      dashboard: "Admin Dashboard",
      teacherLecture: "Teachers vs Lecture Time",
      classStrength: "Class vs Student Strength",
      weekly: "📈 Weekly Activity Summary",
    },
    ar: {
      dashboard: "📊 لوحة تحكم المشرف",
      teacherLecture: "المعلمون مقابل وقت المحاضرة",
      classStrength: "الفصل مقابل عدد الطلاب",
      weekly: "📈 ملخص النشاط الأسبوعي",
    },
  };

  const pieData = [
    { name: "Mr. Ali", value: 12 },
    { name: "Ms. Sara", value: 18 },
    { name: "Mr. Khan", value: 9 },
    { name: "Ms. Fatima", value: 15 },
  ];

  const lineData = [
    { class: "Class 1", students: 30 },
    { class: "Class 2", students: 25 },
    { class: "Class 3", students: 40 },
    { class: "Class 4", students: 35 },
    { class: "Class 5", students: 28 },
  ];

  const barData = [
    { name: "Announcements", count: 12 },
    { name: "Teachers", count: 8 },
    { name: "Students", count: 20 },
    { name: "Admins", count: 3 },
    { name: "Reports", count: 5 },
  ];

  const COLORS = ["#1A3AA3", "#FF6B35", "#FFA41B", "#38A3A5"];

  return (
    <div className="min-h-screen p-6 lg:ml-60 bg-gray-50">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-[#1A3AA3] mb-8">
        {t[language].dashboard}
      </h1>

      {/* Top 2 Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Pie */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h2 className="text-lg font-bold mb-4 text-[#1A3AA3]">
            {t[language].teacherLecture}
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h2 className="text-lg font-bold mb-4 text-[#1A3AA3]">
            {t[language].classStrength}
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="class" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#FF6B35" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
        <h2 className="text-xl font-bold mb-6 text-[#1A3AA3]">{t[language].weekly}</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#1A3AA3" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDash;
