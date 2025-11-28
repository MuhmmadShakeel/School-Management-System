import React from "react";
import {
  Users,
  BookOpen,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Bar, BarChart } from "recharts";
import { useLanguage } from "../LanguageContext";

// ✅ Dummy Data
const pieData = [
  { name: "Completed", value: 70 },
  { name: "Remaining", value: 30 },
];

const lineData = [
  { month: "Jan", attendance: 85 },
  { month: "Feb", attendance: 90 },
  { month: "Mar", attendance: 88 },
  { month: "Apr", attendance: 95 },
  { month: "May", attendance: 92 },
];

const barData = [
  { class: "6th", attendance: 88 },
  { class: "7th", attendance: 96 },
  { class: "8th", attendance: 90 },
];

const COLORS = ["#1C398E", "#FB923C"]; // dark-blue & orange

// ✅ Translations
const t = {
  en: {
    title: "Dashboard",
    totalStudents: "Total Students",
    syllabus: "Syllabus Completed",
    avgAttendance: "Avg Attendance",
    uploaded: "Uploaded Sheets",
  },
  ar: {
    title: "لوحة التحكم",
    totalStudents: "إجمالي الطلاب",
    syllabus: "المنهج المكتمل",
    avgAttendance: "متوسط الحضور",
    uploaded: "الكشوف المرفوعة",
  },
};

const Dashboard = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen lg:ml-64">
      {/* ✅ Title */}
      <h1 className="text-3xl font-extrabold text-center text-[#1C398E] mb-10">
        {t[language].title}
      </h1>

      {/* ✅ 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg border-t-4 border-[#1C398E] hover:shadow-xl transition">
          <Users className="w-10 h-10 text-[#1C398E] mr-4" />
          <div>
            <p className="text-sm text-gray-500">{t[language].totalStudents}</p>
            <h3 className="text-xl font-bold text-[#1C398E]">120</h3>
          </div>
        </div>

        <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg border-t-4 border-orange-600 hover:shadow-xl transition">
          <BookOpen className="w-10 h-10 text-orange-600 mr-4" />
          <div>
            <p className="text-sm text-gray-500">{t[language].syllabus}</p>
            <h3 className="text-xl font-bold text-orange-600">70%</h3>
          </div>
        </div>

        <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg border-t-4 border-[#1C398E] hover:shadow-xl transition">
          <BarChart3 className="w-10 h-10 text-[#1C398E] mr-4" />
          <div>
            <p className="text-sm text-gray-500">{t[language].avgAttendance}</p>
            <h3 className="text-xl font-bold text-[#1C398E]">92%</h3>
          </div>
        </div>

        <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg border-t-4 border-orange-600 hover:shadow-xl transition">
          <ClipboardList className="w-10 h-10 text-orange-600 mr-4" />
          <div>
            <p className="text-sm text-gray-500">{t[language].uploaded}</p>
            <h3 className="text-xl font-bold text-orange-600">8</h3>
          </div>
        </div>
      </div>

      {/* ✅ Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-lg font-bold text-[#1C398E] mb-4">
            {t[language].syllabus}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-lg font-bold text-[#1C398E] mb-4">
            {t[language].avgAttendance}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="#1C398E" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
        <h2 className="text-lg font-bold text-[#1C398E] mb-4">
          {t[language].totalStudents}
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="class" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="attendance" fill="#1C398E" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
