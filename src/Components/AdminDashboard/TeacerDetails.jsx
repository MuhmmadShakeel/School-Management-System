import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PlusCircle, Edit2, Trash2, X } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const TeacherDetails = () => {
  const { language } = useLanguage();

  const t = {
    en: {
      title: "Teacher Classes",
      search: "Search by class...",
      addClass: "Add Class",
      updateClass: "Update Class",
      className: "Class Name",
      subject: "Subject",
      timing: "Lecture Timing",
      action: "Action",
      view: "View Details",
      hide: "Hide",
      update: "Update",
      delete: "Delete",
      confirmDelete: "Are you sure you want to delete this class?",
      extraDetails: "Extra details about this class could go here.",
      cancel: "Cancel",
      save: "Save",
    },
    ar: {
      title: "حصص المعلم",
      search: "ابحث حسب الصف...",
      addClass: "إضافة حصة",
      updateClass: "تحديث الحصة",
      className: "اسم الصف",
      subject: "المادة",
      timing: "وقت المحاضرة",
      action: "الإجراء",
      view: "عرض التفاصيل",
      hide: "إخفاء",
      update: "تعديل",
      delete: "حذف",
      confirmDelete: "هل أنت متأكد أنك تريد حذف هذه الحصة؟",
      extraDetails: "يمكن أن تضاف تفاصيل إضافية عن هذه الحصة هنا.",
      cancel: "إلغاء",
      save: "حفظ",
    },
  };

  const text = t[language];

  const [classes, setClasses] = useState([
    { id: 1, className: "6th", subject: "Mathematics", timing: "10:00 AM - 11:00 AM" },
    { id: 2, className: "7th", subject: "Science", timing: "11:30 AM - 12:30 PM" },
  ]);

  const [search, setSearch] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [visibleId, setVisibleId] = useState(null);

  // Add Class
  const handleAddClass = (e) => {
    e.preventDefault();
    const className = e.target.className.value.trim();
    const subject = e.target.subject.value.trim();
    const timing = e.target.timing.value.trim();

    if (!className || !subject || !timing) return;

    setClasses((prev) => [...prev, { id: Date.now(), className, subject, timing }]);
    setAddModal(false);
    e.target.reset();
  };

  // Update Class
  const handleUpdateClass = (e) => {
    e.preventDefault();
    const className = e.target.className.value.trim();
    const subject = e.target.subject.value.trim();
    const timing = e.target.timing.value.trim();

    setClasses((prev) =>
      prev.map((c) =>
        c.id === selectedClass.id ? { ...c, className, subject, timing } : c
      )
    );
    setEditModal(false);
  };

  // Delete Class
  const handleDelete = (id) => {
    if (window.confirm(text.confirmDelete)) {
      setClasses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const filteredClasses = classes.filter((c) =>
    c.className.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen lg:ml-60 p-6">
      <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-6 text-center md:text-left">
        {text.title}
      </h1>

      {/* Top Bar */}
      <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-3 max-w-4xl mx-auto">
        {/* Search */}
        <div className="flex items-center gap-2 w-full md:max-w-sm">
          <Search className="text-blue-900" />
          <input
            type="text"
            placeholder={text.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-600 text-sm md:text-base"
          />
        </div>

        {/* Add Class Button */}
        <button
          onClick={() => setAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-orange-600 text-white font-semibold shadow-md hover:bg-orange-700 transition w-full md:w-auto justify-center"
        >
          <PlusCircle size={18} /> {text.addClass}
        </button>
      </div>

      {/* Classes List */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-900 text-white text-xs md:text-sm">
            <tr>
              <th className="px-4 md:px-6 py-3">{text.className}</th>
              <th className="px-4 md:px-6 py-3">{text.subject}</th>
              <th className="px-4 md:px-6 py-3">{text.timing}</th>
              <th className="px-4 md:px-6 py-3">{text.action}</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((c) => (
              <React.Fragment key={c.id}>
                <tr className="border-b hover:bg-gray-100 text-xs md:text-sm">
                  <td className="px-4 md:px-6 py-3">{c.className}</td>
                  <td className="px-4 md:px-6 py-3">{c.subject}</td>
                  <td className="px-4 md:px-6 py-3">{c.timing}</td>
                  <td className="px-4 md:px-6 py-3">
                    <div className="flex flex-col sm:flex-row gap-2 w-full">
                      <button
                        onClick={() => setVisibleId((prev) => (prev === c.id ? null : c.id))}
                        className="px-3 py-1 rounded-md bg-gray-600 text-white text-xs font-semibold hover:bg-gray-700 transition w-full sm:w-auto"
                      >
                        {visibleId === c.id ? text.hide : text.view}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedClass(c);
                          setEditModal(true);
                        }}
                        className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition w-full sm:w-auto"
                      >
                        <Edit2 size={14} /> {text.update}
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="px-3 py-1 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition w-full sm:w-auto"
                      >
                        <Trash2 size={14} /> {text.delete}
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Details Section */}
                <AnimatePresence>
                  {visibleId === c.id && (
                    <motion.tr
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <td colSpan="4" className="px-4 md:px-6 py-4 bg-gray-50 text-gray-700">
                        <div className="p-3 md:p-4 rounded-md bg-white shadow text-xs md:text-sm">
                          <h3 className="font-bold text-blue-900 text-base md:text-lg mb-2">
                            {c.className} - {c.subject}
                          </h3>
                          <p>
                            <span className="font-semibold">{text.timing}:</span> {c.timing}
                          </p>
                          <p className="mt-1 text-gray-600">{text.extraDetails}</p>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Class Modal */}
      <AnimatePresence>
        {addModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-2 sm:p-4 z-50"
          >
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md relative">
              <button
                onClick={() => setAddModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
              <h2 className="text-lg sm:text-xl font-bold mb-4">{text.addClass}</h2>
              <form onSubmit={handleAddClass} className="space-y-3">
                <input name="className" placeholder={text.className} className="w-full border p-2 rounded text-sm sm:text-base" required />
                <input name="subject" placeholder={text.subject} className="w-full border p-2 rounded text-sm sm:text-base" required />
                <input name="timing" placeholder={text.timing} className="w-full border p-2 rounded text-sm sm:text-base" required />
                <button type="submit" className="w-full py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm sm:text-base">
                  {text.save}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Class Modal */}
      <AnimatePresence>
        {editModal && selectedClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-2 sm:p-4 z-50"
          >
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md relative">
              <button
                onClick={() => setEditModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
              <h2 className="text-lg sm:text-xl font-bold mb-4">{text.updateClass}</h2>
              <form onSubmit={handleUpdateClass} className="space-y-3">
                <input
                  name="className"
                  defaultValue={selectedClass.className}
                  className="w-full border p-2 rounded text-sm sm:text-base"
                  required
                />
                <input
                  name="subject"
                  defaultValue={selectedClass.subject}
                  className="w-full border p-2 rounded text-sm sm:text-base"
                  required
                />
                <input
                  name="timing"
                  defaultValue={selectedClass.timing}
                  className="w-full border p-2 rounded text-sm sm:text-base"
                  required
                />
                <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base">
                  {text.save}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherDetails;
