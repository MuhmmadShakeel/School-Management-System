import React, { useState } from "react";
import { Trash2, Search, Eye, Edit3 } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import TeacerDetails from "./TeacerDetails";
import AdminTechGraph from "./AdminTechGraph";

const AdminTeacher = () => {
  const { language } = useLanguage();

  const t = {
    en: {
      title: "Teachers Management",
      name: "Name",
      email: "Email",
      action: "Action",
      delete: "Delete",
      update: "Update",
      confirmDelete: "Are you sure you want to delete this teacher?",
      confirm: "Yes, Delete",
      cancel: "Cancel",
      save: "Save",
      view: "View Details",
      search: "Search teacher...",
      back: "⬅ Back to List",
    },
    ar: {
      title: "إدارة المعلمين",
      name: "الاسم",
      email: "البريد الإلكتروني",
      action: "الإجراء",
      delete: "حذف",
      update: "تعديل",
      confirmDelete: "هل أنت متأكد أنك تريد حذف هذا المعلم؟",
      confirm: "نعم، احذف",
      cancel: "إلغاء",
      save: "حفظ",
      view: "عرض التفاصيل",
      search: "ابحث عن معلم...",
      back: "⬅ رجوع للقائمة",
    },
  };

  const text = t[language];

  const [search, setSearch] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [teacherToUpdate, setTeacherToUpdate] = useState(null);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  const [teachers, setTeachers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Mary Smith", email: "mary@example.com" },
  ]);

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase())
  );

  // 👉 Show only details if selected
  if (selectedTeacher) {
    return (
      <div
        className="p-4 md:p-6"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <button
          onClick={() => setSelectedTeacher(null)}
          className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
        >
          {text.back}
        </button>
        <TeacerDetails teacher={selectedTeacher} />
      </div>
    );
  }

  // ✅ Update Teacher
  const handleUpdateTeacher = (e) => {
    e.preventDefault();
    const updatedName = e.target.name.value.trim();
    const updatedEmail = e.target.email.value.trim();
    if (!updatedName || !updatedEmail) return;

    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacherToUpdate.id
          ? { ...t, name: updatedName, email: updatedEmail }
          : t
      )
    );
    setUpdateModal(false);
    setTeacherToUpdate(null);
  };

  // ✅ Delete Teacher
  const handleConfirmDelete = () => {
    setTeachers((prev) => prev.filter((t) => t.id !== teacherToDelete.id));
    setDeleteModal(false);
    setTeacherToDelete(null);
  };

  return (
    <div className="min-h-screen lg:ml-62 p-6" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-900">{text.title}</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex items-center gap-2 w-full max-w-sm">
        <Search className="text-blue-900" />
        <input
          type="text"
          placeholder={text.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-600"
        />
      </div>

      {/* Teachers Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-3">{text.name}</th>
              <th className="px-4 py-3">{text.email}</th>
              <th className="px-4 py-3">{text.action}</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-3">{teacher.name}</td>
                <td className="px-4 py-3">{teacher.email}</td>
                <td className="px-4 py-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTeacher(teacher)}
                    className="flex items-center gap-1 px-3 py-1 rounded-md bg-gray-500 text-white text-xs font-semibold hover:bg-gray-600 transition"
                  >
                    <Eye size={14} /> {text.view}
                  </button>
                  <button
                    onClick={() => {
                      setTeacherToUpdate(teacher);
                      setUpdateModal(true);
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                  >
                    <Edit3 size={14} /> {text.update}
                  </button>
                  <button
                    onClick={() => {
                      setTeacherToDelete(teacher);
                      setDeleteModal(true);
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                  >
                    <Trash2 size={14} /> {text.delete}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Graph Section */}
      <AdminTechGraph />

      {/* Update Modal */}
      {updateModal && teacherToUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              {text.update} - {teacherToUpdate.name}
            </h2>
            <form onSubmit={handleUpdateTeacher} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                defaultValue={teacherToUpdate.name}
                className="p-2 border rounded-md"
              />
              <input
                type="email"
                name="email"
                defaultValue={teacherToUpdate.email}
                className="p-2 border rounded-md"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setUpdateModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-400 text-white hover:bg-gray-500 transition"
                >
                  {text.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  {text.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && teacherToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              {text.confirmDelete}
            </h2>
            <p className="mb-6 text-gray-700">
              {teacherToDelete.name} ({teacherToDelete.email})
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 rounded-md bg-gray-400 text-white hover:bg-gray-500 transition"
              >
                {text.cancel}
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                {text.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeacher;
