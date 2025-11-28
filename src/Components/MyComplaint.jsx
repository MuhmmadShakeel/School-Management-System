import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Search } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "./LanguageContext";

const MyComplaint = () => {
  const { language } = useLanguage();
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState(null);

  // Labels in EN + AR
  const t = {
    en: {
      title: "Complaints You Have Made",
      search: "Search complaints...",
      noComplaints: "No complaints found.",
      name: "Name",
      email: "Email",
      category: "Category",
      status: "Status",
      message: "Message",
      actions: "Actions",
      pending: "Pending",
      viewMsg: "Complaint Message",
      close: "Close",
      edit: "Edit Complaint",
      cancel: "Cancel",
      save: "Save",
    },
    ar: {
      title: "الشكاوى المقدمة",
      search: "ابحث في الشكاوى...",
      noComplaints: "لا توجد شكاوى.",
      name: "الاسم",
      email: "البريد الإلكتروني",
      category: "الفئة",
      status: "الحالة",
      message: "الرسالة",
      actions: "إجراءات",
      pending: "قيد الانتظار",
      viewMsg: "نص الشكوى",
      close: "إغلاق",
      edit: "تعديل الشكوى",
      cancel: "إلغاء",
      save: "حفظ",
    },
  };

  // ✅ Load complaints & force "Pending"
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const stored = JSON.parse(localStorage.getItem("complaints")) || [];
    const updated = stored.map((c) => ({ ...c, status: "Pending" }));
    setComplaints(updated);
  }, []);

  // ✅ Save complaints
  const saveComplaints = (updated) => {
    const pendingOnly = updated.map((c) => ({ ...c, status: "Pending" }));
    setComplaints(pendingOnly);
    localStorage.setItem("complaints", JSON.stringify(pendingOnly));
  };

  const showAlert = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(null), 2000);
  };

  const handleDelete = (index) => {
    const updated = complaints.filter((_, i) => i !== index);
    saveComplaints(updated);
    showAlert(language === "en" ? "Complaint deleted!" : "تم حذف الشكوى!");
  };

  const handleEditSave = () => {
    const updated = complaints.map((c, i) =>
      i === selectedComplaint.index
        ? { ...selectedComplaint.data, status: "Pending" }
        : c
    );
    saveComplaints(updated);
    setEditMode(false);
    setSelectedComplaint(null);
    showAlert(language === "en" ? "Complaint updated!" : "تم تعديل الشكوى!");
  };

  const filteredComplaints = complaints.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Alerts */}
      {alert && (
        <div className="fixed top-20 right-6 bg-orange-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
          {alert}
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-6 text-center">
        {t[language].title}
      </h1>

      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder={t[language].search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Complaints Table */}
      {filteredComplaints.length === 0 ? (
        <div className="text-center text-gray-600 text-lg bg-gray-100 p-10 rounded-2xl shadow-md">
          {t[language].noComplaints}
        </div>
      ) : (
        <div
          className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-200"
          data-aos="fade-up"
        >
          <table className="w-full table-auto text-left border-collapse text-sm sm:text-base">
            <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <tr>
                <th className="px-4 sm:px-6 py-3 sm:py-4">{t[language].name}</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">{t[language].email}</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">{t[language].category}</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">{t[language].status}</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">{t[language].message}</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">{t[language].actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((c, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-orange-50 transition"
                  data-aos="zoom-in"
                  data-aos-delay={i * 100}
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-blue-900">
                    {c.name}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">{c.email}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">{c.category}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span className="px-2 py-1 rounded-full text-xs sm:text-sm font-semibold bg-yellow-200 text-yellow-800">
                      {t[language].pending}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 italic">
                    <Eye
                      className="inline w-4 h-4 ml-2 text-blue-800 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() =>
                        setSelectedComplaint({ index: i, data: c, view: "message" })
                      }
                    />
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 flex gap-2 sm:gap-3">
                    <Edit
                      className="text-orange-600 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => {
                        setEditMode(true);
                        setSelectedComplaint({ index: i, data: { ...c } });
                      }}
                    />
                    <Trash2
                      className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => handleDelete(i)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Message Modal */}
      {selectedComplaint && selectedComplaint.view === "message" && !editMode && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-80 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white text-blue-700 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full mx-3 transform transition-all duration-300 scale-95 animate-scale-up">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-400 mb-4">
              {t[language].viewMsg}
            </h2>
            <p className="text-blue-700">{selectedComplaint.data.message}</p>
            <button
              className="mt-6 px-6 py-2 bg-orange-500 hover:bg-orange-600 transition rounded-lg text-white"
              onClick={() => setSelectedComplaint(null)}
            >
              {t[language].close}
            </button>
          </div>
        </div>
      )}

      {/* Edit Complaint Modal */}
      {editMode && selectedComplaint && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-80 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white text-blue-700 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full mx-3 transform transition-all duration-300 scale-95 animate-scale-up">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-400 mb-4">
              {t[language].edit}
            </h2>
            <input
              type="text"
              className="w-full mb-2 px-3 py-2 border rounded-lg bg-blue-700 text-white placeholder-gray-300"
              value={selectedComplaint.data.name}
              onChange={(e) =>
                setSelectedComplaint({
                  ...selectedComplaint,
                  data: { ...selectedComplaint.data, name: e.target.value },
                })
              }
            />
            <textarea
              rows={3}
              className="w-full mb-2 px-3 py-2 border rounded-lg bg-blue-700 text-white placeholder-gray-300"
              value={selectedComplaint.data.message}
              onChange={(e) =>
                setSelectedComplaint({
                  ...selectedComplaint,
                  data: { ...selectedComplaint.data, message: e.target.value },
                })
              }
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 transition rounded-lg"
              >
                {t[language].cancel}
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 transition rounded-lg text-white"
              >
                {t[language].save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
        .animate-scale-up { animation: scaleUp 0.3s ease-in-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default MyComplaint;
