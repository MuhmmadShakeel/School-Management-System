import React, { useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const AdminAnnouncement = () => {
  const { language, toggleLanguage } = useLanguage();

  const [announcements, setAnnouncements] = useState([
    { id: 1, date: "2025-10-02", text: "Welcome to our new admin panel!" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ date: "", text: "" });
  const [editId, setEditId] = useState(null);

  // 🌍 Translations
  const t = {
    en: {
      title: "Admin Announcements",
      desc: "Manage announcements easily. Keep everything updated, eye-catching, and professional.",
      total: "Total Announcements",
      active: "Active Announcements",
      upcoming: "Upcoming Announcements",
      expired: "Expired Announcements",
      addBtn: "+ Add Announcement",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      update: "Update",
      modalAdd: "Add Announcement",
      modalEdit: "Edit Announcement",
      placeholder: "Enter announcement...",
    },
    ar: {
      title: "إعلانات المشرف",
      desc: "قم بإدارة الإعلانات بسهولة. حافظ على كل شيء محدثًا وجذابًا واحترافيًا.",
      total: "إجمالي الإعلانات",
      active: "الإعلانات النشطة",
      upcoming: "الإعلانات القادمة",
      expired: "الإعلانات المنتهية",
      addBtn: "+ إضافة إعلان",
      edit: "تعديل",
      delete: "حذف",
      save: "حفظ",
      update: "تحديث",
      modalAdd: "إضافة إعلان",
      modalEdit: "تعديل الإعلان",
      placeholder: "أدخل الإعلان...",
    },
  };

  const text = t[language];

  // Save (Add / Update)
  const handleSave = () => {
    if (!newAnnouncement.date || !newAnnouncement.text) return;

    if (editId) {
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === editId ? { ...a, ...newAnnouncement } : a))
      );
    } else {
      setAnnouncements((prev) => [
        ...prev,
        { id: Date.now(), ...newAnnouncement },
      ]);
    }

    setNewAnnouncement({ date: "", text: "" });
    setEditId(null);
    setShowModal(false);
  };

  // Delete
  const handleDelete = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  // Edit
  const handleEdit = (announcement) => {
    setNewAnnouncement({ date: announcement.date, text: announcement.text });
    setEditId(announcement.id);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen lg:ml-60 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between p-8 rounded-2xl shadow-lg mb-10 text-[#1A3AA3]">
        <div className="max-w-lg">
          <h1 className="text-3xl font-extrabold mb-2">{text.title}</h1>
          <p className="text-[#1A3AA3]">{text.desc}</p>
        </div>
        <img
          src="https://static.vecteezy.com/system/resources/previews/014/435/755/non_2x/attention-please-announcement-sign-with-megaphone-flat-illustration-important-alert-icon-vector.jpg"
          alt="Announcement"
          className="w-56 lg:w-72 mt-6 lg:mt-0 drop-shadow-xl"
        />
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[text.total, text.active, text.upcoming, text.expired].map(
          (title, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-center items-start hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-orange-600"
            >
              <p className="text-gray-600 text-sm">{title}</p>
              <p className="text-3xl font-extrabold text-[#1A3AA3] mt-2">
                {idx === 0
                  ? announcements.length
                  : idx === 1
                  ? announcements.length
                  : idx === 2
                  ? "2"
                  : "1"}
              </p>
            </div>
          )
        )}
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#1A3AA3] text-white px-6 py-2 rounded-xl transition text-sm font-semibold"
        >
          {text.addBtn}
        </button>
      </div>

      {/* Announcement List */}
      <div className="space-y-4">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border-l-4 border-blue-900"
          >
            <div>
              <p className="text-sm text-gray-500">{a.date}</p>
              <p className="text-lg font-semibold text-gray-800">{a.text}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(a)}
                className="px-4 py-1.5 rounded-lg border border-[#1A3AA3] text-[#1A3AA3] hover:bg-orange-50 transition font-medium"
              >
                {text.edit}
              </button>
              <button
                onClick={() => handleDelete(a.id)}
                className="px-4 py-1.5 rounded-lg bg-[#D13800] text-white hover:bg-red-700 transition font-medium"
              >
                {text.delete}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#1A3AA3] bg-opacity-10 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative animate-fadeIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-blue-900">
              {editId ? text.modalEdit : text.modalAdd}
            </h2>
            <input
              type="date"
              value={newAnnouncement.date}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, date: e.target.value })
              }
              className="border w-full mb-3 p-2 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              placeholder={text.placeholder}
              value={newAnnouncement.text}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, text: e.target.value })
              }
              className="border w-full mb-3 p-2 rounded-lg focus:ring-2 focus:ring-orange-500"
              rows={3}
            />
            <button
              className="bg-orange-600 text-white w-full py-2 rounded-lg hover:bg-orange-700 transition font-semibold"
              onClick={handleSave}
            >
              {editId ? text.update : text.save}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncement;
