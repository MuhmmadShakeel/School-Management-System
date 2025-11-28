import React, { useState } from "react";
import { Search, Eye } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Complaintsgraph from "./Complaintsgraph";
import ComplaintsGraph2 from "./ComplaintsGraph2";

const initialComplaints = [
  {
    id: 1,
    name: "Ali Raza",
    email: "ali@student.com",
    role: "Student",
    status: "Pending",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    complaint: "The classroom projector is not working properly.",
  },
  {
    id: 2,
    name: "Sara Khan",
    email: "sara@teacher.com",
    role: "Teacher",
    status: "Approved",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    complaint: "Staff room internet is very slow during meetings.",
  },
  {
    id: 3,
    name: "Usman Ahmed",
    email: "usman@student.com",
    role: "Student",
    status: "Pending",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    complaint: "Cafeteria food quality is not good.",
  },
  {
    id: 4,
    name: "Fatima Malik",
    email: "fatima@teacher.com",
    role: "Teacher",
    status: "Rejected",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    complaint: "Need more whiteboard markers in the lecture hall.",
  },
];

// ✅ Translations
const translations = {
  en: {
    heading: "Complaints Management",
    search: "Search complaints...",
    name: "Name",
    email: "Email",
    role: "Role",
    status: "Status",
    view: "View",
    student: "Student",
    teacher: "Teacher",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    noResults: "No complaints found...",
    details: "Complaint Details",
    complaint: "Complaint",
    close: "Close",
    approveBtn: "Approve",
    rejectBtn: "Reject",
  },
  ar: {
    heading: "إدارة الشكاوى",
    search: "ابحث عن الشكاوى...",
    name: "الاسم",
    email: "البريد الإلكتروني",
    role: "الدور",
    status: "الحالة",
    view: "عرض",
    student: "طالب",
    teacher: "معلم",
    pending: "قيد الانتظار",
    approved: "تمت الموافقة",
    rejected: "مرفوض",
    noResults: "لم يتم العثور على شكاوى...",
    details: "تفاصيل الشكوى",
    complaint: "الشكوى",
    close: "إغلاق",
    approveBtn: "الموافقة",
    rejectBtn: "رفض",
  },
};

const Complaint2 = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [search, setSearch] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];

  const handleStatusChange = (id, newStatus) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    toast.success(
      newStatus === "Approved" ? "Complaint Approved" : "Complaint Rejected"
    );
    setSelectedComplaint(null);
  };

  const filteredComplaints = complaints.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    if (status === "Approved")
      return "bg-green-100 text-green-700 border border-green-400";
    if (status === "Rejected")
      return "bg-red-100 text-red-700 border border-red-400";
    return "bg-yellow-100 text-yellow-700 border border-yellow-400";
  };

  return (
    <div className="min-h-screen lg:ml-62 p-6 sm:p-8 bg-gray-50">
      <ToastContainer position="top-right" autoClose={2000}/>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-orange-600 mb-6 border-b-4 border-blue-900 pb-2">
        {t.heading}
      </h1>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-lg shadow-md p-2 mb-6 w-full max-w-md">
        <Search className="text-gray-500 ml-2" size={20} />
        <input
          type="text"
          placeholder={t.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-md outline-none"
        />
      </div>

      {/* Complaints Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredComplaints.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-5 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={c.image}
                alt={c.name}
                className="w-16 h-16 rounded-full shadow-md"
              />
              <div>
                <h3 className="font-bold text-lg text-[#D13800]">{c.name}</h3>
                <p className="text-sm text-gray-600">{c.email}</p>
                <p className="text-sm text-blue-900 font-medium">
                  {c.role === "Student" ? t.student : t.teacher}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mt-3">
              <span
                className={`px-3 py-1 text-sm rounded-full ${getStatusBadge(
                  c.status
                )}`}
              >
                {c.status === "Approved"
                  ? t.approved
                  : c.status === "Rejected"
                  ? t.rejected
                  : t.pending}
              </span>
            </div>

            {/* Eye Button */}
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedComplaint(c)}
                className="text-blue-900 hover:text-orange-600 transition cursor-pointer"
              >
                <Eye size={22} />
              </button>
            </div>
          </div>
        ))}

        {filteredComplaints.length === 0 && (
          <p className="text-gray-500">{t.noResults}</p>
        )}
      </div>

      {/* ✅ Modal for Complaint Details */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedComplaint(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl"
            >
              ✖
            </button>

            {/* Card Content */}
            <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
              {t.details}
            </h2>

            <div className="flex flex-col items-center">
              <img
                src={selectedComplaint.image}
                alt={selectedComplaint.name}
                className="w-24 h-24 rounded-full mb-4 shadow-md"
              />
              <div className="space-y-2 text-center">
                <p>
                  <strong>{t.name}:</strong> {selectedComplaint.name}
                </p>
                <p>
                  <strong>{t.email}:</strong> {selectedComplaint.email}
                </p>
                <p>
                  <strong>{t.role}:</strong>{" "}
                  {selectedComplaint.role === "Student"
                    ? t.student
                    : t.teacher}
                </p>
                <p>
                  <strong>{t.status}:</strong>{" "}
                  {selectedComplaint.status === "Approved"
                    ? t.approved
                    : selectedComplaint.status === "Rejected"
                    ? t.rejected
                    : t.pending}
                </p>
                <p className="mt-3 text-gray-700">
                  <strong>{t.complaint}:</strong> {selectedComplaint.complaint}
                </p>
              </div>
            </div>

            {/* Approve / Reject Buttons */}
            {selectedComplaint.status === "Pending" && (
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() =>
                    handleStatusChange(selectedComplaint.id, "Approved")
                  }
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {t.approveBtn}
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(selectedComplaint.id, "Rejected")
                  }
                  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  {t.rejectBtn}
                </button>
              </div>
            )}

            {selectedComplaint.status !== "Pending" && (
              <div className="mt-6 text-center">
                <span
                  className={`px-4 py-2 rounded-lg font-semibold ${getStatusBadge(
                    selectedComplaint.status
                  )}`}
                >
                  {selectedComplaint.status === "Approved"
                    ? "✅ Complaint Approved"
                    : "❌ Complaint Rejected"}
                </span>
              </div>
            )}
          </div>
           
        </div>
     
      )}
      <div className="lg:mt-5 lg:flex gap-2">
 < Complaintsgraph/>
 <ComplaintsGraph2/>

      </div>
      
    </div>
     
  );
};

export default Complaint2;
