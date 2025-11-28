import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Search, CheckCircle, Plus } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "../LanguageContext";

const Complain1 = () => {
  const { language } = useLanguage();
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
    status: "Pending",
  });

  const t = {
    en: {
      title: "Make Your Complaint Here",
      addNew: "Add Complaint",
      search: "Search complaints...",
      noComplaints: "No complaints found.",
      name: "Name",
      email: "Email",
      category: "Category",
      status: "Status",
      message: "Message",
      actions: "Actions",
      pending: "Pending",
      fulfilled: "Fulfilled",
      viewMsg: "Complaint Message",
      close: "Close",
      edit: "Edit Complaint",
      cancel: "Cancel",
      save: "Save",
      submit: "Submit",
    },
    ar: {
      title: "نظام الشكاوى",
      addNew: "إضافة شكوى",
      search: "ابحث في الشكاوى...",
      noComplaints: "لا توجد شكاوى.",
      name: "الاسم",
      email: "البريد الإلكتروني",
      category: "الفئة",
      status: "الحالة",
      message: "الرسالة",
      actions: "إجراءات",
      pending: "قيد الانتظار",
      fulfilled: "تمت المعالجة",
      viewMsg: "نص الشكوى",
      close: "إغلاق",
      edit: "تعديل الشكوى",
      cancel: "إلغاء",
      save: "حفظ",
      submit: "إرسال",
    },
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const stored = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(stored);
  }, []);

  const saveComplaints = (updated) => {
    setComplaints(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));
  };

  const showAlert = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(null), 2000);
  };

  const handleAddComplaint = (e) => {
    e.preventDefault();
    if (!newComplaint.name || !newComplaint.email || !newComplaint.message) {
      showAlert(language === "en" ? "Please fill all fields!" : "الرجاء ملء جميع الحقول!");
      return;
    }
    const updated = [...complaints, { ...newComplaint, status: "Pending" }];
    saveComplaints(updated);
    setNewComplaint({ name: "", email: "", category: "", message: "", status: "Pending" });
    setShowFormModal(false);
    showAlert(language === "en" ? "Complaint added!" : "تمت إضافة الشكوى!");
  };

  const handleDelete = (index) => {
    const updated = complaints.filter((_, i) => i !== index);
    saveComplaints(updated);
    showAlert(language === "en" ? "Complaint deleted!" : "تم حذف الشكوى!");
  };

  const handleEditSave = () => {
    const updated = complaints.map((c, i) =>
      i === selectedComplaint.index ? { ...selectedComplaint.data } : c
    );
    saveComplaints(updated);
    setEditMode(false);
    setSelectedComplaint(null);
    showAlert(language === "en" ? "Complaint updated!" : "تم تعديل الشكوى!");
  };

  const handleMarkFulfilled = (index) => {
    const updated = complaints.map((c, i) =>
      i === index ? { ...c, status: "Fulfilled" } : c
    );
    saveComplaints(updated);
    showAlert(language === "en" ? "Complaint marked as fulfilled!" : "تمت معالجة الشكوى!");
  };

  const filteredComplaints = complaints.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-20 max-w-7xl lg:ml-62 mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Alerts */}
      {alert && (
        <div className="fixed top-20 right-6 bg-orange-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
          {alert}
        </div>
      )}

      {/* Title + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1C398E] text-center">
          {t[language].title}
        </h1>
        <button
          onClick={() => setShowFormModal(true)}
          className="flex items-center gap-2 bg-orange-600 text-white px-5 py-2 rounded-lg shadow hover:bg-orange-700 transition"
        >
          <Plus size={18} /> {t[language].addNew}
        </button>
      </div>

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

      {/* Complaints Responsive */}
      {filteredComplaints.length === 0 ? (
        <div className="text-center text-gray-600 text-lg bg-gray-100 p-10 rounded-2xl shadow-md">
          {t[language].noComplaints}
        </div>
      ) : (
        <div
          className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-200"
          data-aos="fade-up"
        >
          {/* Desktop Table */}
          <table className="hidden sm:table w-full table-auto text-left border-collapse text-sm sm:text-base">
            <thead className="bg-[#1C398E] text-white">
              <tr>
                <th className="px-6 py-4">{t[language].name}</th>
                <th className="px-6 py-4">{t[language].email}</th>
                <th className="px-6 py-4">{t[language].category}</th>
                <th className="px-6 py-4">{t[language].status}</th>
                <th className="px-6 py-4">{t[language].message}</th>
                <th className="px-6 py-4">{t[language].actions}</th>
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
                  <td className="px-6 py-4 font-bold text-blue-900">{c.name}</td>
                  <td className="px-6 py-4">{c.email}</td>
                  <td className="px-6 py-4 text-blue-900">{c.category}</td>
                  <td className="px-6 py-4">
                    {c.status === "Pending" ? (
                      <span className="px-2 py-1 rounded-full text-xs sm:text-sm font-semibold bg-yellow-200 text-yellow-800">
                        {t[language].pending}
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs sm:text-sm font-semibold bg-green-200 text-green-800">
                        {t[language].fulfilled}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-400 italic">
                    <Eye
                      className="inline w-5 h-5 ml-2 text-orange-600 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() =>
                        setSelectedComplaint({ index: i, data: c, view: "message" })
                      }
                    />
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <Edit
                      className="text-orange-600 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => {
                        setEditMode(true);
                        setSelectedComplaint({ index: i, data: { ...c } });
                      }}
                    />
                    <Trash2
                      className="text-orange-600 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => handleDelete(i)}
                    />
                    {c.status === "Pending" && (
                      <CheckCircle
                        className="text-orange-600 cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => handleMarkFulfilled(i)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="sm:hidden p-4 grid gap-4">
            {filteredComplaints.map((c, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 shadow hover:shadow-md transition bg-white"
              >
                <p className="font-bold text-blue-900">{c.name}</p>
                <p>{c.email}</p>
                <p className="text-blue-900">{c.category}</p>
                <p>
                  {c.status === "Pending" ? (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-200 text-yellow-800">
                      {t[language].pending}
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-800">
                      {t[language].fulfilled}
                    </span>
                  )}
                </p>
                <div className="flex gap-3 mt-3">
                  <Eye
                    className="text-orange-600 cursor-pointer"
                    onClick={() =>
                      setSelectedComplaint({ index: i, data: c, view: "message" })
                    }
                  />
                  <Edit
                    className="text-orange-600 cursor-pointer"
                    onClick={() => {
                      setEditMode(true);
                      setSelectedComplaint({ index: i, data: { ...c } });
                    }}
                  />
                  <Trash2
                    className="text-orange-600 cursor-pointer"
                    onClick={() => handleDelete(i)}
                  />
                  {c.status === "Pending" && (
                    <CheckCircle
                      className="text-orange-600 cursor-pointer"
                      onClick={() => handleMarkFulfilled(i)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Complaint Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white text-blue-900 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-3">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4">
              {t[language].addNew}
            </h2>
            <form onSubmit={handleAddComplaint} className="grid gap-3">
              <input
                type="text"
                placeholder={t[language].name}
                value={newComplaint.name}
                onChange={(e) => setNewComplaint({ ...newComplaint, name: e.target.value })}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="email"
                placeholder={t[language].email}
                value={newComplaint.email}
                onChange={(e) => setNewComplaint({ ...newComplaint, email: e.target.value })}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder={t[language].category}
                value={newComplaint.category}
                onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value })}
                className="px-3 py-2 border rounded-lg text-blue-900 font-semibold"
              />
              <textarea
                rows={3}
                placeholder={t[language].message}
                value={newComplaint.message}
                onChange={(e) => setNewComplaint({ ...newComplaint, message: e.target.value })}
                className="px-3 py-2 border rounded-lg"
              ></textarea>
              <div className="flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 transition rounded-lg text-white"
                >
                  {t[language].cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 transition rounded-lg text-white"
                >
                  {t[language].submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Complaint Modal */}
      {selectedComplaint && selectedComplaint.view === "message" && !editMode && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white text-blue-900 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full mx-3">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4">
              {t[language].viewMsg}
            </h2>
            <p className="text-blue-900">{selectedComplaint.data.message}</p>
            <button
              className="mt-6 px-6 py-2 bg-orange-600 hover:bg-orange-700 transition rounded-lg text-white"
              onClick={() => setSelectedComplaint(null)}
            >
              {t[language].close}
            </button>
          </div>
        </div>
      )}

      {/* Edit Complaint Modal */}
      {editMode && selectedComplaint && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white text-blue-900 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full mx-3">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4">
              {t[language].edit}
            </h2>
            <input
              type="text"
              className="w-full mb-2 px-3 py-2 border rounded-lg bg-blue-900 text-white placeholder-gray-300"
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
              className="w-full mb-2 px-3 py-2 border rounded-lg bg-blue-900 text-white placeholder-gray-300"
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
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 transition rounded-lg text-white"
              >
                {t[language].cancel}
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 transition rounded-lg text-white"
              >
                {t[language].save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complain1;
