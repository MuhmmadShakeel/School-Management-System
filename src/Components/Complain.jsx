import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "./LanguageContext";
import { useNavigate } from "react-router-dom";

const Complain = () => {
  const [showForm, setShowForm] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Complaint form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    status: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Translations
  const translations = {
    en: {
      title: "Complaint Management System",
      subtitle:
        "We are here to help resolve your concerns. Kindly if you have any complaint or any issue related to the system, let us know to make it part of the solution.",
      addComplaint: "Add Complaint",
      name: "Name",
      email: "Email",
      category: "Category",
      status: "Status",
      message: "Message",
      submit: "Submit Complaint",
      close: "Close",
      categories: [
        {
          title: "Behavior Complaint",
          subtitle: "Report misconduct or behavioral issues.",
        },
        {
          title: "Academic Complaint",
          subtitle: "Issues related to academics or courses.",
        },
        {
          title: "Facility Complaint",
          subtitle: "Problems with infrastructure or facilities.",
        },
        {
          title: "Administration Complaint",
          subtitle: "Administrative or procedural concerns.",
        },
      ],
    },
    ar: {
      title: "نظام إدارة الشكاوى",
      subtitle:
        "نحن هنا للمساعدة في حل مشاكلك. إذا كان لديك أي شكوى أو مشكلة تتعلق بالنظام، فأخبرنا لتكون جزءًا من الحل.",
      addComplaint: "إضافة شكوى",
      name: "الاسم",
      email: "البريد الإلكتروني",
      category: "الفئة",
      status: "الحالة",
      message: "الرسالة",
      submit: "إرسال الشكوى",
      close: "إغلاق",
      categories: [
        {
          title: "شكوى سلوكية",
          subtitle: "الإبلاغ عن سوء السلوك أو القضايا السلوكية.",
        },
        {
          title: "شكوى أكاديمية",
          subtitle: "مشاكل متعلقة بالدروس أو المواد الدراسية.",
        },
        {
          title: "شكوى مرافق",
          subtitle: "مشاكل متعلقة بالبنية التحتية أو المرافق.",
        },
        {
          title: "شكوى إدارية",
          subtitle: "مشاكل إدارية أو إجرائية.",
        },
      ],
    },
  };

  const t = translations[language] || translations.en;

  const categories = [
    {
      title: t.categories[0].title,
      subtitle: t.categories[0].subtitle,
      image:
        "https://images.pexels.com/photos/5616131/pexels-photo-5616131.jpeg?auto=compress&cs=tinysrgb&w=1200",
      bgColor: "bg-orange-600",
    },
    {
      title: t.categories[1].title,
      subtitle: t.categories[1].subtitle,
      image:
        "https://images.pexels.com/photos/5905440/pexels-photo-5905440.jpeg?auto=compress&cs=tinysrgb&w=1200",
      bgColor: "bg-blue-800",
    },
    {
      title: t.categories[2].title,
      subtitle: t.categories[2].subtitle,
      image:
        "https://images.pexels.com/photos/6646904/pexels-photo-6646904.jpeg?auto=compress&cs=tinysrgb&w=1200",
      bgColor: "bg-orange-600",
    },
    {
      title: t.categories[3].title,
      subtitle: t.categories[3].subtitle,
      image:
        "https://images.pexels.com/photos/1181356/pexels-photo-1181356.jpeg?auto=compress&cs=tinysrgb&w=1200",
      bgColor: "bg-blue-900",
    },
  ];

 // Inside handleSubmit in Complain.jsx
const handleSubmit = (e) => {
  e.preventDefault();

  // Get old complaints
  const existingComplaints = JSON.parse(localStorage.getItem("complaints")) || [];

  // Add new complaint
  const updatedComplaints = [...existingComplaints, formData];

  // Save back to localStorage
  localStorage.setItem("complaints", JSON.stringify(updatedComplaints));

  // Close form
  setShowForm(false);

  // Redirect to MyComplaint page
  navigate("/complaints");
};




  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-500 ${
        showForm ? "bg-blue-200" : "bg-gradient-to-br from-blue-50 to-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-6"
          data-aos="fade-up"
        >
          <div className={language === "ar" ? "text-right" : "text-left"}>
            <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-gray-700 mb-6">{t.subtitle}</p>
            <motion.button
              onClick={() => setShowForm(true)}
              className="px-12 py-4 bg-blue-800 text-white rounded-xl hover:bg-blue-700 shadow-lg text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="mr-2 h-6 w-6 inline" />
              {t.addComplaint}
            </motion.button>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/8867430/pexels-photo-8867430.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Complaint Service"
              className="w-full h-[350px] object-cover"
            />
          </div>
        </div>

        {/* Complaint Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg flex flex-col h-[320px]"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              whileHover={{ y: -8 }}
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div
                className={`p-5 flex-1 flex flex-col ${category.bgColor} text-white ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                <h3 className="text-lg font-bold mb-1">{category.title}</h3>
                <p className="text-sm opacity-90 flex-grow">
                  {category.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Complaint Form Modal */}
        {showForm && (
          <motion.div
className="fixed inset-0 bg-blue-800 bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="bg-orange-600 text-white p-6">
                <h2 className="text-2xl font-bold">{t.addComplaint}</h2>
              </div>
              <form
                onSubmit={handleSubmit}
                className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.category}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {t.categories.map((c, i) => (
                      <option key={i}>{c.title}</option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.status}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>{language === "en" ? "Teacher" : "معلم"}</option>
                    <option>{language === "en" ? "Student" : "طالب"}</option>
                    <option>{language === "en" ? "Parent" : "ولي أمر"}</option>
                  </select>
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.message}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 md:col-span-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-gray-300 bg-orange-600 text-white rounded-lg"
                  >
                    {t.close}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                  >
                    {t.submit}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Complain;
