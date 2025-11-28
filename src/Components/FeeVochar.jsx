import React, { useState, useEffect } from "react";
import { Eye, X, CheckCircle, Clock, Search, Upload } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "./LanguageContext";

const FeeVochar = () => {
  const { language } = useLanguage();
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [uploadModal, setUploadModal] = useState(null);
  const [search, setSearch] = useState("");
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      name: { en: "Voucher 1", ar: "قسيمة 1" },
      uploadedDate: "2025-01-10",
      paidDate: "2025-01-15",
      status: "Paid",
      img: "https://imgv2-2-f.scribdassets.com/img/document/451754043/original/7378ba6c6e/1?v=1",
    },
    {
      id: 2,
      name: { en: "Voucher 2", ar: "قسيمة 2" },
      uploadedDate: "2025-02-05",
      paidDate: null,
      status: "Pending",
      img: "https://finli.com/wp-content/uploads/2024/07/what-is-a-cash-deposit-definition.jpg",
    },
    {
      id: 3,
      name: { en: "Voucher 3", ar: "قسيمة 3" },
      uploadedDate: "2025-03-01",
      paidDate: "2025-03-07",
      status: "Paid",
      img: "https://finli.com/wp-content/uploads/2024/07/what-is-a-cash-deposit-definition.jpg",
    },
    {
      id: 4,
      name: { en: "Voucher 4", ar: "قسيمة 4" },
      uploadedDate: "2025-04-11",
      paidDate: null,
      status: "Pending",
      img: "https://finli.com/wp-content/uploads/2024/07/what-is-a-cash-deposit-definition.jpg",
    },
  ]);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const filteredVouchers = vouchers.filter((voucher) =>
    voucher.name.en.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Handle Challan Upload Submission
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (uploadModal) {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      setVouchers((prev) =>
        prev.map((v) =>
          v.id === uploadModal.id
            ? { ...v, status: "Paid", paidDate: today }
            : v
        )
      );
      setUploadModal(null); // close modal
    }
  };

  return (
    <div className="mt-20 mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
        <h1
          className="text-3xl sm:text-4xl font-bold text-[#1C398E] mb-4 sm:mb-0"
          data-aos="fade-down"
        >
          {language === "en" ? "Your Fee Vouchers" : "قسائم الرسوم الخاصة بك"}
        </h1>
        <button className="w-[400px] rounded-full py-4 text-lg font-bold bg-[#0F2167] text-white animate-pulse shadow-lg cursor-pointer hover:bg-[#F54A00] transition">
          {language === "en" ? "Pay Fee Soon...!!" : "ادفع الرسوم قريباً...!!"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section - Vouchers */}
        <div
          className="lg:col-span-2 space-y-4"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder={
                language === "en"
                  ? "Search your voucher..."
                  : "ابحث عن قسيمتك..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl shadow-md focus:outline-none border text-gray-700"
            />
            <Search
              className="absolute left-4 top-3.5 text-gray-500"
              size={20}
            />
          </div>

          {/* Voucher Cards */}
          {filteredVouchers.map((voucher, index) => (
            <div
              key={voucher.id}
              className={`flex items-center justify-between h-[130px] w-full px-6 rounded-xl shadow-lg border hover:shadow-2xl transition relative ${
                voucher.status === "Paid"
                  ? "bg-[#1C398E] text-white"
                  : "bg-orange-600 text-white"
              }`}
              data-aos="fade-up"
              data-aos-delay={200 + index * 150}
            >
              {/* Left Info */}
              <div>
                <h3 className="text-lg font-bold">
                  {language === "en" ? voucher.name.en : voucher.name.ar}
                </h3>
                <p className="text-sm mt-1">
                  {language === "en"
                    ? `Uploaded: ${voucher.uploadedDate}`
                    : `تاريخ التحميل: ${voucher.uploadedDate}`}
                </p>
                <p className="text-sm">
                  {voucher.paidDate
                    ? `${language === "en" ? "Paid" : "مدفوع"}: ${
                        voucher.paidDate
                      }`
                    : language === "en"
                    ? "Not Paid"
                    : "غير مدفوع"}
                </p>
              </div>

              {/* Right Buttons */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  {voucher.status === "Paid" ? (
                    <CheckCircle className="text-white" size={20} />
                  ) : (
                    <Clock className="text-yellow-300" size={20} />
                  )}
                  <span className="font-semibold">
                    {voucher.status === "Paid"
                      ? language === "en"
                        ? "Paid"
                        : "مدفوع"
                      : language === "en"
                      ? "Pending"
                      : "قيد الانتظار"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedVoucher(voucher)}
                    className="inline-flex items-center gap-2 px-4 py-1.5 cursor-pointer rounded-lg bg-white text-orange-600 font-semibold shadow hover:bg-gray-100 transition"
                  >
                    <Eye size={16} />
                    {language === "en" ? "View" : "عرض"}
                  </button>

                  {/* Upload button only if Pending */}
                  {voucher.status === "Pending" && (
                    <button
                      onClick={() => setUploadModal(voucher)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 cursor-pointer rounded-lg bg-[#1C398E] text-white font-semibold shadow hover:bg-[#0d1a4d] transition"
                    >
                      <Upload size={16} />
                      {language === "en" ? "Upload" : "تحميل"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Payment Card */}
<div className="bg-[#1C398E] rounded-t-[2rem] shadow-2xl overflow-hidden border text-white flex flex-col" data-aos="fade-left" data-aos-delay="400" > {/* Pay Now Button */} <img src="https://finli.com/wp-content/uploads/2024/07/what-is-a-cash-deposit-definition.jpg" alt="Digital Payment" className="w-full h-52 object-cover" /> <div className="p-6 flex flex-col space-y-3"> <h2 className="text-2xl font-bold"> {language === "en" ? "Pay Your Fee" : "ادفع رسومك"} </h2> <p className="text-gray-200 leading-relaxed text-md"> {language === "en" ? ( <> You can pay your fee securely via{" "} <span className="text-orange-400 font-semibold"> JazzCash </span> ,{" "} <span className="text-orange-400 font-semibold"> EasyPaisa </span>{" "} and all major{" "} <span className="text-orange-400 font-semibold"> Banks </span> . </> ) : "يمكنك دفع رسومك بأمان عبر جاز كاش، إيزي بيزا، وجميع البنوك الكبرى."} </p> <p className="text-gray-300 text-sm leading-relaxed"> <span className="font-semibold text-white"> {language === "en" ? "How to Pay:" : "كيفية الدفع:"} </span> <br />1️⃣{" "} {language === "en" ? "Open your mobile banking or wallet app." : "افتح تطبيق المحفظة أو البنك على هاتفك."} <br />2️⃣{" "} {language === "en" ? 'Select "Bill Payment" or "Educational Fee".' : 'اختر "دفع الفواتير" أو "رسوم التعليم".'} <br />3️⃣{" "} {language === "en" ? "Enter your voucher number and amount." : "أدخل رقم القسيمة والمبلغ."} <br />4️⃣{" "} {language === "en" ? "Confirm and complete the transaction." : "أكد وأكمل العملية."} <br />5️⃣{" "} {language === "en" ? "A digital receipt will be generated instantly." : "سيتم إنشاء إيصال رقمي فورًا."} </p> </div> </div> </div>


      {/* Voucher Modal */}
      {selectedVoucher && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-[#1C398E]">
                {language === "en"
                  ? `${selectedVoucher.name.en} - ${selectedVoucher.status}`
                  : `${selectedVoucher.name.ar} - ${selectedVoucher.status}`}
              </h2>
              <button
                onClick={() => setSelectedVoucher(null)}
                className="text-gray-500 hover:text-orange-600 transition"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 flex justify-center">
              <img
                src={selectedVoucher.img}
                alt="Voucher"
                className="rounded-xl shadow-lg w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative p-6">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-[#1C398E]">
                {language === "en"
                  ? "Upload Paid Challan"
                  : "تحميل القسيمة المدفوعة"}
              </h2>
              <button
                onClick={() => setUploadModal(null)}
                className="text-gray-500 hover:text-orange-600 transition"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <input
                type="text"
                placeholder={language === "en" ? "Name" : "الاسم"}
                className="w-full border rounded-lg p-3"
                required
              />
              <input
                type="text"
                placeholder={language === "en" ? "Roll Number" : "رقم الجلوس"}
                className="w-full border rounded-lg p-3"
                required
              />
              <input
                type="text"
                placeholder={language === "en" ? "Class" : "الفصل"}
                className="w-full border rounded-lg p-3"
                required
              />
              <input type="file" className="w-full border rounded-lg p-3" />
              <button
                type="submit"
                className="w-full bg-[#1C398E] text-white py-3 rounded-lg font-semibold hover:bg-[#0d1a4d] transition"
              >
                {language === "en" ? "Submit" : "إرسال"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeVochar;
