import React, { useState } from "react";
import { Eye, Upload, Download } from "lucide-react"; // icons
import { useTranslation } from "react-i18next";

const AdminStudent = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [studentData, setStudentData] = useState([
    { id: 1, className: "6th", strength: 40, photo: "/images/class6.jpg" },
    { id: 2, className: "7th", strength: 35, photo: "" },
    { id: 3, className: "8th", strength: 42, photo: "/images/class8.jpg" },
    { id: 4, className: "9th", strength: 38, photo: "" },
  ]);

  // Handle File Upload
  const handleFileUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const newData = studentData.map((student) =>
        student.id === id
          ? { ...student, photo: URL.createObjectURL(file), fileName: file.name }
          : student
      );
      setStudentData(newData);
    }
  };

  // Summary cards data
  const summaryCards = [
    { title: t("dashboard.totalClasses"), value: studentData.length },
    {
      title: t("dashboard.totalStudents"),
      value: studentData.reduce((a, b) => a + b.strength, 0),
    },
    {
      title: t("dashboard.uploadedPhotos"),
      value: studentData.filter((s) => s.photo).length,
    },
    {
      title: t("dashboard.pendingUploads"),
      value: studentData.filter((s) => !s.photo).length,
    },
  ];

  return (
    <div className="lg:ml-62 p-4 sm:p-6 space-y-8">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 tracking-wide">
          {t("dashboard.title")}
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          {t("dashboard.subtitle")}
        </p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl border border-gray-200 transform hover:-translate-y-1 hover:shadow-xl transition duration-300"
          >
            <div className="p-4 sm:p-6 text-center">
              <h2 className="text-base sm:text-lg font-semibold text-gray-700">
                {card.title}
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600 mt-2">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Student Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead className="bg-gradient-to-r from-blue-900 to-orange-600 text-white">
              <tr>
                <th className="p-3">{t("dashboard.table.class")}</th>
                <th className="p-3">{t("dashboard.table.strength")}</th>
                <th className="p-3">{t("dashboard.table.photo")}</th>
                <th className="p-3">{t("dashboard.table.action")}</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {student.className}
                  </td>
                  <td className="p-3 text-gray-700">{student.strength}</td>
                  <td className="p-3">
                    {student.photo ? (
                      <span className="text-green-600 font-semibold">
                        {t("dashboard.uploaded")}
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        {t("dashboard.notUploaded")}
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex items-center gap-2 flex-wrap">
                    {/* Upload Button */}
                    {!student.photo && (
                      <label className="flex items-center gap-2 bg-orange-600 text-white px-3 py-1 rounded-lg shadow-md cursor-pointer hover:bg-orange-700 transition text-sm">
                        <Upload size={16} />
                        <span>{t("dashboard.uploadBtn")}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, student.id)}
                        />
                      </label>
                    )}

                    {/* View Button */}
                    {student.photo && (
                      <button
                        className="flex items-center gap-1 bg-blue-900 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-800 transition text-sm"
                        onClick={() => setSelectedImage(student.photo)}
                      >
                        <Eye size={16} />
                        <span>{t("dashboard.viewBtn")}</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-2xl p-4 sm:p-6 shadow-xl max-w-lg w-full animate-fadeIn">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-red-600 font-bold text-2xl hover:scale-110 transition"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>

            {/* Image */}
            <div className="flex justify-center">
              <img
                src={selectedImage}
                alt={t("dashboard.uploaded")}
                className="max-h-72 max-w-full object-contain rounded-lg shadow-md"
              />
            </div>

            {/* Download Button */}
            <div className="mt-4 flex justify-center">
              <a
                href={selectedImage}
                download
                className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-700 transition text-sm sm:text-base"
              >
                <Download size={16} />
                <span>{t("dashboard.downloadBtn")}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudent;
