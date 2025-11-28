import React, { useState } from "react";
import { Upload, Eye, CheckCircle, X, Download } from "lucide-react";
import { useLanguage } from "../LanguageContext"; // ✅ use context

// ✅ Local images
import sixth from "../../Components/Images/6th.png";
import seventh from "../../Components/Images/7th.png";
import eight from "../../Components/Images/8th.png";
import ninth from "../../Components/Images/9th.png";
import tenth from "../../Components/Images/10th.png";

const Syllabus2 = () => {
  // ✅ Get language from context
  const { language } = useLanguage();

  // ✅ Classes with bilingual names
  const classes = [
    { en: "Class 6", ar: "الصف السادس", image: sixth },
    { en: "Class 7", ar: "الصف السابع", image: seventh },
    { en: "Class 8", ar: "الصف الثامن", image: eight },
    { en: "Class 9", ar: "الصف التاسع", image: ninth },
    { en: "Class 10", ar: "الصف العاشر", image: tenth },
    {
      en: "Class 11",
      ar: "الصف الحادي عشر",
      image:
        "https://images.pexels.com/photos/159844/classroom-school-education-learning-159844.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  // ✅ Track uploaded files
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [previewData, setPreviewData] = useState(null);

  // ✅ Handle file upload
  const handleUpload = (className, file) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const fileType = file.type.includes("pdf") ? "pdf" : "image";

      setUploadedFiles((prev) => ({
        ...prev,
        [className]: { url: fileUrl, type: fileType, name: file.name },
      }));
    }
  };

  return (
    <div
      className={`min-h-screen lg:ml-64 bg-gradient-to-br from-gray-50 to-gray-200 p-6 transition-all duration-300 ${
        language === "ar" ? "text-right" : "text-left"
      }`}
      dir={language === "ar" ? "rtl" : "ltr"} // ✅ auto RTL
    >
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-8">
        {language === "en" ? "📚 Upload the Syllabus" : "📚 تحميل المنهج"}
      </h1>

      {/* Grid for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {classes.map((cls, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105"
          >
            {/* Default Card Image */}
            <img
              src={cls.image}
              alt={cls.en}
              className="w-full h-32 object-cover"
            />

            {/* Card Content */}
            <div className="p-5 flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {language === "en" ? cls.en : cls.ar}
              </h2>

              {!uploadedFiles[cls.en] ? (
                <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#1C398E] text-white font-medium rounded-lg shadow hover:bg-[#162d6b] transition">
                  <Upload size={18} />
                  {language === "en" ? "Upload Syllabus" : "رفع المنهج"}
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) =>
                      handleUpload(cls.en, e.target.files[0])
                    }
                  />
                </label>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-[#1C398E] font-semibold">
                    <CheckCircle size={20} />
                    {language === "en" ? "Uploaded" : "تم الرفع"}
                  </div>
                  <button
                    onClick={() => setPreviewData(uploadedFiles[cls.en])}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                  >
                    <Eye size={16} />
                    {language === "en" ? "View" : "عرض"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Preview Modal */}
      {previewData && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1C398E] bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setPreviewData(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
            >
              <X size={24} />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-center text-blue-700">
              {language === "en" ? "Syllabus Preview" : "معاينة المنهج"}
            </h2>

            {/* ✅ Image Preview */}
            {previewData.type === "image" ? (
              <img
                src={previewData.url}
                alt="Preview"
                className="w-full h-64 object-contain rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-gray-700 mb-3">
                  {language === "en"
                    ? "📄 PDF File Uploaded"
                    : "📄 تم رفع ملف PDF"}
                </p>
                <a
                  href={previewData.url}
                  download={previewData.name}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  <Download size={18} />
                  {language === "en" ? "Download PDF" : "تحميل PDF"}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Syllabus2;
